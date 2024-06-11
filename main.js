require('dotenv').config();
const {Client, GatewayIntentBits, Partials} = require('discord.js');
const client = new Client({
	intents: Object.values(GatewayIntentBits),
	partials: Object.values(Partials),
	shards: 'auto',
});
const {readdirSync} = require('node:fs');


const token = process.env.TOKEN;

readdirSync('./src/utils').map(async file => {
	const util = await require(`./src/utils/${file}`);
	util.execute(client);
});

client.login(token);