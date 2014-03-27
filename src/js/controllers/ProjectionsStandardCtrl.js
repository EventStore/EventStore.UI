define(['./_module'], function (app) {

    'use strict';

    return app.controller('ProjectionsStandardCtrl', [
		'$scope', '$state', 'ProjectionsService',
		function ($scope, $state, projectionsService) {

			$scope.types = [{
				value: 'native:EventStore.Projections.Core.Standard.IndexStreams',
				name: 'Index Streams'
			}, {
				value: 'native:EventStore.Projections.Core.Standard.CategorizeStreamByPath',
				name: 'Categorize Stream by Path'
			}, {
				value: 'native:EventStore.Projections.Core.Standard.CategorizeEventsByStreamPath',
				name: 'Categorize Event by Stream Path'
			}, {
				value: 'native:EventStore.Projections.Core.Standard.IndexEventsByEventType',
				name: 'Index Events by Event Type'
			}, {
				value: 'native:EventStore.Projections.Core.Standard.StubHandler',
				name: 'Reading Speed Test Handler'
			}];
			
			$scope.type = 'native:EventStore.Projections.Core.Standard.IndexStreams';
			$scope.save = function () {

				if($scope.newProj.$invalid) {
					alert('please fix all validation errors');
					return;
				}

				projectionsService.createStandard($scope.name, $scope.type, $scope.source)
					.success(function (data, status, headers) {
						var location = headers()['location'];
						$state.go('^.item.details', {
							location: encodeURIComponent(location)
						});
					})
					.error(function () {
						alert('Coudn\'t create new standard projection');
					});
			};
		}
	]);
});