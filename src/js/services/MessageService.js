define(['./_module'], function (app) {

	'use strict';

	return app.factory('MessageService', ['toastr',
		function (toastr) {
			function getToastOptions(requiresUserAck, level){
				return {
					closeButton: requiresUserAck ? true : level == 'warning' ? true : false,
					positionClass: requiresUserAck ? "toast-container-modal toast-top-full-width" : "toast-top-full-width",
					timeOut: requiresUserAck ? 0 : 
							  level == 'warning' ? 5000 : 
							  level == 'info' ? 2000 : 0
				}
			}
			return {
				success: function(text, requiresUserAck){
					toastr.info(text, 'Success', getToastOptions(requiresUserAck, 'success'));
				},
				info: function (text, requiresUserAck) {
					toastr.info(text, 'Info', getToastOptions(requiresUserAck, 'info'));
				},
				warn: function (text, requiresUserAck) {
					toastr.warning(text, 'Warning', getToastOptions(requiresUserAck, 'warning'));
				},
				failure: function (text, requiresUserAck) {
					toastr.error(text, 'Failure', getToastOptions(true, 'failure'));
				},
				confirm: function (text) {
					return confirm(text);
				}
			};
		}
	]);

});