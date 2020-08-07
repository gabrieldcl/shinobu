import { Message } from 'discord.js'
import { commandListener } from './utils/commandListener'

export const processCommand = async (receivedMessage: Message) => {
  const fullCommand = receivedMessage.content.substr(1)
  const splitedCommand = fullCommand.split(' ')
  const primaryCommand = splitedCommand[0]
  const args = splitedCommand.slice(1)

  await commandListener.handleCommand(primaryCommand, receivedMessage, args)
}