/**
 * Created by Yana Tokareva on 24.10.2017.
 */
'use strict';

angular.module('sprintFrontendApp').controller('LoginCtrl', ['$scope', '$rootScope', '$window', 'AuthService',
		function ($scope, $rootScope, $window, AuthService) {
			$scope.username = '';
			$scope.password = '';
			$scope.remember = false;
			$scope.loginError = false;

			$scope.login = function() {
				AuthService.authenticate($scope.username, $scope.password, true).then((data) => {
                    $rootScope.userId = data;
					$window.location = $rootScope.targetUrl ? $rootScope.targetUrl : "/";
				}).catch(() => {
					$scope.loginError = true;
				});
			};

			$scope.resetStatus = function() {
				$scope.loginError = false;
			};
		}]);