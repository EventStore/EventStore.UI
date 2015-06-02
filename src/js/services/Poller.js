define(['./_module'], function (app) {

    'use strict';

	return app.factory('poller', [
		'$timeout', '$q',
		function ($timeout, $q)  {
			var tasks = [];

			function Task (opts) {
				this.deferred = $q.defer();
				this.opts = opts;
				this.canceller = null;
				this.isPaused = false;
			}

			Task.prototype = {
				resumePaused: function () {
					var self = this;
					self.isPaused = false;
					self.resume();
				},
				resume: function(){
					var self = this;
					
					if(self.isPaused) {
						return;
					}

					self.canceller = $q.defer();
					
					(function tick () {
						var arr = self.opts.params.slice();
						arr.push({timeout: self.canceller.promise});		
		
						//self.opts.action.apply(null, self.opts.params)


						self.opts.action.apply(null, arr)
						.then(function (data) {
							self.intervalId = $timeout(tick, self.opts.interval);
							self.deferred.notify(data.data);
						}, function () {
							self.deferred.reject('Error occured');
						});
					})();
				},
				start: function () {
					var self = this;

					this.resume();

					this.promise = this.deferred.promise;

					return this;
				},
				pause: function (){

					if(this.canceller) {
						this.canceller.resolve('pausing');
					}

					$timeout.cancel(this.intervalId);
					this.isPaused = true;
				},
				stop: function () {
					$timeout.cancel(this.intervalId);
					 if(this.canceller) {
                        this.canceller.resolve('pausing');
                        this.canceller = null;
                    }
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

			function resumePaused(){
				var i = 0, len = tasks.length;
				for(; i < len; i++) {
					tasks[i].resumePaused();
				}
			}

			

			function stopAll () {
				var i = 0, len = tasks.length;
				for(; i < len; i++) {
					tasks[i].stop();
				}
			}


			function pauseAll () {
				var i = 0, len = tasks.length;
				for(; i < len; i++) {
					tasks[i].pause();
				}
			}

			function clear () {
				stopAll();
				tasks = [];
			}

			return {
				create: create,
				stopAll: stopAll,
				pauseAll: pauseAll,
				resumePaused: resumePaused,
				clear: clear,
				resume: resume
			};

	}]);
});