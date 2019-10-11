const Discord = require('discord.js');
const client = new Discord.Client();

const configs = [
  process.env.BOT_TOKEN
];


client.on('ready', () => {
  console.log('BOT# Mounted and loaded.');
});


client.on('message', message => {

  if (message.content === 'hi') {
    message.channel.send('hello');
  }
});

client.login(configs[0]);
