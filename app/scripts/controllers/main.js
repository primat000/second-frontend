'use strict';

/**
 * @ngdoc function
 * @name sprintFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sprintFrontendApp
 */
angular.module('sprintFrontendApp')
	.controller('MainCtrl', ['$rootScope', '$scope', '$cookies', '$window', 'AuthService', 'SprintsService', 'TasksService',
		function ($rootScope, $scope, $cookies, $window, AuthService, SprintsService, TasksService) {
			$rootScope.isDescriptionShowing = false;
			$rootScope.isLoggedIn = false;

            $scope.timeStart = '';
            $scope.timeEnd = '';

            $scope.projects = [];
            $scope.choisedProject = {};

			$scope.unknownTasks = [
			];
			$scope.inProgressTasks = [
			// 	{ name: 'Сверстать основную страницу', assignee: 'Yana'},
			// 	{ name: 'Сделать регистрацию', assignee: 'Yana'}
			// ];
			// $scope.testingTasks = [
			// 	{ name: 'Логин', assignee: 'Yana'},
             //    { name: 'Test', assignee: 'Vitaly', id:1}
			// ];
			// $scope.readyTasks = [
			// 	{ name: 'Создать структуру проекта', assignee: 'Yana'}
			// ];
			// $scope.sprints = [{
			// 	name: 'Спринт 1', active: true
			// }, {
			// 	name: 'Спринт 2', active: false
			// }, {
			// 	name: 'Спринт 3', active: false
			// }
			];






			$rootScope.logout = function() {
				AuthService.logout().then(() => {
					$window.location.reload();
				});
			};

			AuthService.getUserInfo().then((data) => {
				$rootScope.isLoggedIn = true;
				$rootScope.userId = data;
                SprintsService.loadProject($rootScope.userId).then((projects) => {
                    $scope.projects = projects;
                });
			}).catch(() => {
				$rootScope.isLoggedIn = false;
			});

            $scope.createSprint = function() {
            	var sprint = {
                    timeStart: $scope.timeStart,
                    timeEnd: $scope.timeEnd
				};
            	$scope.choisedProject = $scope.selectedProject;
                SprintsService.createSprint(sprint,$scope.choisedProject.id).then((data)=>{
                    SprintsService.loadSprints($scope.choisedProject.id).then((sprints) => {
                        $scope.sprints = sprints;
                    });
				});



            };


            $scope.selectChange = function() {
                $scope.choisedProject = $scope.selectedProject;
                SprintsService.loadSprints($scope.choisedProject.id).then((sprints) => {
                    $scope.sprints = sprints;
                });

            };
			$scope.setSprint = function (sprint) {
				for (let sprint of $scope.sprints) {
					sprint.active = false;
				}

				sprint.active = true;

				TasksService.getTasks(sprint.id, 'unknown').then((tasks) => {
					$scope.unknownTasks = tasks;
				});

				TasksService.getTasks(sprint.id, 'inProgress').then((tasks) => {
					$scope.inProgressTasks = tasks;
				});

				TasksService.getTasks(sprint.id, 'testing').then((tasks) => {
					$scope.testingTasks = tasks;
				});

				TasksService.getTasks(sprint.id, 'ready').then((tasks) => {
					$scope.readyTasks = tasks;
				});
			};
		}]);
