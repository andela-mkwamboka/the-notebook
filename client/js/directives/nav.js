(function() {
  'use strict';

  angular.module('noteApp').directive('navigation', function(userFactory) {
    return {
      restrict: 'E',
      templateUrl: '../../templates/nav.html'
    };
  });
}());