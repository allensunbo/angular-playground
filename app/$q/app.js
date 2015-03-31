angular.module('app', ['ui.bootstrap'])
   .controller('MainCtrl', function ($scope, $q, $timeout, $interval) {

      // $q.when accepts obj or promise
      $q.when(getUser()).then(function (user) {
         console.log('getUser');
         console.log(user);
      });
      $q.when(getUserAsync($timeout)).then(function (user) {
         console.log('getUserAsync');
         console.log(user);
      });

      // demo defer/promise notify
      var defer = _defer($q, $timeout);
      defer.promise.then(function (data) {
         console.log(data);
      }, function (reason) {
         alert('Failed: ' + reason);
      }, function (update) {
         $scope.dynamic = parseInt(update);
         // console.log('Got notification: ' + update);
      });

      var i = 0;
      var timer = $interval(function () {
         i++;
         defer.notify(i);
         if (i >= 100) {
            $interval.cancel(timer);
         }
      }, 100);
   });


function getUser() {

   return {
      name: 'user',
      age: 10
   }

}

function getUserAsync($timeout) {
   return $timeout(function () {
      return {
         name: 'async-user',
         age: 67
      };
   }, 2000);
}

function _defer($q, $timeout) {
   var defer = $q.defer();
   $timeout(function () {
      defer.resolve('Hello, world!');
   }, 11000);
   return defer;
}