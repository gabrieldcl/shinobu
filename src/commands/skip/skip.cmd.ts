import { player } from '../../utils/player'
import { Message } from 'discord.js'
import { commandListener } from '../../utils/commandListener'

const handleSkip = async (receivedMessage: Message) => {
  const { channel } = receivedMessage

  await channel.send(`Are you really skipping the music that I added for you? I will remember this`)
  player.skip()
}

commandListener.registerHandler('skip', handleSkip, 'This will simply play the next music on the queue, or not.. ka ka')
