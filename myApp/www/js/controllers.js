angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, Users, $location, $window, $state) {

  console.log('were in the login controller');

  $scope.user = {
    email: '',
    password:''
  };

  $scope.email = $window.localStorage['email'];
  $scope.token = $window.localStorage['token'];

  console.log('token: ' + $scope.token);

  if ($scope.token == null ||
    $scope.token.toString() == 'null')
    $scope.isLoggedIn = false;
  else 
    $scope.isLoggedIn = true; 

  console.log('logged in: ' + $scope.isLoggedIn);

  if($scope.isLoggedIn){
    // let's get the user from their email
    Users.get($scope.token, $scope.email)
    .then(function(data) {
      if(data.data.success == false) {

        console.log('we got the user unsucessfully.');

        if(data.data.message.indexOf('token') > -1) {

          //we need to log in again
          $state.transitionTo("tab.login", null, {notify:false});
          $state.go('tab.login');
        }
      } else {
        $scope.user = data.data[0];
      }
    });
  }

  $scope.signUp = function() {
    console.log('were in the signup');

    Users.signUp($scope.user.email, $scope.user.password)
      .then(function(data) {
        if(data.data.success == true) {
          alert('user created successfully');

          $window.localStorage['email'] = $scope.user.email;
          $window.localStorage['token'] = data.data.jwt;

          $location.path('/cars');
        } else {
          alert('error');
          console.log(data);
        }
      });

    //todo fix this bug
    $window.location.reload(true)
  }

  $scope.login = function() {
    console.log('were in the login');

    Users.login($scope.user.email, $scope.user.password)
      .then(function(data) {
        if (data.data.success) {
          console.log('we logged in successfully');

          console.log('data');
          console.log(data);

          $window.localStorage['email'] = $scope.user.email;
          $window.localStorage['token'] = data.data.jwt;

          console.log('token: ');
          console.log($window.localStorage['token']);

          $location.path('/cars');
        } else {
          console.log('wroooooong!');
          alert('wrong');
        }
      })
      .catch(function(err) {
        alert('err');
        alert(JSON.stringify(err));
      });

    //todo fix this bug
    $window.location.reload(true)
  }

  $scope.save = function() {
    console.log('were in the save');

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

    //todo fix this bug
    $window.location.reload(true)
  }

  $scope.logout = function() {
    console.log('were in the logout');

    // delete the email and tokens from the local storage
    $window.localStorage.removeItem('email');
    $window.localStorage.removeItem('token');


    //todo fix this bug
    $window.location.reload(true)
  }

})

.controller('CarsCtrl', function($scope, $state, $window, Cars) {
  console.log('were in the cars controller');

  $scope.token = $window.localStorage['token'];

  $scope.cars = []; 
  $scope.currentDate = new Date();

  Cars.all($scope.token).then(function(data) {

    if(data.data.success == false) {

      console.log('we got cars unsucessfully.');

      if(data.data.message.indexOf('token') > -1) {

        //we need to log in again
        $state.transitionTo("tab.login", null, {notify:false});
        $state.go('tab.login');
      }
    } else {

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
                new Date(activity.check_in_time_expected).getTime() >= $scope.currentDate.getTime()){
                
                car.status = 'Out';
                
                //todo further specify when a car is next "out"
                // var isSameDay = new Date(activity.check_out_time).getDate() == $scope.currentDate.getDate();
                // if(isSameDay){
                //   //specify whether the car is going to be out within the next 60 mins
                //   var outWithin1Hour = 
                //     $scope.currentDate.getTime().getMinutes() - new Date(activity.check_out_time).getTime().getMinutes();
                //   if(outWithin1Hour <= 60){
                //     car.status = 'Out Soonish!';
                //   }
                //   //specify whether the car is going to be out within the next 30 mins
                //   var outWithin30Mins = 
                //     $scope.currentDate.getTime().getMinutes() - new Date(activity.check_out_time).getTime().getMinutes();
                //   if(outWithin30Mins <= 30){
                //     car.status = 'Out Soon!';
                //   }
                // }
              }

              //todo find the next most car activity
              //var mostNextActivity = activity._id;

            });
          }).catch(function(err){
            alert('error getting cars');
            alert(JSON.stringify(err));
          });
      });
    }

  })
  .catch(function(err) {
    alert('err getting all cars');
    alert(JSON.stringify(err));
  });
})

.controller('CarDetailCtrl', function($scope, $stateParams, $state, $window, Cars, Activities) {
  $scope.token = $window.localStorage['token'];

  console.log('were in the car detail controller');

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

  Cars.get($scope.token, carId)
    .then(function(data) {
      console.log('we got the car successfully');

      $scope.car = data.data.car;
      $scope.activities = data.data.filteredActivities;
    })
    .catch(function(err) {
      alert('err');
      alert(JSON.stringify(err));
    });

  $scope.checkOut = function() {
    //create a new activity
    Activities.create(token, email, carId, $scope.newActivity.checkOutTime, 
      $scope.newActivity.checkInTimeExpected, $scope.newActivity.message)
      .then(function(data) {
        
        //todo 'Car checked out successfully for MMM d, y h:mm a'
        console.log('Car checked out successfully.');
        alert('Car checked out successfully.');

        //refresh the new activity
        $scope.newActivity.checkOutTime = null;
        $scope.newActivity.checkInTimeExpected = null;
        $scope.newActivity.message = "";

        //refresh the list of activities
        Cars.get($scope.token, carId)
          .then(function(data) {
            console.log('we got the car + activities successfully');
            $scope.car = data.data.car;
            $scope.activities = data.data.filteredActivities;
          })
          .catch(function(err) {
            alert('err');
            alert(JSON.stringify(err));
          });

      })
      .catch(function(err){
        console.log('got an error');
        console.log(err);
      });
  }

  $scope.checkIn = function(activity) {

    var activityId = activity._id;
    var checkInTime = new Date().getTime();

    //update the activity
    Activities.update(token, email, activityId, checkInTime)
      .then(function(data) {
        
        //todo 'Car checked in successfully at MMM d, y h:mm a'
        console.log('Car checked in successfully.');
        alert('Car checked in successfully.');

        //refresh the list of activities
        Cars.get($scope.token, carId)
          .then(function(data) {
            console.log('we got the car + activities successfully');
            $scope.car = data.data.car;
            $scope.activities = data.data.filteredActivities;
          })
          .catch(function(err) {
            alert('err');
            alert(JSON.stringify(err));
          });

      })
      .catch(function(err){
        console.log('got an error');
        console.log(err);
      });
  }

  $scope.cancel = function(activity) {
    
    var activityId = activity._id;

    //delete the activity
    Activities.delete(token, email, activityId)
      .then(function(data) {
        
        //TODO 'Car checked in successfully at MMM d, y h:mm a'
        console.log('Car checked in successfully.');
        alert('Car checked in successfully.');

        //refresh the list of activities
        Cars.get($scope.token, carId)
          .then(function(data) {
            console.log('we got the car + activities successfully');
            $scope.car = data.data.car;
            $scope.activities = data.data.filteredActivities;
          })
          .catch(function(err) {
            alert('err');
            alert(JSON.stringify(err));
          });

      })
      .catch(function(err){
        console.log('got an error');
        console.log(err);
      });
  }
});
