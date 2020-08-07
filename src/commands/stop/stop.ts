import { player } from '../../utils/player'
import { Message } from 'discord.js'
import { commandListener } from '../../utils/commandListener'

const handleStop = async (receivedMessage: Message) => {
  const { channel } = receivedMessage

  await channel.send(`Why are you stopping the music that I'm playing to you? Such a useless master pff..`)
  player.stop()
}

commandListener.registerHandler('stop', handleStop, `This order will stop any music and clean the queue, but please, don't make me do useless stuff...`)
