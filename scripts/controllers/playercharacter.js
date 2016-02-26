'use strict';

/**
 * @ngdoc function
 * @name urpgtoolsApp.controller:PlayercharacterCtrl
 * @description
 * # PlayercharacterCtrl
 * Controller of the urpgtoolsApp
 */
angular.module('urpgtoolsApp')
  .controller('PlayerCharacterCtrl',['$routeParams','$scope','user','userCharacters', '$modal',function ($routeParams,$scope,user,userCharacters,$modal) {
    $scope.character_id = $routeParams.cid;
        $scope.character = userCharacters.getByCharacterId(user,$scope.character_id);
        $scope.traits = userCharacters.getCharacterTraits(user,$scope.character_id);
        $scope.editTraits = {};
        $scope.character.$loaded()
            .then(function (data) {
                $scope.character = data;
            });
        $scope.traits.$loaded()
            .then(function (data) {
                $scope.traits = data;
            });


        /***  genre  ***/
        $scope.genre = {name:'Nerval', traits:[
            {code:'BOD',name:'Body'}
            ,{code:'END',name:'Endurance'}
            ,{code:'PRC',name:'Perception'}
            ,{code:'KNW',name:'Knowledge'}
            ,{code:'AGL',name:'Agility'}
            ,{code:'COR',name:'Coordination'}
        ]};
        $scope.genre.mod_range_max = 10;
        $scope.genre.chang_range = 5;
        $scope.genre.trait_total = 3;

        /* eof genre */

        $scope.getCost =function(mod){
            var modOp = mod.charAt(0);
            var modVal = parseInt(mod.substring(1));
            var cRange = $scope.genre.chang_range;
            var cost= 0

            if(modVal <= cRange){
                cost = modVal;
            }else{
                // chang rule.
                var CR = Math.floor(modVal / cRange)
                cost = (CR + 1) + modVal;
             }
            if(modOp == '+'){
                return Math.abs(cost);
            }else{
                return -Math.abs(cost);
            }


        }
        $scope.getTraitMod = function(){
            var opts=[];
            for (var i = 0; i < ($scope.genre.mod_range_max*2); i++) {
                var opt = {cost:0,mod:'+0'};
                var val = i+1;
                if( val < $scope.genre.mod_range_max){
                    opt.mod = "-"+val;
                    opt.cost = $scope.getCost(opt.mod);
                    opts[i]=opt;

                } else if (val == $scope.genre.mod_range_max){
                    opt.mod = "-"+val;
                    opt.cost = $scope.getCost(opt.mod);
                    opts[i]=opt;
                    opts.reverse();
                } else {
                    opt.mod = "+"+(val - $scope.genre.mod_range_max);
                    opts[i]=opt;
                }

            }
            return opts;
        }
        $scope.getTraitsTotals =function(){
            var spent = 0;
            var available = $scope.genre.trait_total
            angular.forEach($scope.traits, function(trait){
                  spent = trait.cost
            });
        };
        //fill the mod range
        $scope.modTraitRange = $scope.getTraitMod();

        $scope.addTrait = function(){
            $scope.trait_types =  [];
            $scope.trait ={};
            $scope.editTrait ={action_txt:'Add'};
            $scope.editTrait.description = '';

              // taken trait filter
            angular.forEach($scope.genre.traits, function(gtrait){
                var notTaken = true;
                angular.forEach($scope.traits, function(trait){
                     if(trait.name == gtrait.name ){
                         notTaken = false;
                     }
                });
                if(notTaken){
                    $scope.trait_types.push(gtrait);
                }
            });

            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'views/partials/modals/trait-form.html',
                controller: 'AddTraitModalCtrl',
                scope: $scope
            });



        }
        $scope.openEditTrait = function(trait){
            $scope.trait_types =  [];
            $scope.trait ={};
            $scope.trait = trait;
            // taken trait filter
            $scope.editTrait = angular.copy(trait);
            $scope.editTrait.action_txt = 'Edit';

            angular.forEach($scope.genre.traits, function(gtrait){
                var notTaken = true;
                angular.forEach($scope.traits, function(ct){
                    if(ct.name == gtrait.name && $scope.editTrait.name != ct.name){
                        notTaken = false;
                    }
                });
                if(notTaken){
                    $scope.trait_types.push(gtrait);
                }
            });

            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'views/partials/modals/trait-form.html',
                controller: 'EditTraitModalCtrl',
                scope: $scope
            });


        }

        $scope.removeTrait = function(trait){
            $scope.traits.$remove(trait);
        }
  }])
    .controller('AddTraitModalCtrl',function($scope, $modalInstance){
        $scope.close = function () {
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.saveTrait = function () {
            $scope.trait.name = $scope.editTrait.name;
            $scope.trait.mod =$scope.editTrait.mod;
            $scope.trait.description = $scope.editTrait.description;
            $scope.trait.cost =$scope.getCost($scope.editTrait.mod);
            console.log($scope.trait);
            $scope.traits.$add($scope.trait);
            $scope.close();
        };

    })
    .controller('EditTraitModalCtrl',function($scope, $modalInstance){
        $scope.close = function () {
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.saveTrait = function () {

            $scope.trait.name = $scope.editTrait.name;
            $scope.trait.mod =$scope.editTrait.mod;
            $scope.trait.description = $scope.editTrait.description;
            $scope.trait.cost =$scope.getCost($scope.editTrait.mod);
            console.log($scope.trait);
            $scope.traits.$save($scope.trait);
            $scope.close();
        };

    });

