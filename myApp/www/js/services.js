angular.module('starter.services', [])

.factory('Cars', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var cars = [];

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
          url: baseUrl + '/api/car/' + carId + "?token=" + token,
          method: 'GET'
      });
    }
  };
});
