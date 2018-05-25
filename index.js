console.log('GGBot is started.');
const Discord = require('discord.js');
const bot = new Discord.Client();
const YTDL = require("ytdl-core");


bot.on("guildMemberAdd", member => { 
    console.log('User ' + member.user.username + ' has joined the server and been set to Level 1.') 

    var role = member.guild.roles.find('name', 'Level 1');

    member.addRole(role)

});

var servers = {};

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"} ));

    server.queue.shift();
    
    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();

    });
}

bot.on("message", function(message) {

switch (args[0].toLowerCase()) {

    
case "play":

    if (args[1]) {
        message.channel.sendMessage("Provide a link, dipshit.");
    }
    
    if(!message.member.voiceChannel) {
        message.channel.sendMessage("***Get in a voice channel first, cunt.***")
        return;
    }

    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue : []
    };

    var server = servers[message.guild.id];

    server.queue.push(arge[1]);

    if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
        play(connection, message);
    });

    break;
    
    case "skip":
    var server = servers[message.guild.id];

    if (server.dispatcher) server.dispatcher.end();

    break;

    case "stop":
    var server = servers[message.guild.id];

    if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;
   
}})

bot.login('shhh token')