define(['./_module'], function (app) {

	'use strict';

	return app.factory('MessageService', ['toastr',
		function (toastr) {
			function getToastOptions(requiresUserAck){
				if(requiresUserAck){
					return {
							positionClass: requiresUserAck ? "toast-container-modal toast-top-full-width" : "toast-top-full-width",
							timeOut: requiresUserAck ? 0 : 5000
						}
				}
				return {};
			}
			return {
				info: function (text, requiresUserAck) {
					toastr.info(text, 'Information', getToastOptions(requiresUserAck));
				},
				warn: function (text, requiresUserAck) {
					toastr.warning(text, 'Warning', getToastOptions(requiresUserAck));
				},
				error: function (text, requiresUserAck) {
					toastr.error(text, 'Error', getToastOptions(true));
				},
				confirm: function (text) {
					return confirm(text);
				}
			};
		}
	]);

});