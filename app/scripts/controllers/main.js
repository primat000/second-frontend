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
            $scope.users = [];
            $scope.userIsSendingTask = '';

            $scope.projects = [];
            $scope.choisedProject = {};
            $scope.choisedSprint = {};
            $scope.choisedTask = {};
            $scope.assignee = '';
            $scope.taskAction = '';

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
                var tmStart = $scope.timeStart;
                tmStart.setDate(tmStart.getDate() + 2);
                var tmEnd = $scope.timeEnd;
                tmEnd.setDate(tmEnd.getDate() + 2);
            	var sprint = {
                    timeStart: tmStart,
                    timeEnd: tmEnd
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
                TasksService.getUsersInProject($scope.choisedProject.id).then((users) => {
                    $scope.users = users;
                });
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
                TasksService.getTaskInfo($scope.choisedTask.id).then((taskInfo) => {
                	if(taskInfo.data.action === 'Stop') $scope.taskAction = 'Start'
						else  $scope.taskAction = 'Stop';

				});
            };

            $scope.createTask = function () {
                TasksService.createTask($rootScope.choisedSprint.id, $scope.userIsSendingTask.username, $scope.taskBody).then(
                    ()=>{
                        TasksService.getTasks($rootScope.choisedSprint.id, 'inProgress').then((tasks) => {
                            $scope.inProgressTasks = tasks;
                        });

                        TasksService.getTasks($rootScope.choisedSprint.id, 'testing').then((tasks) => {
                            $scope.testingTasks = tasks;
                        });

                        TasksService.getTasks($rootScope.choisedSprint.id, 'ready').then((tasks) => {
                            $scope.readyTasks = tasks;
                        });
                    }
                )
            };
            $scope.changeStopStartToTask = function () {
            	if ($scope.taskAction === 'Stop') {
            		TasksService.stopTask($scope.choisedTask.id).then(()=>{
                        $scope.taskAction = 'Start';
                    })

                }
				else TasksService.startTask($scope.choisedTask.id).then(()=>{
                    $scope.taskAction = 'Stop';
                })
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
