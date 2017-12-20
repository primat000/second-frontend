'use strict';

angular.module('sprintFrontendApp')
    .service('ProjectService',['$http','$rootScope',
    function($http,$rootScope){
        this.LoadProjects = function(userId){
            return $http.get('http://localhost:9090/projects?userId=' + userId)
                .then((data)=> {
                return data.data;
            });
        };
        this.LoadInvitations = function(userId){
            return $http.get('http://localhost:9090/invitations',{
                params: { userId }
            }).then((data)=> {
                return data.data;
            });
        };

        this.createProject = function(userId,description){
            return $http.post('http://localhost:9090/addproject?userId=' + userId,description).then(()=> {
            });
        };
        this.inviteMember = function(userName, projectDescription, userId){
            return $http.post('http://localhost:9090/adduser?userName=' + userName + '&projectDescription=' +
                projectDescription + '&userId=' + userId
                ).then(()=> {
            });
        };

        this.accept = function(projectId){
            return $http.post('http://localhost:9090//acceptinvitation?userId='+ $rootScope.userId+ '&projectId='+ projectId).then((data)=> {
                return data.data;
            });
        };

    }]);