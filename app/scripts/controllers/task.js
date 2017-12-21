'use strict';
angular.module('sprintFrontendApp')
    .controller('TaskCtrl',['$rootScope','$scope','$routeParams','TasksService','CommentService',
        function($rootScope,$scope,$routeParams,TasksService,CommentService){

            $scope.params = $routeParams;

            $scope.task = {kkkk : "dferf"};

            $scope.comments = {dfdf:"dsf"};


            TasksService.getTask($scope.params.id).then((task ) => {
                $scope.task = task;
            });

            CommentService.getComments($scope.params.id).then((comments)=>{
                $scope.comments = comments;
            });
            $scope.createTask = function () {
                TasksService.createTask($rootScope.choisedSprint.id, $scope.userIsSendingTask.username, $scope.taskBody).then(
                    ()=>{
                        TasksService.getTask($scope.params.id).then((task ) => {
                            $scope.task = task;
                        });
                    }
                )
            };
            $scope.createComment = function () {
                CommentService.createComment($scope.params.id, $scope.commentBody).then(() => {
                    CommentService.getComments($scope.params.id).then((comments)=>{
                        $scope.comments = comments;
                        $scope.commentBody.text = "";
                    });
                })
            };

        }]);