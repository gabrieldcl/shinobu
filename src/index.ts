import { requireContext, importAll } from './utils/require-context'
import Discord from 'discord.js'
import { processCommand } from './proccessCommand'

if (process.env.WEBPACK_BUILD) {
  importAll(require.context(`./commands/`, true, /cmd.(ts|js)$/))
} else {
  importAll(requireContext(`${__dirname}/commands`, true, /cmd.(ts|js)$/))
}

const client = new Discord.Client()

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
