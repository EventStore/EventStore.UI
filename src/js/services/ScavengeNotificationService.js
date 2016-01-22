define(['./_module'], function (app) {
	'use strict';
		return app.factory('ScavengeNotificationService', ['$http', '$timeout', '$rootScope', 'AdminService', 'MessageService', 'constants',
			function ($http, $timeout, $rootScope, adminService, msg, constants) {
				var lastScavengeEventId = '';
				function scavengeStatusUpdate(res) {
					if(res.data && res.data.entries.length > 0) {
						var newEvent = res.data.entries[0];
						if(newEvent.eventId !== lastScavengeEventId) {
							lastScavengeEventId = newEvent.eventId;
							var eventData = JSON.parse(newEvent.data);
							var scavengeNotifyMsg = 'Scavenge ' + eventData.scavengeId;
							if(newEvent.eventType === '$scavengeStarted') {
								scavengeNotifyMsg += ' initiated';
								msg.success(scavengeNotifyMsg);
							} else {
								if(eventData.error) {
									scavengeNotifyMsg += ' failed';
									msg.failure(scavengeNotifyMsg);
								} else {
									scavengeNotifyMsg += ' completed';
									msg.success(scavengeNotifyMsg);
								}
							}
						}
					}
				}
				function start() {
					adminService.lastScavengeStatus().then(function(res) {
						if(res.data.entries.length > 0) {
							lastScavengeEventId = res.data.entries[0].eventId;
						}
						var tick = function() {
							adminService.lastScavengeStatus().then(function(res) {
								scavengeStatusUpdate(res);
								$timeout(function() {
									tick();
								}, constants.scavengeStatus.pollInterval);
							});
						};
						tick();
					}, function() {
						$timeout(function() {
						start();
					}, constants.scavengeStatus.pollInterval);
				});
			}
			return {
				start: start
			};
		}
	]);
});
