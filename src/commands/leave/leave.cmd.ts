import { Message } from 'discord.js'
import { player } from '../../utils/player'
import { commandListener } from '../../utils/commandListener'

const handleLeave = async (message: Message) => {
  if (!message.member?.voice.channel) {
    message.channel.send("I can't leave if I'm not there, Baka!")
    return
  }

  player.clearPlayer()
  message.member.voice.channel.leave()
  message.channel.send("I'm leaving now and dont expect me to come back.")
}

commandListener.registerHandler('leave', handleLeave, `With this one I will leave you, but not forever.. ka ka`)
