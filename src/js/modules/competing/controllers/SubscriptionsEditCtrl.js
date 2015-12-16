/*jshint sub: true*/
define(['./_module'], function (app) {

    'use strict';

    return app.controller('SubscriptionsEditCtrl', [
		'$scope', '$state', 'CompetingService', 'MessageService',
		function ($scope, $state, competingService, msg) {
			$scope.stream = $state.params.streamId;
			$scope.subscription = $state.params.groupName;
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

			competingService.subscriptionDetail($scope.stream, $scope.subscription)
				.success(function(data){
					$scope.config = data.config;
			});

			$scope.namedConsumerStrategy = 'RoundRobin';

			$scope.save = function () {
				if($scope.updateSubscription.$invalid) {
					msg.warn('Please fix all validation errors');
					return;
				}

				var param = {
					checkpoints: $scope.config.checkpoints,
					enabled: $scope.config.enabled,
					resolveLinktos: $scope.config.resolveLinktos,
		            startFrom: $scope.config.startFrom,
		            messageTimeoutMilliseconds: $scope.config.messageTimeoutMilliseconds,
		            extraStatistics: $scope.config.extraStatistics,
		            maxRetryCount: $scope.config.maxRetryCount,
		            liveBufferSize: $scope.config.liveBufferSize,
		            bufferSize: $scope.config.bufferSize,
		            readBatchSize: $scope.config.readBatchSize,
		            checkPointAfterMilliseconds: $scope.config.checkPointAfterMilliseconds,
		            minCheckPointCount: $scope.config.minCheckPointCount,
		            maxCheckPointCount: $scope.config.maxCheckPointCount,
		            maxSubscriberCount: $scope.config.maxSubscriberCount,
		            namedConsumerStrategy: $scope.config.namedConsumerStrategy
				};

				competingService.update($scope.stream, $scope.subscription, param)
					.success(function (data, status, headers) {
						var location = headers()['location'];
						msg.success("Subscription has been updated");
						$state.go('subscriptions.list', {
							location: encodeURIComponent(location)
						});
					})
					.error(function (response) {
						msg.failure('Coudn\'t update subscription because ' + response.reason);
					});
			};
		}
	]);
});