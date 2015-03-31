angular.module('app', ['ngAria'])
   .controller('MainCtrl', function ($scope) {
      $scope.message = 'Hello, world!';
      $scope.content = 'content...';
      $scope.change = function () {
         // console.log('change')
      }
   })

   .directive('demoDirective', function ($parse, $document) {
      return {
         restrict: 'EA',
         replace: true,
         scope: {
            content: '='
         },
         // priority: 0,
         template: '<p>#{{scopeMessage}}/{{content}}</p>',
         link: function (scope, elem, attrs) {
            // get attribute value through either ng-model or option
            // in this demo, ng-model takes precedence
            var value = $parse(attrs['ngModel'])(scope.$parent) || $parse(attrs['option'])(scope.$parent);
            scope.scopeMessage = value;
            scope.$watch(function () {
               // this basically watches for changes from controller
               return $parse(attrs['ngModel'])(scope.$parent) || $parse(attrs['option'])(scope.$parent);
            }, function (newVal) {
               scope.scopeMessage = newVal;
            });
            elem.on('click', function () {
               scope.scopeMessage = elem[0].innerHTML.toUpperCase();
               scope.$digest();
            });

            // console.log($document.find('input'))
            // $document.find('input').attr('aria-hidden', true);

         }
      }
   });

