define(['es-ui'], function (app) {

	'use strict';
	app.value('baseUrl', '');

	return app.constant('urls', {
		base: 'https://127.0.0.1:2113',
		stats: '/stats',
		tcpStats: '/stats/tcp',
		replicationStats: '/stats/replication',
		admin: {
			shutdown: '/admin/shutdown',
			scavenge: '/admin/scavenge',
			login: '/admin/login'
		},
		gossip: '/gossip',
		users: {
			list: '/users/',
			get: '/users/%s',		// %s - user name
			current: '/users/$current',
			create: '/users/',
			update: '/users/%s',	// %s - user name
			remove: '/users/%s',	// %s - user name
			disable: '/users/%s/command/disable',	// %s - user name
			enable: '/users/%s/command/enable',		// %s - user name
			resetPassword: '/users/%s/command/reset-password'	// %s - user name
		},
		query: {
			create: '/projections/transient?',
			update: '%s/query?emit=no', // $s - query url
			state: '%s/state', // $s - query url
			commands: {
				enable: '%s/command/enable', // $s - query url
				disable: '%s/command/disable', // $s - query url
				reset: '%s/command/reset' // $s - query url
			}
		},
		projections: {
			any: '/projections/any',
			allNonTransient: '/projections/all-non-transient',
			disable: '/command/disable',
			enable: '/command/enable',
			create: '/projections/%s?', // %s - mode
			createStandard: '/projections/continuous?emit=yes&checkpoints=yes&enabled=yes&name=%s&type=%s',	// %s - name, %s - type,
			state: '%s/state', // %s - projection url
			result: '%s/result', // %s - projection url
			statistics: '%s/statistics',
			remove: '%s?', // %s - projection url
			query: '%s/query?config=yes',
			updateQuery: '%s/query?emit=',
			updatePlainQuery: '%s/query',
			queryWithoutConfig: '%s/query?config=no',
			readEvents: '/projections/read-events',
			commands: {
				reset: '%s/command/reset',
				enable: '%s/command/enable',
				disable: '%s/command/disable'
			},
			configuration: '%s/config'
		},
		streams: {
			base: '%s',
			recent: '/streams/$all/head/100?embed=rich',
			created: '/streams/$streams/head/50?embed=rich',
			events: '/streams/%s',  // %s - streamId
			eventDetails: '/streams/%s/%s?embed=tryharder',
			tryharder: '?embed=tryharder',
			metadata: '/streams/%s%s/head',
			updateAcl: '/streams/$$%s',
			scavenges: '/streams/$scavenges'
		},
		system:{
			subsystems: '/sys/subsystems',
			info: '/info',
			options: '/info/options',
		},
		competing:{
			subscriptions: '/subscriptions?offset=%s&count=%s',
			subscriptionDetails: '/subscriptions/%s/%s/info',
			create: '/subscriptions/%s/%s',
			update: '/subscriptions/%s/%s',
			delete: '/subscriptions/%s/%s',
            replayParked: '/subscriptions/%s/%s/replayParked',
			parkedQueue: '$persistentsubscription-%s::%s-parked',
			viewParkedMessagesBackward: '/subscriptions/viewparkedmessages/%s/%s/%s/backward/%s?embed=tryharder',
			viewParkedMessagesForward: '/subscriptions/viewparkedmessages/%s/%s/%s/forward/%s?embed=tryharder'
		}
	});
});
