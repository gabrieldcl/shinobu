import Discord from 'discord.js'
import { processCommand } from './proccessCommand'
import './commands'

const client = new Discord.Client()

// test channel id = 740233844325744771
// server id = 159720593686659072

client.on('ready', async () => {
  if (!client.user) {
    console.log('Could not connect')
    return
  }

  console.log(`Connected as ${client.user.tag}`)
  client.user.setActivity('with Gabs <3')
})

client.on('message', async (receivedMessage) => {
  if (client.user && receivedMessage.author.id === client.user.id) {
    return
  }

  if (receivedMessage.content.startsWith('!')) {
    await processCommand(receivedMessage)
  }
})

client.login(process.env.SHINOBU_AUTH_TOKEN)
