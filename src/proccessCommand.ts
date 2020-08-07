import { Message } from 'discord.js'
import { commandsHandlerMap } from './commandsHandlerMap'

export const processCommand = async (receivedMessage: Message) => {
  const fullCommand = receivedMessage.content.substr(1)
  const splitedCommand = fullCommand.split(' ')
  const primaryCommand = splitedCommand[0]
  const args = splitedCommand.slice(1)

  const commandHandler = commandsHandlerMap[primaryCommand]

  if (commandHandler) {
    await commandHandler(receivedMessage, args)
    return
  }

  receivedMessage.channel.send(`Are you asking for an impossible task? Baka`)
}