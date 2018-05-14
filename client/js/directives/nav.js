(function() {
  'use strict';
  angular.module('noteApp').directive('navigation', function() {
    return {
      restrict: 'E',
      templateUrl: '../../templates/nav.html'
    };
  });
}());