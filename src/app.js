const Discord = require('discord.js');
const Winston = require('winston');
const Chalk = require('Chalk');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

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

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);