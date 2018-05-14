(function() {
  'use strict';
  angular.module('noteApp', ['ui.router', 'ngResource', 'hc.marked', 'ngStorage'])
    .config(function(markedProvider) {
      markedProvider.setOptions({ gfm: true });
    });
}());