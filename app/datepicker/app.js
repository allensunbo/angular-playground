angular.module('app', ['ui.bootstrap'])
   .constant('TWELVE', 12)
   .controller('MainCtrl', function ($scope, $timeout, TWELVE) {
      $scope.mode = 'hide';
      $scope.dt = Array.apply(null, Array(TWELVE)).map(function () {
         return null;
      });

      var today = new Date();
      $scope.selectedDate = formatDate(today);

      $scope.open = function () {
         $scope.mode = $scope.mode === 'hide' ? 'show' : 'hide';
         $scope.dt[0] = today;
         for (var i = 1; i < TWELVE; i++) {
            var current = new Date(today.getFullYear(), today.getMonth() + i, 1);
            $scope.dt[i] = current;
         }
      }

      $scope.$watchCollection(function () {
         return $scope.dt;
      }, watchFn($scope, $timeout, TWELVE));

   });

function watchFn($scope, $timeout, TWELVE) {
   return function (newValue, oldValue) {
      var index = arrayDiff(oldValue, newValue), newValue = newValue[index];
      if (!newValue) {
         return;
      }
      newValue = new Date(newValue);
      $scope.dt[index] = newValue;
      $scope.selectedDate = formatDate(newValue);

      $timeout(function () {
         for (var i = 0; i < TWELVE; i++) {
            if (index !== i)
               $scope.dt[i] = null;
         }
      }, 0);
   }
}

function formatDate(date) {
   return date.getFullYear()
      + '-'
      + ( (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))
      + '-'
      + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
}

function arrayDiff(a, b) {
   var len = Math.max(a.length, b.length);
   for (var i = 0; i < len; i++) {
      if (i < a.length && i < b.length) {
         if (a[i] !== b[i]) return i;
      } else if (i >= a.length && b[i] !== null) {
         return i;
      } else if (i >= b.length && a[i] !== null) {
         return i;
      }
   }
}


