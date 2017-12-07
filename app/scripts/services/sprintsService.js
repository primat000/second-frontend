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

            this.loadBars = function () {
                return $http.get('http://localhost:9090/Intervals?sprintId=1&userId=1'
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
		}]
	);