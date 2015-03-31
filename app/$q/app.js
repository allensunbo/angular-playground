angular.module('app', [])
   .controller('MainCtrl', function ($scope, $q, $timeout) {

      // $q.when accepts obj or promise

      $q.when(getUser()).then(function (user) {
         console.log('getUser');
         console.log(user);
      });
      $q.when(getUserAsync($timeout)).then(function (user) {
         console.log('getUserAsync');
         console.log(user);
      });

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