const Discord = require('discord.js');
const client = new Discord.Client();
/*
const configs = [
  process.env.CLIENTID,
  process.env.CLIENTSECRET
];
*/

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('NjMyMjkyNTQ4MzAzNTE5NzQ0.XaDWlQ.mh0u6tg_u9mTzysAQ-P_q38WLlU');
