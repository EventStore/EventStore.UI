angular.module('esManager')
	.factory('urls', function urls(){	
		return{
				gossip:'/gossip',
				options:'/info/options',
				system:{
					info: '/info'
				}
			}
	});