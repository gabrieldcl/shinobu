import { Message } from 'discord.js'

export const handleLeave = async (message: Message) => {
  if (!message.member?.voice.channel) {
    message.channel.send("I can't leave if I'm not there, Baka!")
    return
  }

  message.member.voice.channel.leave()
  message.channel.send("I'm leaving now and dont expect me to come back.")
}
