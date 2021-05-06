const Chalk = require('chalk');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`The client is logged in as ${Chalk.yellow(client.user.tag)}`);
	},
};