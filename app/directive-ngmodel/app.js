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
         require: 'ngModel',
         scope: {},
         // priority: 0,
         template: '<p>#{{scopeMessage}}</p>',
         link: function (originalScope, elem, attrs, ngModelCtrl) {

            if (!ngModelCtrl)
               throw new Error('ng-model is required');

            // console.log('ngModelCtrl.$viewValue = ' + ngModelCtrl.$viewValue);

            // create a new scope so we don't mess with originalScope
            // originalScope can always be accessed via scope.$parent
            // scope can access property of originalScope
            // e.g. scope.foo = 'bar' if we set originalScope.foo = 'bar';
            var scope = originalScope.$new();
            console.assert(scope.$parent === originalScope);

            originalScope.$on('$destroy', function () {
               scope.$destroy();
               console.log('destroy $new scope');
            });

            ngModelCtrl.$render = function () {
               // render is called whenever ng-model changes
               // be careful we can only call setter via scope.$parent
               // but we can always call getter via scope
               scope.$parent.scopeMessage = ngModelCtrl.$viewValue || '';
            };

            elem.on('click', function () {
               scope.$evalAsync(change);
            });

            function change() {
               // $setViewValue updates view value which will trigger model change since it binds to ngModel!
               ngModelCtrl.$setViewValue(scope.scopeMessage.toUpperCase());
               ngModelCtrl.$render();
            }
         }
      }
   });