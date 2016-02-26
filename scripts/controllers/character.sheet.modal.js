'use strict';

/**
 * @ngdoc function
 * @name urpgtoolsApp.controller:CharactermodalCtrl
 * @description
 * # CharactermodalCtrl
 * Controller of the urpgtoolsApp
 */
angular.module('urpgtoolsApp')
  .controller('CharacterSheetModalCtrl',function($scope, $modalInstance){
        $scope.gearStatus = {
            isopen: false
        };
        $scope.checked;
        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.gearStatus.isopen = !$scope.gearStatus.isopen;
        };
        $scope.close = function () {
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.delete = function () {
            console.log($scope.oCharacter.$id);
            $scope.characters.$remove($scope.oCharacter);
            $modalInstance.close();
        };
        $scope.editSheet = function () {
            console.log('Edit')
        }
  });
