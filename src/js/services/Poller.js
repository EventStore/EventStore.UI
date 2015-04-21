define(['./_module'], function (app) {

    'use strict';

	return app.factory('poller', [
		'$timeout', '$q',
		function ($timeout, $q)  {
			var tasks = [];

			function Task (opts) {
				this.deferred = $q.defer();
				this.opts = opts;
			}

			Task.prototype = {
				resume: function(){
					(function tick () {
						self.opts.action.apply(null, self.opts.params)
						.then(function (data) {
							self.intervalId = $timeout(tick, self.opts.interval);
							self.deferred.notify(data.data);
						}, function () {
							deferred.reject('Error occured');
						});
					})();
				},
				start: function () {
					self = this;

					this.resume();

					this.promise = this.deferred.promise;

					return this;
				},
				stop: function () {
					$timeout.cancel(this.intervalId);
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

			function resume(){
				var i = 0, len = tasks.length;
				for(; i < len; i++) {
					tasks[i].resume();
				}
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
				clear: clear,
				resume: resume
			};

	}]);
});