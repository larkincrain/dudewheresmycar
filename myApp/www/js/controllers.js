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

  // $scope.signUp = function() {
  //   // Users.
  // }

})

.controller('CarsCtrl', function($scope, $window, Cars) {
  $scope.token = $window.localStorage['token'];

  console.log('were in the cars controller');
  //alert('were in the cars controller');

  $scope.cars = []; 
  $scope.currentDate = new Date();

  Cars.all($scope.token).then(function(data) {
    console.log('we got cars successfully');
    //alert('we got cars successfully');

    $scope.cars = data.data;

    // iterate through each car object to get more detailed data (activites)
    $scope.cars.forEach(function(car) {
      Cars.get($scope.token, car._id)
        .then(function(data){

          car.activities = [];
          car.status = 'In';
          car.activities = data.data.filteredActivities;
          
          car.activities.forEach(function(activity) {
            if (new Date(activity.check_out_time).getTime() <= $scope.currentDate.getTime() &&
              new Date(activity.check_in_time_expected).getTime() >= $scope.currentDate.getTime())
              car.status = 'Out';
              // TODO if the car is leaving within 30 minutes then status should be "out soon! :-)"
          });
        }).catch(function(err){
          alert('error getting cars');
          alert(JSON.stringify(err));
        });
    });

  })
  .catch(function(err) {
    // alert('err');
    // alert(JSON.stringify(err));
  });
})

.controller('CarDetailCtrl', function($scope, $stateParams, $state, $window, Cars, Activities) {
  $scope.token = $window.localStorage['token'];

  console.log('were in the car detail controller');
  //alert('were in the car detail controller');

  $scope.car = {};
  $scope.activities = [];
  $scope.newActivity = {
    message: '',
    checkOutTime: '',
    checkInTimeExpected: ''
  };

  var token = $window.localStorage['token'];
  var email = $window.localStorage['email'];
  var carId = $stateParams.carId;

  Cars.get($scope.token, carId).then(function(data) {
    console.log('we got the car successfully');

    $scope.car = data.data.car;
    $scope.activities = data.data.filteredActivities;
  })
  .catch(function(err) {
    alert('err');
    alert(JSON.stringify(err));
  });

  $scope.book = function() {
    //create a new booking
    Activities.create(
      token,
      email,
      carId,
      $scope.newActivity.checkOutTime,
      $scope.newActivity.checkInTimeExpected,
      $scope.newActivity.message
    ).then(function(data) {
      
      console.log('saved activity');
      alert('Booking saved successfully.');

      //refresh the new booking
      $scope.newActivity.checkOutTime = null;
      $scope.newActivity.checkInTimeExpected = null;
      $scope.newActivity.message = "";

      //refresh the list of bookings
      Cars.get($scope.token, carId).then(function(data) {
        console.log('we got the car successfully');

        $scope.car = data.data.car;
        $scope.activities = data.data.filteredActivities;
      })
      .catch(function(err) {
        alert('err');
        alert(JSON.stringify(err));
      });

    }).catch(function(err){
      console.log('got an error');
      console.log(err);
    });
  }
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

.controller('AccountCtrl', function($scope, $window, Users) {
  
  $scope.user = {};
  $scope.email = $window.localStorage['email'];
  $scope.token = $window.localStorage['token'];

  // let's get the user from their email
  Users.get($scope.token, $scope.email)
    .then(function(data) {
      $scope.user = data.data[0];
    });

    $scope.save = function() {
      Users.update(
        $scope.token,
        $scope.email,
        $scope.user.name,
        $scope.user.phonenumber,
        $scope.user.profile_picture)
        .then(function(data){
          console.log(data);
          alert('success!');
        })
    }
});
