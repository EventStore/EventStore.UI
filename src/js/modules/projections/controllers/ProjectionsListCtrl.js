define(['./_module'], function (app) {

    'use strict';

    return app.controller('ProjectionsListCtrl', [
		'$rootScope', '$scope', '$timeout', 'ProjectionsService', 'ProjectionsMapper', 'poller', 'MessageService', '$state',
		function ($rootScope, $scope, $timeout, projectionsService, projectionsMapper, pollerProvider, msg, $state) {

            if($rootScope.projectionsMode == 'None') {
                msg.failure('Projections are not enabled on the node');
                $state.go('dashboard.list');
                return;
            }
            
			var all = pollerProvider.create({
				interval: 2000,
				action: projectionsService.all,
				params: [ false ]
			});

			all.start();
			all.promise.then(null, null, function (data) {
				$scope.projections = projectionsMapper.map(data);
			});

			all.promise.catch(function () {
				msg.failure('An error occurred');
				all.stop();
			});

			$scope.disableAll = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				var confirmation = msg.confirm('Are you sure you want to disable & stop all projections?');

				if(!confirmation) {
					return;
				}

				projectionsService.disableAll().then(function () {
					msg.success('All projections have been disabled');
				}, function (err) {
					msg.failure('Disabling all the projections have failed, reason :' + '\n\r' + err);
				});
			};

			$scope.enableAll = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				var confirmation = msg.confirm('Are you sure you want to enable & start all projections?');

				if(!confirmation) {
					return;
				}

				projectionsService.enableAll().then(function () {
					msg.success('All projections have been enabled');
				}, function (err) {
					msg.failure('Enabling all projections have failed, reason : ' + '\n\r' + err);
				});
			};

			$scope.includeQueries = false;
			$scope.toggleIncludeQueries = function(){
				$scope.includeQueries = !$scope.includeQueries;
			}

                        $scope.showCopiedMessage = function (projection) {
                          projection.copied = true;

                          msg.success('Copied "' + projection.name + '" to clipboard');

                          $timeout(function () {
                            projection.copied = false;
                          }, 4000);
                        };

			var unbindHandler = $scope.$watch('includeQueries', function (newVal, oldVal) {
				if(newVal !== oldVal) {
					all.update({params: [newVal]});
				}
				
			});
			$scope.$on('$destroy', function () {
				unbindHandler();
				pollerProvider.clear();
			});
		}
	]);
});
