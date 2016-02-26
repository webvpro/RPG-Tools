'use strict';
/**
 * @ngdoc function
 * @name urpgtoolsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('urpgtoolsApp')
  .controller('LoginCtrl', function ($scope, simpleLogin, $location) {
    $scope.oauthlogin = function(provider) {
      login(provider, {
        rememberMe: true
      });
    };

    $scope.passwordLogin = function(email, pass) {
      login('password', {
        email: email,
        password: pass,
        rememberMe: true
      });
    };

    $scope.createAccount = function(email, pass, confirm) {
      $scope.errs = [];
      if( !pass ) {
        $scope.errs.push('Please enter a password');
      }
      else if( pass !== confirm ) {
        $scope.errs.push('Passwords do not match');
      }
      else {
        simpleLogin.createAccount(email, pass/*, name*/)
          .then(function() {
            $location.path('/account');
          }, function(err) {
            $scope.errs.push(err);
          });
      }
    };

    function login(provider, opts) {
      $scope.errs = [];
      simpleLogin.login(provider, opts).then(
        function() {
          $location.path('/account');
        },
        function(err) {
          $scope.errs.push(err);
        }
      );
    }
        $scope.closeAlert = function(index) {
            $scope.errs.splice(index, 1);
        };
  });