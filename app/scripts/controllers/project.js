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

        $scope.createProject = function(){
            var project = {
                description: $scope.description
            };
            ProjectService.createProject($rootScope.userId, project).then(() => {
                ProjectService.LoadProjects($rootScope.userId).then((data1) => {
                    $scope.projects = data1;
                });
            });

            ProjectService.LoadInvitations($rootScope.userId).then((data2) => {
                $scope.invetations = data2;
            });
            };

            $scope.inviteMember = function(){
                ProjectService.inviteMember($scope.description2, $scope.choisedProject.description, $rootScope.userId).then(() => {
                    ProjectService.LoadProjects($rootScope.userId).then((data1) => {
                        $scope.projects = data1;
                    });
                });

                ProjectService.LoadInvitations($rootScope.userId).then((data2) => {
                    $scope.invetations = data2;
                });
            };

        $scope.accept = function(userId, projectId){
            ProjectService.accept(userId,projectId).then((data)=>{
                ProjectService.LoadProjects(userId).then((data1)=> {
                    $scope.projects = data1;
                });
                ProjectService.LoadInvitations(userId).then((data2)=> {
                    $scope.invetations = data2;
                });
            });
        };

        $scope.selectChange = function(){
                $scope.choisedProject = $scope.selectedProject;
            };

    }]);