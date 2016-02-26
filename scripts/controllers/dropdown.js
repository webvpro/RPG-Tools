'use strict';

/**
 * @ngdoc function
 * @name urpgtoolsApp.controller:DropdownCtrl
 * @description
 * # DropdownCtrl
 * Controller of the urpgtoolsApp
 */
angular.module('urpgtoolsApp')
  .controller('DropdownCtrl', function ($scope, simpleLogin) {
        $scope.logout = simpleLogin.logout;
    $scope.alerts = [
      'Alert 1',
      'Alert 2',
      'Alert 3'
    ];
        $scope.chats = [
            {'text':'New Chat','url':'../#/chat'},
            {'text':'Chat Head 1','url':'../#/chat/1'},
            {'text':'Chat Head 2','url':'../#/chat/2'},
            {'text':'Chat Head 3','url':'../#/chat/3'}
        ];

        $scope.account_links = [
            {'text':'Sessions','url':'../#/sessions'},
            {'text':'Characters','url':'../#/characters'},
            {'text':'Genres','url':'../#/genres'},
            {'text':'My Account','url':'../#/account'}
        ];

  });
