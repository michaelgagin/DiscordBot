const Discord = require('discord.js');
const client = new Discord.Client({partials: ['MESSAGE', 'REACTION', 'CHANNEL']});
const config = require('./config.json');

client.once('ready', () => {
  console.log("I'm ready! Type !help to see a list of valid commands.");
})

client.on('message', async (message) => {
  try {
    if (message.member.user.bot) return;

    // let sender = message.member
    let content = message.content
    let firstWord = message.content.split(" ")[0]
	let roleName = message.content.split(" ")[2]
    console.log(content)
    console.log(firstWord)
	console.log(roleName)
	let role = ""
	
	if (roleName === "momo" || roleName === "Momo") {
	  role = "783195799701028874"
	  roleName = "Momo"
	  console.log(role)
	}
	else if (roleName === "weeb" || roleName === "Weeb" || roleName === "ayaya") {
	  role = "783369539735912478"
	  roleName = "Weeb"
	  console.log(role)
	}

    // if (send.roles.cache.has("783147253299675156")) { //if they have role bot
    //   pass
    // }

    if (content === "!help") {
      message.channel.send("Valid Commands: !help, !echo/!say, !promote, !momocount, !momos")
    }

    if (firstWord === "!say") {
      let echoed = message.content.replace("!say", "").trim()
      message.channel.send(echoed)
    }

    if (firstWord === "!echo") {
      let echoed = message.content.replace("!echo", "").trim()
      message.channel.send(echoed)
    }

    if (firstWord === "!promote") {
      let promoteMe = message.mentions.members.first()
      message.channel.send("Trying to promote " + String(promoteMe.user.username) + " to " + roleName)
      console.log(promoteMe.user.username)
      console.log(promoteMe)
      promoteMe.roles.add(role)
      message.channel.send("Promoted " + String(promoteMe.user.username) + " to " + roleName)
    }
	
	if (firstWord === "!demote") {
      let demoteMe = message.mentions.members.first()
      message.channel.send("Trying to demote " + String(demoteMe.user.username))
      console.log(demoteMe.user.username)
      console.log(demoteMe)
      demoteMe.roles.set([])
      message.channel.send("Demoted " + String(demoteMe.user.username) + " " + ":slight_frown:")
    }

    if (content === "!momocount") {
      let allMembers = await message.guild.members.fetch()
      let momos = allMembers.filter(member => member.roles.cache.has("783195799701028874"))
      let numMomos = momos.size

      let embed = new Discord.MessageEmbed()
        .setTitle("Momos")
        .setDescription("Here's how many Momos there are")
        .addField("Momos:", numMomos)

      // let i = 0
      // for (i = 0; i < numMomos; i++) {
      //   embed = new Discord.MessageEmbed(embed).addField("Momo#" + String(i+1), momos.values().next.value)
      // }
      message.channel.send(embed)
    }

    if (content === "!momos") {
      let allMembers = await message.guild.members.fetch()
      let momos = allMembers.filter(member => member.roles.cache.has("783195799701028874"))

      let embed = new Discord.MessageEmbed()
        .setTitle("Momos")
        .setDescription([...momos.values()])
        // .addField("Momos:", [...momos.values()])
      console.log([momos.values()])
      message.channel.send(embed)
    }

    if (content === "!logo") {
      const webImage = new Discord.MessageAttachment("https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Evil_geniuses_logo.svg/150px-Evil_geniuses_logo.svg.png")
      message.channel.send(webImage)
    }
  }
  catch (error) {
    console.log('error', error)
  }
});

client.on('messageReactionAdd', async (reaction, user) => {

      // if (reaction.emoji === :slight_smile:) {
      //   pass
      // }

      if (reaction.message.partial) await reaction.message.fetch()
      if (reaction.partial) await reaction.fetch()
      if (user.partial) await user.fetch()
      if (user.bot) return;

      if (reaction.message.id === "783152079681224735") {
        let member = reaction.message.guild.members.cache.get(user.id)
        member.roles.add("783147253299675156")
        //await user.send("thanks for reacting!")
      }
});


client.login(config.token);
