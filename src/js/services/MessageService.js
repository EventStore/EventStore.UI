define(['./_module'], function (app) {

	'use strict';

	return app.factory('MessageService', ['toastr',
		function (toastr) {
			function getToastOptions(requiresUserAck, level){
				return {
					closeButton: requiresUserAck ? true : level == 'warning' ? true : false,
					positionClass: requiresUserAck ? 'toast-container-modal toast-bottom-full-width' : 'toast-bottom-full-width',
					timeOut: requiresUserAck ? 0 : 
							  level == 'warning' ? 5000 : 
							  level == 'info' || level == 'success' ? 2000 : 0
				}
			}
			function getToastTitle(title, level){
				title = title || level;
				return title + ' (tap notification to dismiss)';
			}
			return {
				success: function(text, title){
					toastr.success(text, getToastTitle(title, 'Success'), getToastOptions(false, 'success'));
				},
				info: function (text, title) {
					toastr.info(text, getToastTitle(title, 'Info'), getToastOptions(false, 'info'));
				},
				warn: function (text, title) {
					toastr.warning(text, getToastTitle(title, 'Warning'), getToastOptions(false, 'warning'));
				},
				failure: function (text, title) {
					toastr.error(text, getToastTitle(title, 'Failure'), getToastOptions(true, 'failure'));
				},
				confirm: function (text) {
					return confirm(text);
				}
			};
		}
	]);

});