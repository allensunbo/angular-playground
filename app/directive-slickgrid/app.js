angular.module('app', [])
   .controller('MainCtrl', function ($scope) {
      $scope.message = 'Hello, world!';
      $scope.change = function () {
         // console.log('change')
      }
   })

   .directive('slickgrid', function () {
      return {
         restrict: 'EA',
         scope: {

         },
         // priority: 0,
         templateUrl: 'slickgrid.tpl.html',
         link: function (scope, elem, attrs, ngModelCtrl) {


         }
      }
   });