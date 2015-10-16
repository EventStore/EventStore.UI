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
			}];

			$scope.namedConsumerStrategy = 'RoundRobin';

			$scope.save = function () {
				if($scope.newSubscription.$invalid) {
					msg.warn('Please fix all validation errors');
					return;
				}

				var param = {
					checkpoints: $scope.checkpoints,
					enabled: $scope.enabled,
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
					.then(function (data, status, headers) {
						var location = headers()['location'];
						msg.success("Subscription has been created");
						$state.go('^.list', {
							location: encodeURIComponent(location)
						});
					}, function(response, status, data, header){
						msg.failure('Coudn\'t create new subscription because ' + response.statusText);
					});
			};
		}
	]);
});