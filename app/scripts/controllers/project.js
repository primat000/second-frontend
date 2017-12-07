'use strict';
angular.module('sprintFrontEnd')
    .controller('ProjectCtrl',['$rootScope','$scope','$cookies','ProjectService',
    function($rootScope,$scope,$cookies,ProjectService){

        $scope.inProgressTasks = [];

    }])