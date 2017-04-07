angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, Users, $location, $window) {

  $scope.user = {
    email: '',
    password:''
  };
  
  console.log('were in the login controller');
  //alert('were in the login controller');

  $scope.login = function() {
    Users.login($scope.user.email, $scope.user.password).then(function(data) {
      console.log('we logged in successfully');
      //alert('we logged in successfully');

      $window.localStorage['email'] = $scope.user.email;
      $window.localStorage['token'] = data.data.jwt;

      $location.path('/cars');
    })
    .catch(function(err) {
      alert('err');
      alert(JSON.stringify(err));
    });
  }

})

.controller('CarsCtrl', function($scope, Cars) {
  $scope.token = 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7ImVtYWlsIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsImRhdGVfam9pbmVkIjoiaW5pdCIsInByb2ZpbGVfcGljdHVyZSI6ImRlZmF1bHQiLCJhZG1pbiI6ImluaXQiLCJfX3YiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7InByb2ZpbGVfcGljdHVyZSI6dHJ1ZX0sImluaXQiOnsiX192Ijp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImRhdGVfam9pbmVkIjp0cnVlLCJhZG1pbiI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfX0sImlzTmV3IjpmYWxzZSwiX21heExpc3RlbmVycyI6MCwiX2RvYyI6eyJlbWFpbCI6InN1c2FuLmxpc3RlckBvbmVhY3JlZnVuZC5vcmciLCJwYXNzd29yZCI6IiQyYSQxMCRWVmcxeGRQRWJnSzUxTlVqSDBMOWtPL2VuTkdob2ZsOHVpSm96Vk1UZU1TUDVLNUc1V25iQyIsImRhdGVfam9pbmVkIjoiMjAxNy0wNC0wMlQxMjo1NTowMi40NDJaIiwicHJvZmlsZV9waWN0dXJlIjoiIiwiYWRtaW4iOnRydWUsIl9fdiI6MCwibmFtZSI6InN1enp5LXEiLCJfaWQiOiI1OGUwZjRhNmU4YzMzOGE5ZWUwNmMyMTYifSwiX3ByZXMiOnsic2F2ZSI6W251bGwsbnVsbCxudWxsXX0sIl9wb3N0cyI6eyJzYXZlIjpbXX0sImlhdCI6MTQ5MTU3NzAyNiwiZXhwIjoxNDkxNjYzNDI2fQ.LY5r0acXJR7-isDM5Rm9E7jiIm_qtfMg9gOlg492oac';

  console.log('were in the cars controller');
  //alert('were in the cars controller');

  $scope.cars = []; 

  Cars.all($scope.token).then(function(data) {
    console.log('we got cars successfully');
    //alert('we got cars successfully');

    $scope.cars = data.data;
  })
  .catch(function(err) {
    alert('err');
    alert(JSON.stringify(err));
  });

})

.controller('CarDetailCtrl', function($scope, $stateParams, Cars) {
  $scope.token = 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7ImVtYWlsIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsImRhdGVfam9pbmVkIjoiaW5pdCIsInByb2ZpbGVfcGljdHVyZSI6ImRlZmF1bHQiLCJhZG1pbiI6ImluaXQiLCJfX3YiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7InByb2ZpbGVfcGljdHVyZSI6dHJ1ZX0sImluaXQiOnsiX192Ijp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImRhdGVfam9pbmVkIjp0cnVlLCJhZG1pbiI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfX0sImlzTmV3IjpmYWxzZSwiX21heExpc3RlbmVycyI6MCwiX2RvYyI6eyJlbWFpbCI6InN1c2FuLmxpc3RlckBvbmVhY3JlZnVuZC5vcmciLCJwYXNzd29yZCI6IiQyYSQxMCRWVmcxeGRQRWJnSzUxTlVqSDBMOWtPL2VuTkdob2ZsOHVpSm96Vk1UZU1TUDVLNUc1V25iQyIsImRhdGVfam9pbmVkIjoiMjAxNy0wNC0wMlQxMjo1NTowMi40NDJaIiwicHJvZmlsZV9waWN0dXJlIjoiIiwiYWRtaW4iOnRydWUsIl9fdiI6MCwibmFtZSI6InN1enp5LXEiLCJfaWQiOiI1OGUwZjRhNmU4YzMzOGE5ZWUwNmMyMTYifSwiX3ByZXMiOnsic2F2ZSI6W251bGwsbnVsbCxudWxsXX0sIl9wb3N0cyI6eyJzYXZlIjpbXX0sImlhdCI6MTQ5MTU3NzAyNiwiZXhwIjoxNDkxNjYzNDI2fQ.LY5r0acXJR7-isDM5Rm9E7jiIm_qtfMg9gOlg492oac';

  console.log('were in the car detail controller');
  //alert('were in the car detail controller');

  $scope.car = {};

  console.log($stateParams.carId);
  //alert($stateParams.carId);

  Cars.get($scope.token, $stateParams.carId).then(function(data) {
    console.log('we got the car successfully');
    //alert('we got the car successfully');

    $scope.car = data.data;
  })
  .catch(function(err) {
    alert('err');
    alert(JSON.stringify(err));
  });

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
