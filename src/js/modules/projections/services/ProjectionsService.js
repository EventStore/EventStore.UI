define(['./_module'], function (app) {

	'use strict';

	return app.provider('ProjectionsService', function () {
		this.$get = [
			'$http', '$q', 'urls', 'constants', 'UrlBuilder', 'uri',

			function ($http, $q, urls, constants, urlBuilder, uriProvider) {

				var errors = '';
				function formatMultipleErrors (err, name) {
					errors += name + ': ' + err;
					errors += '\n\r';
				}

				function clearErrors () {
					errors = '';
				}

				function executeCommand (forItems, command, expectedStatus) {
					var all = forItems(),
						deferred = $q.defer();
					clearErrors();
					all.success(function (data) {
						var calls = [], url;

						angular.forEach(data.projections, function (value) {
							url = value.statusUrl + command;
							if (value.status === expectedStatus) {
								return;
							}
							calls.push($http.post(url).error(function (err) {
								formatMultipleErrors(err, value.name);
							}));
						});

						$q.allSettled(calls).then(function (values) {

							deferred.resolve(values);

						}, function () {
							deferred.reject(errors);
						});
					});

					all.error(function () {
						deferred.reject('Could\'t get projections list');
					});

					return deferred.promise;
				}

				return {
					all: function (withQueries) {
						var url;

						if(withQueries) {
							url = urlBuilder.build(urls.projections.any);
						} else {
							url = urlBuilder.build(urls.projections.allNonTransient);
						}

						return $http.get(url);
					},
					disableAll: function () {
						return executeCommand(this.all, urls.projections.disable, constants.projectionStatus.stopped);
					},
					enableAll: function () {
						return executeCommand(this.all, urls.projections.enable, constants.projectionStatus.running);
					},
					create: function (mode, source, params) {
						var qp = uriProvider.getQuery(params),
							url = urlBuilder.build(urls.projections.create, mode) + qp;

						return $http.post(url, source);
					},
					createStandard: function (name, type, source, opt) {
						var url = urlBuilder.build(urls.projections.createStandard, name, type);

						return $http.post(url, source);
					},
					status: function (url, opt) {
						url = urlBuilder.simpleBuild('%s', url);

						return $http.get(url, opt);
					},
					partitionedState: function (partitionProvider) {
                                          return function (url, params, opt) {
						console.log(partitionProvider, url, params, opt);
						var qp;

						if(params && !params.timeout) {
							if(partitionProvider.partition) {
								params.partition = partitionProvider.partition;
                                                        }
							qp = '?' + uriProvider.getQuery(params);
						} else {
							if(partitionProvider.partition) {
								qp = '?' + uriProvider.getQuery({ partition: partitionProvider.partition });
							} else {
								qp = '';
							}

							opt = params;
						}

						url = urlBuilder.simpleBuild(urls.projections.state, url) + qp;

						return $http.get(url, opt);
					};},
					state: function (url, params, opt) {
						var qp;

						if(params && !params.timeout) {
							qp = uriProvider.getQuery(params);
							url = urlBuilder.simpleBuild(urls.projections.state, url) + '?' + qp;
						} else {
							opt = params;
							url = urlBuilder.simpleBuild(urls.projections.state, url);
						}

						return $http.get(url, opt);
					},
					result: function (url, opt) {
						url = urlBuilder.simpleBuild(urls.projections.result, url);

						return $http.get(url, opt);
					},
					statistics: function (url, opt) {
						url = urlBuilder.simpleBuild(urls.projections.statistics, url);

						return $http.get(url, opt);
					},
					query: function (url, withoutConfig, opt) {
						if(withoutConfig && !withoutConfig.timeout) {
							url = urlBuilder.simpleBuild(urls.projections.queryWithoutConfig, url);
						} else {
							url = urlBuilder.simpleBuild(urls.projections.query, url);
						}

						return $http.get(url, opt);
					},
					readEvents: function(definition, position, count) {
						var params,
							url = urlBuilder.build(urls.projections.readEvents);

						count = count || 10;

						params = {
							query: definition,
							position: position,
							maxEvents: count
						};

						return $http.post(url, JSON.stringify(params));

					},
					remove: function (url, params, opt) {
						if(params.timeout) {
							params = undefined;
						}
						var qp = uriProvider.getQuery(params);

						url = urlBuilder.simpleBuild(urls.projections.remove, url) + qp;

						return $http.delete(url);
					},
					reset: function (url) {
						url = urlBuilder.simpleBuild(urls.projections.commands.reset, 
							url);

						return $http.post(url);
					},
					enable: function (url) {
						url = urlBuilder.simpleBuild(urls.projections.commands.enable, 
							url);

						return $http.post(url);
					},
					disable: function (url) {
						url = urlBuilder.simpleBuild(urls.projections.commands.disable, 
							url);

						return $http.post(url);
					},
					updateQuery: function (url, emit, source) {

						if(emit) {
							url = urlBuilder.simpleBuild(urls.projections.updateQuery, url) + emit;
						} else {
							url = urlBuilder.simpleBuild(urls.projections.updatePlainQuery, url);
						}

						return $http.put(url, source);
					},
					configuration: function (url) {
						url = urlBuilder.simpleBuild(urls.projections.configuration, 
							url);
						return $http.get(url);
					},
					updateConfiguration: function (url, configuration) {
						url = urlBuilder.simpleBuild(urls.projections.configuration, 
							url);
						return $http.put(url, configuration, {
							headers: {
                                'Content-Type':'application/json'
                            }
						});
					}
				};
		}];
	});

});
