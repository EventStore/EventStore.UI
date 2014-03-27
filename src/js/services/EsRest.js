define(['./_module'], function (app) {

    'use strict';

	return app.provider('esRest', function () {

		var baseUrl = 'http://127.0.0.1:2113';

		this.baseUrl = function (url) {
			baseUrl = url || baseUrl;
		};

		function buildUrl (url) {
			return baseUrl + url;
		}

		// http://connect.microsoft.com/IE/feedback/details/781303
		// http://stackoverflow.com/q/20784209/126800
		function authorizationHeader (auth) {
			return {
				headers: {
					'Authorization': auth
				}
			};
		}

		this.$get = [
			'$http', '$log', '$q', 'Base64', 'uri',
			function ($http, $log, $q, Base64, uriProvider) {

				function get_auth () {
					return 'Basic ' + Base64.encode('admin:changeit');
				}

				function disableEnableProjections (allAction, command) {
					var all = allAction(),
						deferred = $q.defer(),
						auth = authorizationHeader(get_auth());

					all.success(function (data, status, headers, config) {
						var calls = [], url;
						angular.forEach(data.projections, function(value, key) {
							url = value.statusUrl + command;
							calls.push($http.post(url, null, auth));
						});

						$q.all(calls).then(function (values) {
							console.dir(values);
							deferred.resolve(values);
						}, function () {
							console.error('WTF?');
							console.dir(arguments);
							deferred.reject('Something went wrong.');
						});
					});

					all.error(function (data, status, headers, config) {
						deferred.reject('Couldn\'t get projections list.');
					});

					return deferred.promise;
				}

				return {
					stats: function () {
						return $http.get(buildUrl('/stats'));
					},
					streams: {
						recentlyChangedStreams: function () {
							var headers = authorizationHeader(get_auth());
							// https://github.com/eventstore/eventstore/wiki/Reading-Streams-%28HTTP%29#wiki-rich
							return $http.get(buildUrl('/streams/$all/head/100?embed=rich'), headers);
						},
						recentlyCreatedStreams: function () {
							var headers = authorizationHeader(get_auth());
							// https://github.com/eventstore/eventstore/wiki/Reading-Streams-%28HTTP%29#wiki-rich
							return $http.get(buildUrl('/streams/$all/head/50?embed=rich'), headers);
						},
						streamEvents: function (params) {
							var headers = authorizationHeader(get_auth()),
								url = buildUrl('/streams/' + params.streamId); //  + streamId + '?embed=tryharder'

							if(angular.isDefined(params.position)) {
								url += '/' + params.position;
							}
							
							if(angular.isDefined(params.type)) {
								url += '/' + params.type;
							}
							if(angular.isDefined(params.count)) {
								url += '/' + params.count;
							}

							url += '?embed=tryharder';

							return $http.get(url, headers);
						},
						eventContent: function (streamId, eventNumber, baseUrl) {
							var headers = authorizationHeader(get_auth()),
								url = buildUrl('/streams/' + streamId + '/' + eventNumber + '?embed=tryharder');

							if(baseUrl) {
								url = baseUrl + '?embed=tryharder';
							}

							headers.headers.Accept = 'application/vnd.eventstore.atom+json';

							return $http.get(url, headers);
						}
					},
					projections: {
						all: function (includeQueries) {

							if(includeQueries) {
								return $http.get(buildUrl('/projections/any'));
							}

							return $http.get(buildUrl('/projections/all-non-transient'));
						},
						disableAll: function () {
							return disableEnableProjections(this.all, '/command/disable');
						},
						enableAll: function () {
							return disableEnableProjections(this.all, '/command/enable');
						},
						create: function (mode, params, source) {
							var headers = authorizationHeader(get_auth()),
								url = buildUrl('/projections/' + mode);

							url += '?' + uriProvider.getQuery(params);

							return $http.post(url, source, headers);
						}
					}
				};
			}
		];

		return this;
	});


});