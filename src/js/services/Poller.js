define(['./_module'], function (app) {

    'use strict';

	return app.factory('poller', [
		'$interval', '$q',
		function ($interval, $q)  {
			var tasks = [];

			function Task (opts) {
				this.opts = opts;
			}

			Task.prototype = {
				start: function () {
					var deferred = $q.defer(),
						self = this;

					function tick () {

						self.opts.action.apply(null, self.opts.params)
						.then(function (data) {
							deferred.notify(data.data);
						}, function () {
							deferred.reject('Error occured');
						});
					}
					tick();
					self.intervalId = $interval(tick, self.opts.interval);

					this.promise = deferred.promise;

					return this;
				},
				stop: function () {
					$interval.cancel(this.intervalId);
					this.intervalId = null;
				},
				update: function (opts) {
					opts.interval = opts.interval || this.opts.interval;
					opts.params = opts.params || this.opts.params;
					opts.action = this.opts.action;
					this.opts = opts;
				}
			};

			function create (opts) {
				var task = new Task(opts);
				tasks.push(task);

				return task;
			}

			function stopAll () {
				var i = 0, len = tasks.length;
				for(; i < len; i++) {
					tasks[i].stop();
				}
			}

			function clear () {
				stopAll();
				tasks = [];
			}

			return {
				create: create,
				stopAll: stopAll,
				clear: clear
			};

	}]);
});