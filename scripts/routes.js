'use strict';
/**
 * @ngdoc overview
 * @name urpgtoolsApp:routes
 * @description
 * # routes.js
 *
 * Configure routes for use with Angular, and apply authentication security
 * Add new routes to the ROUTES constant or use yo angularfire:route to create them
 *
 * Any controller can be secured so that it will only load if user is logged in by
 * using `whenAuthenticated()` in place of `when()`. This requires the user to
 * be logged in to view this route, and adds the current user into the dependencies
 * which can be injected into the controller. If user is not logged in, the promise is
 * rejected, which is handled below by $routeChangeError
 *
 * Any controller can be forced to wait for authentication to resolve, without necessarily
 * requiring the user to be logged in, by adding a `resolve` block similar to the one below.
 * It would then inject `user` as a dependency. This could also be done in the controller,
 * but abstracting it makes things cleaner (controllers don't need to worry about auth state
 * or timing of displaying its UI components; it can assume it is taken care of when it runs)
 *
 *   resolve: {
 *     user: ['simpleLogin', function(simpleLogin) {
 *       return simpleLogin.getUser();
 *     }]
 *   }
 *
 */
angular.module('urpgtoolsApp')

/**
 * Adds a special `whenAuthenticated` method onto $routeProvider. This special method,
 * when called, invokes the authRequired() service (see simpleLogin.js).
 *
 * The promise either resolves to the authenticated user object and makes it available to
 * dependency injection (see AccountCtrl), or rejects the promise if user is not logged in,
 * forcing a redirect to the /login page
 */
  .config(['$routeProvider', 'SECURED_ROUTES', function($routeProvider, SECURED_ROUTES) {
    // credits for this idea: https://groups.google.com/forum/#!msg/angular/dPr9BpIZID0/MgWVluo_Tg8J
    // unfortunately, a decorator cannot be use here because they are not applied until after
    // the .config calls resolve, so they can't be used during route configuration, so we have
    // to hack it directly onto the $routeProvider object
    $routeProvider.whenAuthenticated = function(path, route) {
      route.resolve = route.resolve || {};
      route.resolve.user = ['authRequired', function(authRequired) {
        return authRequired();
      }];
      $routeProvider.when(path, route);
      SECURED_ROUTES[path] = true;
      return $routeProvider;
    };
  }])

  // configure views; the authRequired parameter is used for specifying pages
  // which should only be available while logged in
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'

      })
      .whenAuthenticated('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl'
      })

      .whenAuthenticated('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      })
      .whenAuthenticated('/characters', {
        templateUrl: 'views/characters.html?u='+ Math.random(),
        controller: 'CharactersCtrl'
      })
      .whenAuthenticated('/sessions', {
        templateUrl: 'views/sessions.html',
        controller: 'SessionsCtrl'
      })
      .whenAuthenticated('/genres', {
        templateUrl: 'views/genres.html',
        controller: 'GenresCtrl'
      })
        .whenAuthenticated('/pc/:cid', {
            templateUrl: 'views/player.character.html',
            controller: 'PlayerCharacterCtrl'
        })
      .otherwise({redirectTo: '/'});
  }])

  /**
   * Apply some route security. Any route's resolve method can reject the promise with
   * { authRequired: true } to force a redirect. This method enforces that and also watches
   * for changes in auth status which might require us to navigate away from a path
   * that we can no longer view.
   */
  .run(['$rootScope', '$location', 'simpleLogin', 'SECURED_ROUTES', 'loginRedirectPath',
    function($rootScope, $location, simpleLogin, SECURED_ROUTES, loginRedirectPath) {
      // watch for login status changes and redirect if appropriate
      simpleLogin.watch(check, $rootScope);
      $rootScope.$on('$firebaseSimpleLogin:login', function() {
          //location.reload();
      });
      // some of our routes may reject resolve promises with the special {authRequired: true} error
      // this redirects to the login page whenever that is encountered

      function check(user) {
        if( !user && authRequired($location.path()) ) {
          $location.path(loginRedirectPath);
        }
      }

      function authRequired(path) {
        return SECURED_ROUTES.hasOwnProperty(path);
      }


    }
  ])

  // used by route security
  .constant('SECURED_ROUTES', {});
