const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');

const configs = [
  process.env.BOT_TOKEN
];

client.on('ready', function() {
  console.log("And Loaded " + client.guilds.size + " servers");
  var times = 1;
  const activities_list = [
    "help",
    client.guilds.size + " servers",
  ];

  setInterval(() => {
    var index = times % 2;
    times++;
    client.user.setActivity(activities_list[index], {
      type: "WATCHING"
    });
  }, 10000);
});

client.on('message', message => {
  if (message.author.equals(client.user))
    return;

  request('https://api.erdem.in/ebot/processor.php?cmd='+message.content, function (error, response, body) {
    if (response.statusCode===200) {
      var resResponse = JSON.parse(body);
      var chatResponse = resResponse['response'];

        if (chatResponse!="-1") {
          message.channel.send(chatResponse);
          chatResponse = "";
        }


    }else{ console.log("BOT# Site shut down."); }
  }); //End of request.

}); // End  of message.

client.login(configs[0]);
