// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ion-datetime-picker'])

.run(function($ionicPlatform, $rootScope, $window, $location, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

    // check for access token
    if ($window.localStorage['token'].toString() == 'null') {
      if (toState.name != 'tab.login') {
        //we need to redirect to the login page

        $state.transitionTo("tab.login", null, {notify:true});
      }
    } else {
      console.log('we have a token!');
      // we have a token
      if (toState.name == 'tab.login') {
        e.preventDefault();
        console.log('were going to the account page');
        $state.transitionTo("tab.account", null, { reload: true, notify : false });
      }
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.login', {
    url: '/login',
    views: {
      'tab-account': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  // Each tab has its own nav history stack:
  .state('tab.cars', {
    url: '/cars',
    views: {
      'tab-cars': {
        templateUrl: 'templates/tab-cars.html',
        controller: 'CarsCtrl'
      }
    }
  })

  .state('tab.car-detail', {
    url: '/cars/:carId',
    views: {
      'tab-cars': {
        templateUrl: 'templates/car-detail.html',
        controller: 'CarDetailCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/cars');
});
