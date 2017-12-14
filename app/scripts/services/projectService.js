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

        this.accept = function(projectId){
            return $http.post('http://localhost:9090//acceptinvitation?userId='+ $rootScope.userId+ '&projectId='+ projectId).then((data)=> {
                return data.data;
            });
        };

    }]);