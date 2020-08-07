import { Message } from 'discord.js'

export type CommandHandler = (message: Message, args: string[]) => Promise<void>

export type Command = {
  key: string,
  description: string,
  handler: CommandHandler
}

export type CommandsMap = {
  [K: string]: Command
}
