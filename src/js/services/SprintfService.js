define(['./_module', 'sprintf'], function (app, sprintf) {

	'use strict';

	return app.factory('SprintfService', [
		function () {

			return {
				format: function () {
					var args = [].slice.call(arguments);

					// this has changed, sprintf is an object now
					// with two methods:
					// - sprintf
					// - vsprintf - same as sprintf but accepting array of objects
					// therefore when we do require sprintf we are getting
					// these two methods.
					return sprintf.sprintf.apply(null, args);
				}
			};
		}
    ]);
});