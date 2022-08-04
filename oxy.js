const { Client, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const settings = require("./src/configs/settings.json");
client.commands = new Collection();
client.invites = new Collection();
client.cooldown = new Map();
const { Database } = require("ark.db");
global.confdb = new Database("./src/configs/config.json");
const rankdb = global.rankdb = new Database("./src/configs/ranks.json");
client.ranks = rankdb.get("ranks") ? rankdb.get("ranks").sort((a, b) => a.coin - b.coin) : [];
client.tasks = rankdb.get("tasks") || [];
require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);
const disbut = require('discord-buttons');
disbut(client);
require("discord-banner")(settings.token)
client.login(settings.token).then(() => console.log("[BOT] Bot connected!")).catch(() => console.log("[BOT] Bot can't connected!"));