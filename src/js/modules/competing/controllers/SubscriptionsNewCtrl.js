/*jshint sub: true*/
define(['./_module'], function (app) {

    'use strict';

    return app.controller('SubscriptionsNewCtrl', [
		'$scope', '$state', 'CompetingService', 'MessageService',
		function ($scope, $state, competingService, msg) {
			$scope.namedConsumerStrategies = [{
				value: 'RoundRobin',
				name: 'Round Robin'
			}, {
				value: 'DispatchToSingle',
				name: 'Dispatch To Single'
			}, {
				value: 'Pinned',
				name: 'Pinned'
			}];

            setDefaults();

			$scope.save = function () {
				if($scope.newSubscription.$invalid) {
					msg.warn('Please fix all validation errors');
					return;
				}

				var param = {
					checkpoints: $scope.checkpoints,
					resolveLinktos: $scope.resolveLinktos,
		            startFrom: $scope.startFrom,
		            messageTimeoutMilliseconds: $scope.messageTimeoutMilliseconds,
		            extraStatistics: $scope.extraStatistics,
		            maxRetryCount: $scope.maxRetryCount,
		            liveBufferSize: $scope.liveBufferSize,
		            bufferSize: $scope.bufferSize,
		            readBatchSize: $scope.readBatchSize,
		            checkPointAfterMilliseconds: $scope.checkPointAfterMilliseconds,
		            minCheckPointCount: $scope.minCheckPointCount,
		            maxCheckPointCount: $scope.maxCheckPointCount,
		            maxSubscriberCount: $scope.maxSubscriberCount,
		            namedConsumerStrategy: $scope.namedConsumerStrategy
				};

				competingService.create($scope.stream, $scope.subscription, param)
					.then(function (data, status) {
						msg.success("Subscription has been created");
						$state.go('^.list');
					}, function(response){
						var error = response.statusText;
						if(response.data && response.data.reason) {
							error = response.data.reason;
						}
						msg.failure('Coudn\'t create new subscription because ' + error);
					});
			};

            function setDefaults(){
                $scope.checkpoints = 1000;
                $scope.resolveLinktos = false;
                $scope.startFrom = 0;
                $scope.messageTimeoutMilliseconds = 10000;
                $scope.extraStatistics = false;
                $scope.maxRetryCount = 10;
                $scope.liveBufferSize = 500;
                $scope.bufferSize = 500;
                $scope.readBatchSize = 20;
                $scope.checkPointAfterMilliseconds = 1000;
                $scope.minCheckPointCount = 10;
                $scope.maxCheckPointCount = 500;
                $scope.maxSubscriberCount = 10;
                $scope.namedConsumerStrategy = 'RoundRobin';
            }
		}
	]);
});
