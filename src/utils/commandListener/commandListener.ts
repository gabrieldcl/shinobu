import { CommandsMap, CommandHandler, Command } from '../../types'
import { Message } from 'discord.js'
import { createHelpHandler } from './createHelpHandler'

export class CommandListener {
  private commandsMap: CommandsMap = {}

  constructor () {
    this.registerHandler('help', createHelpHandler(this), `You can use this order whenever you want me to show you what I can do ~'`)
  }

  getCommandList = (): Command[] => {
    return Object.values(this.commandsMap)
  }

  registerHandler = (commandKey: string, handler: CommandHandler, description: string) => {
    console.log(`Command ${commandKey} registered`)

    this.commandsMap[commandKey] = {
      description,
      handler,
      key: commandKey
    }
  }

  handleCommand = async (commandKey: string, message: Message, args: string[]) => {
    const command = this.commandsMap[commandKey]

    if (command) {
      await command.handler(message, args)
      return
    }

    message.channel.send(`Are you asking for an impossible task? Baka`)
  }
}

export const commandListener = new CommandListener()