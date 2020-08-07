import { player } from '../../utils/player'
import { Message } from 'discord.js'
import { commandListener } from '../../utils/commandListener'

const handleResume = async (receivedMessage: Message) => {
  const { channel } = receivedMessage

  await channel.send(`I will resume the player for you, but I rather you not to mess with the player..`)
  player.resume()
}

commandListener.registerHandler('resume', handleResume, 'Resume')
