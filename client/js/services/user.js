(function() {
  angular.module('noteApp')
    .factory('userFactory', function($resource, $localStorage, $http) {
      return {
        // handle signup
        signup: (username, email, password) => {
          const resource = $resource('/api/users', null, { post: { method: 'POST' } });
          return resource.post({ username: username, email: email, password: password })
            .$promise
            .then((response) => {
              console.log(response)
                // store token
              $localStorage.currentUser = { user: response.user, token: response.token };
              return response;
            });
        },
        // handle login
        login: (username, password) => {
          const resource = $resource('/api/users/login', null, { post: { method: 'POST' } });
          return resource.post({ username: username, password: password })
            .$promise
            .then((response) => {
              // store token
              $localStorage.currentUser = { user: response.user, token: response.token };
              return response;
            });
        },
        // handle logout
        logout: () => {
          const resource = $resource('/api/users/logout', null, { post: { method: 'POST' } });
          // remove user from local storage, clear http auth header and delete token
          delete $localStorage.currentUser;
          $http.defaults.headers.common.Authorization = '';
          return resource.post();
        }
      };
    });
})();