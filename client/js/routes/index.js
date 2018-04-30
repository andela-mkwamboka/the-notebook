(function() {
  "use strict";

  angular.module('noteApp')
    .config(($urlRouterProvider, $stateProvider) => {

      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '../../templates/home.html',
          controller: 'mainController',
        })
        .state('notes', {
          url: '/notes',
          templateUrl: '../../templates/notes.html',
          controller: 'notesController',
          secure: true
        })
        .state('signup', {
          url: '/signup',
          templateUrl: '../../templates/signup.html',
          controller: 'userController'
        })
        .state('login', {
          url: '/login',
          templateUrl: '../../templates/login.html',
          controller: 'userController',
        })
        .state('logout', {
          url: '/logout',
          templateUrl: '../../templates/logout.html',
          controller: 'userController',
          secure: true
        })
    })
    .run(function($rootScope, $window, $location, $http) {
      const user_id = $window.localStorage.getItem('user_id');
      if (!user_id || user_id == null) {
        $location.path('/');
      }
    });

})();