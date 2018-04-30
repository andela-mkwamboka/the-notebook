(function() {
  angular.module('noteApp')
    .controller('userController', function($scope, $location, userFactory) {
      $scope.signup = (user) => {
        userFactory.signup($scope.username, $scope.email, $scope.password);
        $location.path('/notes')
      };
      $scope.login = (user) => {
        userFactory.login(user);
        $location.path('/notes')
      };
      $scope.logout = () => {
        $location.path('/')
      };
    });
}());