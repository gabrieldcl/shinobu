import { Message, TextChannel } from 'discord.js'
import { player } from '../../utils/player'
import { commandListener } from '../../utils/commandListener'

const handlePlay = async (message: Message, args: string[]) => {
  if (!message.guild) {
    return
  }

  if (args.length === 0) {
    await message.channel.send(`I can't play a video if you dont provide me a valid url.. Are you stupid or what?`)
    return 
  }

  if (!message.member?.voice.channel) {
    message.channel.send(`Do you want me to listed to this video alone? No thanks. Try to join a voice channel and I will listen with you`)
    return
  }

  try {
    const connection = await message.member.voice.channel.join()
    const videoUrlToPlay = args[0]

    player.setVoiceConnection(connection)
    player.setTextChannel(message.channel as TextChannel)
    await player.enqueueNextMusic(videoUrlToPlay)
  } catch (err) {
    console.error(err)
    message.channel.send(`Huh? I sense some problem, can you handle this Master?`)
  }
}

commandListener.registerHandler('play', handlePlay, 'With this order I can play any video from youtube for you, inclusive some naughty ones.')
