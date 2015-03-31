angular.module('app', ['ui.bootstrap'])
   .controller('MainCtrl', function ($scope, $q, $timeout, $interval) {
      $scope.dt = [];
      $scope.open = function () {
         console.log('open');
         $scope.mode = $scope.mode === 'hide' ? 'show' : 'hide';
         $scope.dt[0] = '2015-03-31';

      }

      $scope.mode = 'hide';

      $scope.$watchCollection(function () {
         return $scope.dt;
      }, function (newValue, oldValue) {
         var index = arrayDiff(oldValue, newValue),
            value = newValue[index];
         if (!value) {
            return;
         }
         for (var i = 0; i < 12; i++) {
            $scope.dt[i] = undefined;
         }
         console.log(index);
         console.log(value);
         $scope.dt[index] = value;
      });

   });

function arrayDiff(a, b) {
   var len = Math.max(a.length, b.length);
   for (var i = 0; i < len; i++) {
      if (i < a.length && i < b.length) {
         if (a[i] !== b[i]) return i;
      } else if (i >= a.length && b[i] !== undefined) {
         return i;
      } else if (i >= b.length && a[i] !== undefined) {
         return i;
      }
   }
}


