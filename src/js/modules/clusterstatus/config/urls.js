angular.module('esManager')
	.factory('urls', function urls(){
		'use strict';
		return{
				gossip:'/gossip',
				options:'/info/options',
				system:{
					info: '/info'
				}
			};
	});