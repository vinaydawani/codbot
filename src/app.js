const Discord = require('discord.js');
const Winston = require('winston');
const fs = require('fs');
const Chalk = require('Chalk');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

const logger = Winston.createLogger({
	transports: [
		new Winston.transports.Console({level: 'error'}),
		new Winston.transports.File({
			filename: 'src/logs/all.log',
		}),
		new Winston.transports.File({
			filename: 'src/logs/error.log',
			level: 'error',
			format: Winston.format.combine(
				Winston.format.colorize(),
				Winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
			),
		}),
	],
	format: Winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.login(token);