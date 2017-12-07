'use strict';

angular.module('sprintFrontendApp')
    .service('ProjectService',['$http','$cookies','$q',
    function($http){
        this.LoadProjects = function(userId){
            return $http.get('http://localhost:9090/projects',{
                params: { userId }
            }).then((data)=> {
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

    }]);