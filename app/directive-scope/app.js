angular.module('app', [])
   .controller('MainCtrl', function ($scope) {
      $scope.message = 'Hello, world!';
      $scope.change = function () {
         // console.log('change')
      }
   })

   .directive('demoDirective', function ($parse) {
      return {
         restrict: 'EA',
         replace: true,
         scope: {},
         // priority: 0,
         template: '<p>#{{scopeMessage}}</p>',
         link: function (scope, elem, attrs) {
            // get attribute value through either ng-model or option
            // in this demo, ng-model takes precedence
            var value = $parse(attrs['ngModel'])(scope.$parent) || $parse(attrs['option'])(scope.$parent);
            scope.scopeMessage = value;
            scope.$watch(function () {
               // this basically watches changes from controller
               return $parse(attrs['ngModel'])(scope.$parent) || $parse(attrs['option'])(scope.$parent);
            }, function (newVal) {
               scope.scopeMessage = newVal;
            });
            elem.on('click', function () {
               scope.scopeMessage = elem[0].innerHTML.toUpperCase();
               scope.$digest();
            });

         }
      }
   });

