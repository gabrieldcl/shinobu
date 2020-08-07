import { Message } from 'discord.js'

export const handleHello = async (receivedMessage: Message, args?: string[]) => {
  const { channel } = receivedMessage

  if (!args) {
    await channel.send(`Who are you?`)
    return
  }

  await channel.send(`Hello ${args[0]}`)
}
