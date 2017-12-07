'use strict';

/**
 * @ngdoc overview
 * @name sprintFrontendApp
 * @description
 * # sprintFrontendApp
 *
 * Main module of the application.
 */
angular
	.module('sprintFrontendApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl',
			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl',
			})
			.when('/register', {
				templateUrl: 'views/register.html',
				controller: 'RegisterCtrl',
			})
			.when('/tasks/:id',{
				templateUrl: 'views/task.html',
				controller: 'TaskCtrl',
			})
            .when('/sprint',{
                templateUrl: 'views/sprint.html',
                controller: 'SprintCtrl',
            })
			.otherwise({
				redirectTo: '/'
			})
	})
	.factory('responseObserver', ['$rootScope', '$q', '$window',
		function responseObserver($rootScope, $q, $window) {
			return {
				'responseError': function(errorResponse) {
					switch (errorResponse.status) {
						case 403:
							if ($window.location.hash.indexOf("login") === -1)
								$rootScope.targetUrl = $window.location.hash;

							$window.location = '#!/login';
							break;
					}

					return $q.reject(errorResponse);
				}
			};
		}]);
