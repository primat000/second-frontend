'use strict';
angular.module('sprintFrontendApp')
    .controller('ProjectCtrl', ['$rootScope', '$scope', '$cookies', '$window',  'ProjectService',
        function ($rootScope, $scope, $cookies, $window, ProjectService ){

        $scope.projects = [{
            name: "First"
        }];
        $scope.invetations = [];
        ProjectService.LoadProjects($rootScope.userId).then((data)=> {
            $scope.projects = data;
        });
        ProjectService.LoadInvitations($rootScope.userId).then((data)=> {
            $scope.invetations = data;
        });

        $scope.accept = function(userId, projectId){
            ProjectService.accept(userId,projectId).then((data)=>{
                ProjectService.loadProject(userId).then((data1)=> {
                    $scope.projects = data1;
                });
                ProjectService.LoadInvitations(userId).then((data2)=> {
                    $scope.invetations = data2;
                });
            });


        };

    }]);