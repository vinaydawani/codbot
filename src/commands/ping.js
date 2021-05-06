const Discord = require('discord.js');
const colorList = require('../data/colors');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message) {
		const embed = new Discord.MessageEmbed()
			.setColor(colorList.AQUA)
			.setTitle('Pong 🏓')
			.setDescription(`${message.client.ws.ping}ms`)
			.setTimestamp();
		message.channel.send(embed);
	},
};