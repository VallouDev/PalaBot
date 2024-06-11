const {EmbedBuilder, PermissionsBitField} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');

exports.commandBase = {
	slashData: new SlashCommandBuilder()
		.setName('palastats')
		.setDescription('Donnes les stats du serveur Paladium'),
	cooldown: 5000, 
	ownerOnly: false, 
	async slashRun(client, interaction) {
        //const url = new URL ("https://api.paladium.games/v1/status" );
        fetch('https://api.paladium.games/v1/status')
        .then(res => res.json())
        .then((out) => {
            //console.log('Output: ', out);
            console.log(out);
            const membersonline = out.java.global.players;
            console.log(membersonline);
            interaction.reply("Il y a " + membersonline + " joueurs connectés sur Paladium" );
        }).catch(err => console.error(err));
		
	},
};