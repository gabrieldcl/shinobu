import { player } from '../../utils/player'
import { Message } from 'discord.js'
import { commandListener } from '../../utils/commandListener'

const handlePause = async (receivedMessage: Message) => {
  const { channel } = receivedMessage

  await channel.send(`I will pause the player for you master ~'`)
  player.pause()
}

commandListener.registerHandler('pause', handlePause, 'Pause')
