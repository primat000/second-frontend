/**
 * Created by Yana Tokareva on 10.11.2017.
 */

'use strict';

angular.module('sprintFrontendApp')
	.service('TasksService', ['$http',
		function ($http) {
			this.getTasks = function (sprintId, status) {
				return $http.get('http://localhost:9090/tasks', {
					params: { sprintId, status }
				}).then((data) => {
					const tasks = data.data;

					tasks.map((task) => {
						/* подготовить поля тасков для их вывода на экран*/
					});

					return tasks;
				});
			};


            this.getTask = function (Id) {
                return $http.get('http://localhost:9090/tasks/' + Id)
					.then((data) => {
                    const task = data.data;
                    task.sprint.name = `${moment(task.sprint.timeStart).format('MMMM Do YYYY')} -- ${moment(task.sprint.timeEnd).format('MMMM Do YYYY')}`;

                    return task;
                });
            };
            this.createTask = function (sprintId, userName, taskBody) {
                return $http.post('http://localhost:9090/tasks/?'+'sprintId='+sprintId+'&userName='+userName, taskBody)
            };
            this.changeStatus = function (taskId, status) {
                return $http.put('http://localhost:9090/tasks/'+taskId+'?status='+status, {})
            };

		}]
	);