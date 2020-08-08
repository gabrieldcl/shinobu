import { player } from '../../utils/player'
import { Message } from 'discord.js'
import { commandListener } from '../../utils/commandListener'

const handleSetVolume = async (receivedMessage: Message, args: string[]) => {
  const { channel } = receivedMessage

  if (!args.length) {
    await channel.send(`Are you stupid? You need to send me a volume..`)
    return
  }

  if (isNaN(args[0] as any)) {
    await channel.send(`Are you really trying to trick me? Enter a valid number, stupid master...`)
    return
  }

  const parsedArg = parseFloat(args[0])

  if (parsedArg < 0 || parsedArg > 100) {
    await channel.send(`Are you really trying to trick me? Enter a valid number between 0 and 100, stupid master...`)
    return
  }

  const formatedVolume = parsedArg / 100
  player.setVolume(formatedVolume)
  await channel.send(`Master, volume is set to ${parsedArg} ~'`)
}

commandListener.registerHandler('volume', handleSetVolume, `Oh, ka ka ~ I like this one. With this order you will listen to me louder.. I know you like my voice.`)
