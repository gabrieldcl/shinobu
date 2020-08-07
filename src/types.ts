import { Message } from 'discord.js'

export type CommandHandler = (message: Message, args: string[]) => Promise<void>

export type CommandsHandlerMap = {
  [K: string]: CommandHandler
}
