define(['./_module'], function (app) {

    'use strict';

    return app.controller('ProjectionsItemDebugCtrl', [
		'$scope', '$state', '$stateParams', '$q', '$timeout', '$window', 'ProjectionsService', 'MessageService',
		function ($scope, $state, $stateParams, $q, $timeout, $window, projectionsService, msg) {
		    function updateStatusInfo(message) {
		        if (!message) {
		            message = 'N/A';
		        }
		        $scope.statusInfo = message;
		    }

		    function setPartition(partition) {
		        partition = '(' + partition + ')';
		        $scope.currentPartition = partition;
		    }

		    updateStatusInfo('');
		    $scope.location = $stateParams.location;

		    function queryChanged(){
		    	$scope.queryUpdated = true;
		    };

		    $scope.aceConfig = {
		        mode: 'javascript',
		        useWrapMode: false,
		        showGutter: true,
		        theme: 'monokai',
		        onChange: queryChanged
		    };

		    $scope.aceEventsConfig = {
		        mode: 'json',
		        useWrapMode: false,
		        showGutter: true,
		        theme: 'monokai'
		    };

		    $scope.isRunning = false;
		    $scope.isUpdating = false;
		    $scope.query = '';
		    $scope.events = '';
		    $scope.state = '';

		    var rawEvents, currentEvent, definition, currentPosition, partition, initialized, processor, cachedStates = {};

		    updateStatusInfo('Loading definition...');

            function loadProjection(){
                //clear the cache
                cachedStates = {};
                
                var requests = [];
                var stats = projectionsService.statistics($scope.location);
                var state = projectionsService.state($scope.location, {timeout: 2000});
                var query = projectionsService.query($scope.location);

                requests.push(stats);
                requests.push(state);
                requests.push(query);

                $q.allSettled(requests)
                .then(function (data) {
                    // 0 - stats
                    // 1 - state
                    // 2 - query
                    var stats = data[0],
                        state = data[1],
                        query = data[2],
                        position;

                    if (stats.data.projections[0].status.indexOf('Stopped') > -1 && stats.data.projections[0].status.indexOf('Faulted') > -1) {
                        $scope.isRunning = true;
                    }

                    position = state.headers()['es-position'];
                    currentPosition = angular.fromJson(position);
                    definition = query.data.definition;

                    $scope.query = query.data.query;

                    if(!currentPosition){
	                    msg.failure('The projection\`s state query did not return an ES-Position header.\nEnsure that the projection is not Completed/Stopped or Faulted.\nWe cannot continue debugging.', 'Please ensure that the header includes ES-Position.');
	                    $scope.isRunning = true;
	                    return;
	                }

                    updateStatusInfo('');
                    loadEvents();
                }, function (data){
                    var stats = data[0],
                    	query = data[2];
                    $scope.query = query.data.query;
					msg.failure('Projection has failed because of ' + stats.data.projections[0].stateReason, stats.data.projections[0].status);
				});
            }
            msg.info("The projection will be stopped for debugging");
            projectionsService.disable($scope.location)
            .then(function onProjectionEnabled(){
	            loadProjection();
	        });
           	var currentLoadEventsTimeout;
		    function loadEvents() {
		        projectionsService.readEvents(definition, currentPosition)
				.success(function (data) {
				    $scope.events = JSON.stringify(data, undefined, 4);
				    rawEvents = data.events;

				    if (rawEvents && rawEvents.length > 0) {
				        prepare();
				    } else {
				        updateStatusInfo('No further events are available. Waiting...');
                        $scope.isRunning = true;
				        currentLoadEventsTimeout = $timeout(loadEvents, 1000);
				    }

				})
				.error(function (data, status) {
                    msg.failure("We failed reading the events for the projection.");
				});
		    }

		    function prepare() {
		        currentEvent = rawEvents[0];

		        if (initialized) {
		            loadState();
		            return;
		        }

		        updateStatusInfo('Running the definition...');
		        $scope.$broadcast('load-scripts');
		        $timeout(loadState, 100);

		    }

		    function loadState() {

		        processor = document.getElementById('script-placeholder').contentWindow.processor;
		        if (!processor) {
		            $timeout(loadState, 1000);
		            return;
		        }

		        initialized = true;
		        updateStatusInfo('');
		        partition = null;

		        if (definition.byCustomPartitions) {
		            partition = processor.get_state_partition(
                            currentEvent.isJson ? angular.toJson(currentEvent.data) : currentEvent.data,
                            currentEvent.isJson,
                            currentEvent.eventStreamId,
                            currentEvent.eventType,
                            currentEvent.category,
                            currentEvent.eventNumber,
                            currentEvent.isJson ? angular.toJson(currentEvent.metadata) : currentEvent.metadata);
		        } else if (definition.byStream) {
		            partition = currentEvent.eventStreamId;
		        } else {
		            partition = '';
		        }

		        setPartition(partition);

		        if (cachedStates[partition]) {
		            stateLoaded(cachedStates[partition]);
		        } else {
		            updateStatusInfo('Loading the projection state...');
		            projectionsService.state($scope.location, {
		                partition: partition
		            })
					.success(function (data) {
					    stateLoaded(data);
					})
					.error(function () {
					    updateStatusInfo('Error loading the projection state');
					});
		        }
		    }

		    function stateLoaded(data) {
		        var cached;
		        updateStatusInfo('Ready for debugging!');
		        $scope.isRunning = false;
		        if (data === "") {
		            processor.initialize();
		            cachedStates[partition] = processor.debugging_get_state();
		        } else {
		        	data = tryParseJSON(data) ? data : angular.toJson(data)
		        	cachedStates[partition] = data;
		            processor.set_state(data);
		        }
		        try {
		            cached = angular.fromJson(cachedStates[partition]);
		            $scope.state = cached;
		        } catch (e) {
		            $scope.state = '';
		        }
		    }

			function tryParseJSON (jsonString){
			    try {
			        var o = JSON.parse(jsonString);
			        if (o && typeof o === "object" && o !== null) {
			            return o;
			        }
			    }
			    catch (e) { }

			    return false;
			};

		    function cancelLoadingEvents(){
		    	if(currentLoadEventsTimeout){
		    		$timeout.cancel(currentLoadEventsTimeout);
		    		currentLoadEventsTimeout = null;
		    	}
		    }

		    $scope.runStep = function () {
		        var state = processor.process_event(
                    currentEvent.isJson ? JSON.stringify(currentEvent.data) : currentEvent.data,
                    currentEvent.isJson,
                    currentEvent.eventStreamId,
                    currentEvent.eventType,
                    currentEvent.category,
                    currentEvent.eventNumber,
                    currentEvent.isJson ? JSON.stringify(currentEvent.metadata) : currentEvent.metadata,
                    partition);

		        cachedStates[partition] = state;
		        currentPosition = currentEvent.readerPosition;
		        loadEvents();
		    };

		    $scope.update = function () {
                $scope.isUpdating = true;
		        projectionsService.updateQuery($scope.location, $scope.query)
				.success(function () {
				    msg.info('Projection Updated');
                    $window.location.reload();
				})
				.error(function () {
                    $scope.isUpdating = false;
				    msg.failure('Projection not updated');
				});
		    };

		    $scope.stop = function () {
		    	cancelLoadingEvents();
		        projectionsService.disable($scope.location)
				.success(function () {
				    msg.info('Projection Stopped');
				    $scope.isRunning = false;
				})
				.error(function () {
				    msg.failure('projection could not be stopped');
				});
		    };
		}
    ]);
});
