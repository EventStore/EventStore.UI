define(['./_module'], function (app) {

	'use strict';

	return app.factory('MessageService', ['toastr',
		function (toastr) {
			return {
				info: function (text) {
					toastr.info(text, 'Information');
				},
				warn: function (text) {
					toastr.warning(text, 'Warning');
				},
				error: function (text) {
					toastr.error(text, 'Error');
				},
				confirm: function (text) {
					return confirm(text);
				}
			};
		}
	]);

});