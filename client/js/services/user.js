(function() {
  angular.module('noteApp')
    .factory('userFactory', function($location, $resource, $cookies) {

      return {

        // handle signup
        signup: (username, email, password) => {
          const resource = $resource('/api/users/', null, { post: { method: 'POST' } });
          return resource.post({ username: username, email: email, password: password })
            .$promise
            .then((result) => {
              console.log(result)
                // store token
              $cookies.put('token', result.token);
              $cookies.put('user_id', result.user._id);

            });
        },
        // handle login
        login: (username, password) => {
          const resource = $resource('/api/users/login', null, { post: { method: 'POST' } });
          return resource.post({ username: username, password: password }).$promise
            .then((result) => {
              console.log(result)
                // store token
              $cookies.put('token', result.token);
              $cookies.put('user_id', result.user._id);
            });
        },
        // handle logout
        logout: () => {
          const resource = $resource('/api/users/logout', null, { post: { method: 'POST' } });
          $cookies.remove('token');
          return resource.post()
        }
      };
    });
})();