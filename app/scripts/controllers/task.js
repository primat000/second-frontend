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


        }]);