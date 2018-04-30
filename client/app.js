(function() {
  "use strict"
  angular.module('noteApp', ['ui.router', 'ngResource', 'hc.marked', 'ngCookies'])
    .config(function(markedProvider) {
      markedProvider.setOptions({ gfm: true });
    });
}());