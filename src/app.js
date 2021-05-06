const Discord = require('discord.js');
const Winston = require('winston');
const fs = require('fs');
// const Chalk = require('Chalk');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.prefix = prefix;

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

const logger = Winston.createLogger({
	transports: [
		new Winston.transports.Console({ level: 'error' }),
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

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// client.on('message', message => {
// 	if (!message.content.startsWith(prefix) || message.author.bot) return;

// 	const args = message.content.slice(prefix.length).trim().split(/ +/);
// 	const commandName = args.shift().toLowerCase();

// 	if (!client.commands.has(commandName)) return;

// 	const command = client.commands.get(commandName);

// 	try {
// 		command.execute(message, args);
// 	}
// 	catch (error) {
// 		console.error(error);
// 		message.reply('there was an error trying to execute that command!');
// 	}
// });

client.login(token);