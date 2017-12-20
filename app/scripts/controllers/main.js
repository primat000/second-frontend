'use strict';

/**
 * @ngdoc function
 * @name sprintFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sprintFrontendApp
 */
angular.module('sprintFrontendApp')
	.controller('MainCtrl', ['$rootScope', '$scope', '$cookies', '$window', 'AuthService', 'SprintsService', 'TasksService','CommentService',
		function ($rootScope, $scope, $cookies, $window, AuthService, SprintsService, TasksService, CommentService) {
			$rootScope.isDescriptionShowing = false;
			$rootScope.isLoggedIn = false;
            $rootScope.isSprintSelect = false;
            $rootScope.choisedSprint = {};

            $scope.timeStart = '';
            $scope.timeEnd = '';

            $scope.projects = [];
            $scope.choisedProject = {};
            $scope.choisedSprint = {};
            $scope.choisedTask = {};
            $scope.assignee = '';
            // $scope.status = '';

			$scope.unknownTasks = [
			];
			$scope.inProgressTasks = [
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
                SprintsService.createSprint($scope.choisedProject.id, sprint).then((data)=>{
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
				$scope.choisedSprint = sprint;
                $rootScope.choisedSprint = sprint;
                $rootScope.isSprintSelect = true;

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
            $scope.setTask = function (task) {
                for (let task of $scope.inProgressTasks) {
                    task.active = false;
                }
                for (let task of $scope.testingTasks) {
                    task.active = false;
                }
                for (let task of $scope.readyTasks) {
                    task.active = false;
                }

                task.active = true;
                $scope.choisedTask = task;
                CommentService.getComments($scope.choisedTask.id).then((comments)=>{
                    $scope.comments = comments;
                });
            };

            $scope.createTask = function () {
                TasksService.createTask($rootScope.choisedSprint.id, $scope.assignee, $scope.taskBody).then(
                    ()=>{
                        TasksService.getTask($rootScope.choisedSprint.id).then((task ) => {
                            $scope.task = task;
                        });
                    }
                )
            };
            $scope.createComment = function () {
                CommentService.createComment($scope.choisedTask.id, $scope.choisedTask.commentBody).then(() => {
                    CommentService.getComments($scope.choisedTask.id).then((comments)=>{
                        $scope.comments = comments;
                        $scope.commentBody.text = "";
                    });
                })
            };
            $scope.changeStatus = function () {
				console.log($scope.choisedTask.status);
				TasksService.changeStatus($scope.choisedTask.id, $scope.choisedTask.status).then(() =>{
                    TasksService.getTasks($scope.choisedSprint.id, 'unknown').then((tasks) => {
                        $scope.unknownTasks = tasks;
                    });

                    TasksService.getTasks($scope.choisedSprint.id, 'inProgress').then((tasks) => {
                        $scope.inProgressTasks = tasks;
                    });

                    TasksService.getTasks($scope.choisedSprint.id, 'testing').then((tasks) => {
                        $scope.testingTasks = tasks;
                    });

                    TasksService.getTasks($scope.choisedSprint.id, 'ready').then((tasks) => {
                        $scope.readyTasks = tasks;
                    });
				})
            };

		}]);
