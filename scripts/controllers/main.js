'use strict';

/**
 * @ngdoc function
 * @name urpgtoolsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the urpgtoolsApp
 */
angular.module('urpgtoolsApp')
  .controller('MainCtrl', function ($scope,$location) {
        $scope.go = function ( path ) {
            $location.path( path );
        };
  });
