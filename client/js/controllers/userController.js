(function() {
  angular.module('noteApp')
    .controller('userController', function($scope, $location, $window, userFactory, $reload) {
      $scope.signup = () => {
        userFactory.signup($scope.username, $scope.email, $scope.password);
        $route.reload();
        $location.path('/notes')
      };
      $scope.login = () => {
        userFactory.login($scope.username, $scope.password);
        $location.path('/notes')
      };
      $scope.logout = () => {
        $window.localStorage.removeItem('user_id');
        $location.path('/')
      };
    });
}());