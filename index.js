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

    if (message.channel.type == 'dm') {
      var prefix = "";
      var m = message.content.substring(prefix.length).split(" ");

      switch (m[0].toLowerCase()) {
        case "insert":
        console.log(m[1]+"-"+m[2]);

              request({url: "https://api.erdem.in/ebot/processor.php?proccess=insert&command="+m[2]+"&response="+m[2]+" ", encoding: "utf-8"}, function (error, response, body) {
                if (response.statusCode===200) {
                  var resResponse = JSON.parse(body);
                  var chatResponse = resResponse['status'];

                    message.author.send(chatResponse);

                }else{ console.log("BOT# Site shut down."); }

              }); //End of request.
        break; // End of 'case:insert'.
        default:
          message.author.send("It's easy to find out! You can do it with your brain!");
          break; // End of 'case:default'
      }
    } // End of dm.
    else
    {
        //Normal chat.
      console.log(message.content);
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

    } // End of normal chat.

}); // End  of message.

client.login(configs[0]);
