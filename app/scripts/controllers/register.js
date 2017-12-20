'use strict';

/**
 * @ngdoc function
 * @name sprintFrontendApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the sprintFrontendApp
 */
angular.module('sprintFrontendApp')
  .controller('RegisterCtrl', ['$scope', '$rootScope', '$window', 'AuthService',
      function ($scope, $rootScope, $window, AuthService) {
          $scope.username = '';
          $scope.password = '';
          $scope.Email = '';
          $scope.Phone = '';

          $scope.registration = function() {
              var user = {
                  username: $scope.username,
                  password: $scope.password,
                  email: $scope.email,
                  phone: $scope.phone
              };
              AuthService.registration(user).then(() => {
                  $window.location = $rootScope.targetUrl ? $rootScope.targetUrl : "/";
              }).catch(() => {
                  $scope.loginError = true;
              });
          };
  }]);
