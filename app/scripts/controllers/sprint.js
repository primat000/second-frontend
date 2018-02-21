'use strict';
angular.module('sprintFrontendApp')
    .controller('SprintCtrl',['$rootScope','$scope','$routeParams','SprintsService','TasksService',
        function($rootScope,$scope,$routeParams,SprintsService,TasksService){

            $scope.projects = [];
            $scope.choisedProject = {};


            $scope.intervals = [
                // ['Move', 'Percentage'],
                // ["King's pawn (e4)", 44],
                // ["Queen's pawn (d4)", 31],
                // ["Knight to King 3 (Nf3)", 12],
                // ["Queen's bishop pawn (c4)", 10],
                // ['Other', 3]
            ];
            $scope.sprints = [
            //     {
            //     name: 'Спринт 1', active: true
            // }, {
            //     name: 'Спринт 2', active: false
            // }, {
            //     name: 'Спринт 3', active: false
            // }
            ];


            SprintsService.loadProject($rootScope.userId).then((projects) => {
                $scope.projects = projects;
            })

            //$scope.choisedProject = $scope.projects[0];

            SprintsService.loadSprints($scope.choisedProject).then((sprints) => {
                $scope.sprints = sprints;
            });

            $scope.selectChange = function(){
                $scope.choisedProject = $scope.selectedProject;
                SprintsService.loadSprints($scope.choisedProject.id).then((sprints) => {
                    $scope.sprints = sprints;
                });
            };

            $scope.setSprint = function (sprint) {
                for (let sprint of $scope.sprints) {
                    sprint.active = false;
                }
                sprint.active = true;

                 SprintsService.loadBars(sprint.id,$rootScope.userId).then((intervals)=>{
                    $scope.intervals = intervals;
                });
                // SprintsService.loadIntervalFAKE(1).then((interval)=>{
                //     $scope.intervals = interval;
                // });
                google.charts.load('current', {'packages':['bar']});
                google.charts.setOnLoadCallback(drawStuff);

                function drawStuff() {
                    var data = new google.visualization.arrayToDataTable($scope.intervals);

                    var options = {
                        width: 800,
                        legend: { position: 'none' },
                        chart: {
                            title: 'Tasks in sprint',
                            subtitle: '' },
                        axes: {
                            x: {
                                0: { side: 'top', label: 'tasks'} // Top x-axis.
                            }
                        },
                        bar: { groupWidth: "90%" }
                    };

                    var chart = new google.charts.Bar(document.getElementById('top_x_div'));
                    // Convert the Classic options to Material options.
                    chart.draw(data, google.charts.Bar.convertOptions(options));
                };

            };

        }]);