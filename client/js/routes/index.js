(function() {
  'use strict';
  angular.module('noteApp')
    .config(($urlRouterProvider, $stateProvider, $locationProvider) => {
      $locationProvider.html5Mode(true);
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
        });
    })
    .run(($rootScope, $http, $location, $localStorage) => {
      // keep user logged in after page refresh
      if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
      }
      // redirect to login page if not logged in and trying to access a restricted page
      $rootScope.$on('$locationChangeStart', () => {
        var publicPages = ['/login', '/signup'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
          $location.path('/');
        } else {
          $location.path('/notes');
        }
      });
    });
})();