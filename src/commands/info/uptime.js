const Discord = require('discord.js');
const colorList = require('../../data/colors');

module.exports = {
	name: 'uptime',
	description: 'Uptime of the bot',
	execute(message) {
		const days = Math.floor(message.client.uptime / 86400000);
		const hours = Math.floor(message.client.uptime / 3600000) % 24;
		const minutes = Math.floor(message.client.uptime / 60000) % 60;
		const seconds = Math.floor(message.client.uptime / 1000) % 60;

		const uptimeNow = `**UPTIME**: ${days}d ${hours}h ${minutes}m ${seconds}s`;

		const embed = new Discord.MessageEmbed()
			.setColor(colorList.AQUA)
			.setTitle('Uptime')
			.setDescription(uptimeNow)
			.setTimestamp();

		message.channel.send(embed);
	},
};