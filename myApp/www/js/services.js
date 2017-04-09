angular.module('starter.services', [])

.factory('Users', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var cars = [];

  var liveBaseUrl = 'http://128.199.81.211:1235';
  var localBaseUrl = 'http://localhost:1235';
  var baseUrl = liveBaseUrl;

  return {
    all : function(token) {

      console.log('calling all cars!');
      //alert('calling all cars!');

      return $http({
          url: baseUrl + '/api/cars' + "?token=" + token,
          method: 'GET'
      });
    },

    login : function(email, password) {
      return $http({
          url: baseUrl + '/api/authenticate',
          method: 'POST',
          data: {
            email : email,
            password : password
          }
      });
    },

    get : function(token, email) {
      return $http({
          url: baseUrl + '/api/users/email/' + email + '?token=' + token,
          method: 'GET',

      });
    },

    update : function(
      token,
      email,
      name,
      phonenumber,
      profile_picture) {
      return $http({
        url: baseUrl + '/api/users/update',
        method: 'POST',
        data: {
          token : token,
          email : email,
          name : name,
          phonenumber : phonenumber,
          profile_picture : profile_picture
        }
      });
    },

    signUp : function(email, password) {
      return $http({
          url: baseUrl + '/api/users',
          method: 'POST',
          data: {
            email : email,
            password : password,
            name : '',
            admin : false,
            profile_picture : ''
          }
      });
    }

  };
})

.factory('Cars', function($http) {
  
  var baseUrl = 'http://128.199.81.211:1235';

  return {
    all: function(token) {

      console.log('calling all cars!');
      //alert('calling all cars!');

      return $http({
          url: baseUrl + '/api/cars' + "?token=" + token,
          method: 'GET'
      });
    },
    remove: function(car) {
      cars.splice(cars.indexOf(car), 1);
    },
    get: function(token, carId) {
      return $http({
          url: baseUrl + '/api/cars/' + carId + "?token=" + token,
          method: 'GET'
      });
    }
  };
})

.factory('Activities', function($http){

  var baseUrl = 'http://128.199.81.211:1235';

  return {
    create : function(token, email, carId, checkOutTime, checkInTimeExpected, message) {
      return $http({
        url : baseUrl + '/api/activities/',
        method : 'POST',
        data : {
          token : token,
          email : email,
          carId : carId,
          checkOutTime : checkOutTime,
          checkInTimeExpected : checkInTimeExpected,
          message : message
        }
      });
    },
    update : function(token, email, activityId, checkInTime) {
      return $http({
        url : baseUrl + '/api/activities/update',
        method : 'POST',
        data : {
          token : token,
          email : email,
          activityId : activityId,
          checkInTime : checkInTime
        }
      });
    },
    delete : function(token, email, activityId) {
      return $http({
        url : baseUrl + '/api/activities/delete',
        method : 'POST',
        data : {
          token : token,
          email : email,
          activityId : activityId
        }
      });
    },
  };
});
