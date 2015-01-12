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
				success: function(text, title){
					toastr.success(text, title  || 'Success', getToastOptions(false, 'success'));
				},
				info: function (text, title) {
					toastr.info(text, title  || 'Info', getToastOptions(false, 'info'));
				},
				warn: function (text, title) {
					toastr.warning(text, title  || 'Warning', getToastOptions(false, 'warning'));
				},
				failure: function (text, title) {
					toastr.error(text, title || 'Failure', getToastOptions(true, 'failure'));
				},
				confirm: function (text) {
					return confirm(text);
				}
			};
		}
	]);

});