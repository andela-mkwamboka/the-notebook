(function() {
  "use strict"
  angular.module('noteApp', ['ui.router', 'ngResource', 'hc.marked'])
    .config(function(markedProvider) {
      markedProvider.setOptions({ gfm: true });
    });
}());