'use strict';

angular.module('sprintFrontendApp')
    .service('CommentService',['$http','$cookies','$q',
        function($http){
            this.getComments = function(taskId){
                return $http.get('http://localhost:9090//tasks/'+taskId+'/comments')
                    .then((data)=> {
                    return data.data;
                });
            };

        }]);