angular.module('app')
   .directive('multipleDatepicker', function () {
      return {
         restrict: 'E',
         templateUrl: 'multiple-datepicker.html',
         controller: 'DatepickerController',
         link: function (scope, elem, attrs, datepickerController) {
            console.log('linking....');
            scope.dt = new Date();
            scope.open = function () {
               scope.mode = 'show';
            }
            console.log(datepickerController.modes);
         }
      }
   });