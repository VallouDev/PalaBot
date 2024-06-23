const {EmbedBuilder, PermissionsBitField, Colors} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');

exports.commandBase = {
	slashData: new SlashCommandBuilder()
		.setName('avosmarques')
		.setDescription('Donnes le futur à vos marques'),
	cooldown: 5000, 
	ownerOnly: false, 
	async slashRun(client, interaction) {
        //const url = new URL ("" );
        fetch('https://api.paladium.games/v1/paladium/faction/onyourmarks')
        .then(res => res.json())
        .then((out) => {
            //console.log('Output: ', out);
            //console.log(out);

            let debut = out.start.toString();
            let fin = out.end.toString();

            var result = "";

            result = out.extra;

            if(out.extra == "" && out.goaltype == "FISHING"){
                out.extra = "Fish";
            }
            if( out.extra.indexOf(':') != -1 && out.extra.indexOf('/') != -1 ){
                const start = out.extra.indexOf(':') + 1; // Trouver l'index de ':' et ajouter 1 pour commencer juste après
                const end = out.extra.indexOf('/'); // Trouver l'index de '/'
                result = out.extra.substring(start, end);
            }
            if( out.extra.indexOf('.') != -1 && out.extra.indexOf('.') != -1 ){
                const start = out.extra.indexOf('.') + 1; // Trouver l'index de ':' et ajouter 1 pour commencer juste après
                const end = out.extra.indexOf('.'); // Trouver l'index de '/'
                result = out.extra.substring(start, end);
            }
            else{
                result = out.extra;
            }   
            const embed = new EmbedBuilder()
                .setColor(Colors.Purple)
                .setTitle("Prochain à vos marques")
                .addFields(
                    { name: "Bloc à casser", value : result//.charAt(0).toUpperCase() + result.substring(1)
                        },
                    { name: "Quantité", value : out.amount.toString()},
                    { name: "Heure de début", value : "<t:" + debut + ":F>"},
                    { name: "Heure de fin", value :  "<t:" + fin + ":F>"}
                )
                .setTimestamp()

            interaction.reply( {embeds: [embed] });
        }).catch(err => console.error(err));
		
	},
};