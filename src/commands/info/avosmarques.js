const {EmbedBuilder, PermissionsBitField, Colors} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');

exports.commandBase = {
	slashData: new SlashCommandBuilder()
		.setName('avosmarques')
		.setDescription('Donnes le futur à vos marques'),
	cooldown: 5000, 
	ownerOnly: false, 
	async slashRun(client, interaction) {
        //const url = new URL ("https://api.paladium.games/v1/status" );
        fetch('https://api.paladium.games/v1/paladium/faction/onyourmarks')
        .then(res => res.json())
        .then((out) => {
            //console.log('Output: ', out);
            //console.log(out);

            let debut = out.start.toString();
            let fin = out.end.toString();

            var datedeb = new Date(debut * 1000);
            var datefin = new Date(fin * 1000);
            var hoursdeb = datedeb.getHours();
            var hoursfin = datefin.getHours();
            var minutesdeb = "" + datedeb.getMinutes();
            var minutesfin = "0" + (datedeb.getMinutes()-30);
            var secondsdeb = "0" + datedeb.getSeconds();
            var secondsfin = "0" + datefin.getSeconds();

            var converteddeb = hoursdeb + 'h ' + minutesdeb.substring(-4) + ':' + secondsdeb.substring(-2);
            var convertedfin = hoursfin + 'h ' + minutesfin.substring(-4) + ':' + secondsfin.substring(-2);

            const start = out.extra.indexOf(':') + 1; // Trouver l'index de ':' et ajouter 1 pour commencer juste après
            const end = out.extra.indexOf('/'); // Trouver l'index de '/'
            const result = out.extra.substring(start, end);

            const embed = new EmbedBuilder()
                .setColor(Colors.Purple)
                .setTitle("Prochain à vos marques")
                .addFields(
                    { name: "Bloc à casser", value : result.charAt(0).toUpperCase() + result.substring(1)},
                    { name: "Quantité", value : out.amount.toString()},
                    { name: "Heure de début", value : converteddeb},
                    { name: "Heure de fin", value : convertedfin}
                )
                .setTimestamp()

            interaction.reply( {embeds: [embed] });
        }).catch(err => console.error(err));
		
	},
};