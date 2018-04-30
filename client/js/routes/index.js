(function() {
  "use strict";

  angular.module('noteApp')
    .config(($urlRouterProvider, $stateProvider) => {

      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '../../templates/home.html',
          controller: 'mainController'
        })
        .state('notes', {
          url: '/notes',
          templateUrl: '../../templates/notes.html',
          controller: 'notesController',
          secure: true
        })
        .state('note', {
          url: '/notes/:_id',
          templateUrl: '../../templates/note.html',
          controller: 'noteController',
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
          controller: 'userController'
        })
        .state('logout', {
          url: '/logout',
          templateUrl: '../../templates/logout.html',
          controller: 'userController',
          secure: true
        })
    })
    .run(function($rootScope, $location, $cookies, $http) {
      // $rootScope.currentUser = $cookieStore.get('user_id') || {};
      // console.log('$r')
      // if ($rootScope.currentUser) {
      //   $http.defaults.headers.common['x-access-token'] = $rootScope.token;
      // }

      $rootScope.$on('$locationChangeStart', function(event, next, current) {
        console.log('------------------------------------');
        console.log(event);
        console.log('------------------------------------');
        console.log(next);
        console.log('------------------------------------');
        console.log(current);

        $rootScope.token = $cookies.get('token') || {};
        // redirect to home page if not logged in and trying to access a restricted page
        if (next && next.$$route && next.$$route.secure) {
          if (rootScope.token) {
            $rootScope.$evalAsync(function() {
              $location.path('/home');
            });
          }
        }
      });

    });
})();