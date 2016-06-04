'use strict';

var app = angular.module('demo', ['ngSanitize', 'ui.select']);

app.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  }
});

app.controller('DemoCtrl', function($scope, $http) {
  $scope.disabled = undefined;

  $scope.enable = function() {
    $scope.disabled = false;
  };

  $scope.disable = function() {
    $scope.disabled = true;
  };

  $scope.clear = function() {
    $scope.person.selected = undefined;
    $scope.address.selected = undefined;
    $scope.country.selected = undefined;
  };

  $scope.person = {};
  $scope.people = [
    { name: 'DES 127A',  course: 'Sustainable Design' },
    { name: 'DES 138',   course: 'Materials and Methods in Interior Design', },
    { name: 'DES 142A',  course: 'World Textiles: E. Hemisphere' },
    { name: 'DES 142B',  course: 'World Textiles: W. Hemisphere' },
    { name: 'DES 143',   course: 'History of Fashion' },
    { name: 'DES 144',   course: 'History of Interior Design'},
    { name: 'DES 145',   course: 'History of Visual Communication' },
    { name: 'DES 149',   course: 'Information Design: Principles' }
  ];

  $scope.address = {};
  $scope.refreshAddresses = function(address) {
    var params = {address: address, sensor: false};
    return $http.get(
      'http://maps.googleapis.com/maps/api/geocode/json',
      {params: params}
    ).then(function(response) {
      $scope.addresses = response.data.results
    });
  };
});
