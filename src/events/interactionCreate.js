const {Collection, Events, InteractionType} = require('discord.js');
const cooldown = new Collection();

module.exports = {
	name: Events.InteractionCreate,

	async execute(interaction) {
		const {client} = interaction;
		if (interaction.type === InteractionType.ApplicationCommand) {
			if (interaction.user.bot) {
				return;
			}

			try {
				const command = client.slashCommands.get(interaction.commandName);

				if (command.cooldown) { //Cooldown des messages
					if (cooldown.has(`${command.name}-${interaction.user.id}`)) {
						const nowDate = interaction.createdTimestamp;
						const waitedDate = cooldown.get(`${command.name}-${interaction.user.id}`) - nowDate;
						return interaction.reply({
							content: `Cooldown, <t:${Math.floor(new Date(nowDate + waitedDate).getTime() / 1000)}:R> `,
							ephemeral: true,
						}).then(() => setTimeout(() => interaction.deleteReply(), cooldown.get(`${command.name}-${interaction.user.id}`) - Date.now() + 1000));
					}

					command.slashRun(client, interaction);

					cooldown.set(`${command.name}-${interaction.user.id}`, Date.now() + command.cooldown);

					setTimeout(() => {
						cooldown.delete(`${command.name}-${interaction.user.id}`);
					}, command.cooldown + 1000);
				} else {
					command.slashRun(client, interaction);
				}
			} catch (e) {
				console.error(e);
				interaction.reply({content: 'Un problème est survenu lors de l\'exécution de la commande ! Veuillez réessayer.', ephemeral: true});
			}
		}
	},
};