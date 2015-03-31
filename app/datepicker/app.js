angular.module('app', ['ui.bootstrap'])
   .controller('MainCtrl', function ($scope, $q, $timeout, $interval) {
      $scope.dt = [];
      $scope.open = function () {
         console.log('open');
         $scope.mode = $scope.mode === 'hide' ? 'show' : 'hide';
         $scope.dt[0] = new Date();

      }

      $scope.mode = 'hide';

      $scope.$watch(function () {
         return $scope.dt[0];
      }, function (newValue) {
         console.log('changed:' + newValue);
      });

   });


