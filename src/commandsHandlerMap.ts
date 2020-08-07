import { CommandsHandlerMap } from './types'
import { handleHello, handlePlay, handleLeave } from './commands'

export const commandsHandlerMap: CommandsHandlerMap = {
  hello: handleHello,
  play: handlePlay,
  leave: handleLeave
}