/**
 * Created by Yana Tokareva on 07.11.2017.
 */

'use strict';

angular.module('sprintFrontendApp')
	.service('SprintsService', ['$http',
		function ($http) {
			this.loadSprints = function (projectId) {
				return $http.get('http://localhost:9090/sprints', {
					params: { projectId }
				}).then((data) => {
					const sprints = data.data;

					sprints.map((sprint) => {
						sprint.name = `${moment(sprint.timeStart).format('MMMM Do YYYY')} -- ${moment(sprint.timeEnd).format('MMMM Do YYYY')}`;
						sprint.active = false;
					});
					return sprints;
				});
			};

            this.createSprint = function (sprint,projectId) {
                return $http.post('http://localhost:9090/sprints?projectId='+projectId,sprint)
                    .then((data) => {
                    });
            };

            this.loadProject = function (userId) {
                //var pr = [
                //    {name : "111", id : 1},
                //    {name : "222", id : 2},
                //    {name : "333", id : 3}
                //];
//
                //return pr;
                return $http.get('http://localhost:9090/projects?userId=' + userId)
                    .then((data) => {
                    const project = data.data;

                    return project;
                });
            };

            this.loadBars = function (sprintId,userId) {
                return $http.get('http://localhost:9090/Intervals?sprintId=' + sprintId + '&userId=' + userId
				).then((data) => {
                    const bars = data.data;
                    let resault = [['Task', 'Time in hour']];
                    var cur = [];
 					for(var i=0;Object.keys(bars).length > i ; i++){
						cur.push(Object.keys(bars)[i]);
                        cur.push(bars[Object.keys(bars)[i]]);
                        resault.push(cur);
                        cur = [];
					}
                    return resault;
                });
            };


			this.loadIntervalFAKE = function(SprintId){
				return [
                    ['Move', 'Percentage'],
                    ["Robocop", 48],
                    ["Robo theith", 42],
                    ["Robo fisherman", 51],
                    ["Robo robot", 35],
                    ['Other', 3]
                ];
			};
            this.createSprint = function (projectId, sprintBody) {
                return $http.post('http://localhost:9090/sprints?projectId=' + projectId, sprintBody);
            };
		}]
	);