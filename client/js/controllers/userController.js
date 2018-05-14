(function() {
  angular.module('noteApp')
    .controller('userController', function($scope, $location, $window, userFactory) {
      $scope.signup = () => {
        userFactory.signup($scope.username, $scope.email, $scope.password).then(
          (response) => {
            window.location.reload();
            (response) ? $location.path('/notes'): null;
            return response;
          },
          (error) => {
            $scope.error = error.data.message;
          });
      };
      $scope.login = () => {
        userFactory.login($scope.username, $scope.password).then(
          (response) => {
            window.location.reload();
            (response) ? $location.path('/notes'): null;
          },
          (error) => {
            $scope.error = (error) ? 'Wrong username or password' : 'Try again';
          });
      };
      $scope.logout = () => {
        userFactory.logout();
        window.location.reload();
        $location.path('/');
      };
    });
}());