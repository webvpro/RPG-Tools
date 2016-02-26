'use strict';

/**
 * @ngdoc function
 * @name urpgtoolsApp.controller:CharactermodalCtrl
 * @description
 * # CharactermodalCtrl
 * Controller of the urpgtoolsApp
 */
angular.module('urpgtoolsApp')
  .controller('CharacterModalCtrl',function($scope, $modalInstance){
        $scope.character = {};


        $scope.ok = function () {
            $scope.character.session=null;
           $scope.characters.$add($scope.character);
            $modalInstance.dismiss('cancel');
        };
        $scope.close = function () {
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
  });
