'use strict';
/**
 * @ngdoc function
 * @name urpg.characters.controller
 * @description
 * # CharactersCtrl
 * Provides rudimentary character management functions.
 */
angular.module('urpgtoolsApp')
  .controller('CharactersCtrl',['$scope','user' , 'userCharacters', '$modal',function ($scope, user,userCharacters, $modal) {
        $scope.characters = userCharacters.getAllByUser(user);
        $scope.status =[];
        $scope.oCharacter = {};
        $scope.characters.$loaded()
            .then(function (data) {
                $scope.characters = data;
             });
        $scope.charStats = [{'abbr':'STR','name':'Strength'}
            ,{"abbr":"END","name":"Endurance"}
            ,{"abbr":"PERC","name":"Perception"}
            ,{"abbr":"INT","name":"Intelligence"}
            ,{"abbr":"AGL","name":"Agility"}
            ,{"abbr":"COR","name":"Coordination"}];
        $scope.openNew = function () {
            var modalInstance = $modal.open({
                templateUrl: 'views/partials/modals/character-form.html',
                controller: 'CharacterModalCtrl',
                scope: $scope
            });
        };
        $scope.openCharacter = function(c){
            $scope.oCharacter = $scope.characters.$getRecord(c.$id);

            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'views/partials/modals/character-sheet.html',
                windowTemplateUrl: 'views/partials/modals/character-bg.html',
                controller: 'CharacterSheetModalCtrl',
                scope: $scope
            });


        }


    }]);