angular.module('app')
   .directive('multipleDatepicker', function () {
      return {
         restrict: "E",
         templateUrl: 'multiple-datepicker.html',
         link: function (scope) {
            scope.open = function () {
               scope.mode = 'show';
            }
         }
      }
   });