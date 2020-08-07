import { Message, VoiceConnection, TextChannel } from 'discord.js'
import ytdl from 'ytdl-core'

export const handlePlay = async (message: Message, args: string[]) => {
  if (!message.guild) {
    return
  }

  if (args.length === 0) {
    await message.channel.send("I can't play a video if you dont provide me a valid url.. Are you stupid or what?")
    return 
  }

  if (!message.member?.voice.channel) {
    message.channel.send("Do you want me to listed to this video alone? No thanks. Try to join a voice channel and I will listen with you")
    return
  }

  try {
    const connection = await message.member.voice.channel.join()
    const videoUrlToPlay = args[0]

    await playNextVideo(connection, message.channel as TextChannel, videoUrlToPlay)
  } catch (err) {
    console.error(err)
    message.channel.send(`Huh? I sense some problem, can you handle this Master?`)
  }
}

const playNextVideo = async (connection: VoiceConnection, channel: TextChannel, url: string) => {
  const videoInfo = await ytdl.getInfo(url)
  const stream = ytdl.downloadFromInfo(videoInfo, { filter: 'audioonly' })
  const dispatcher = connection.play(stream)

  await channel.send(`**${videoInfo.videoDetails.title}** is playing right now. Be grateful Ka ka.`)

  dispatcher.on('finish', async () => {
    await channel.send(`Master, your music has stopped..`)
  })
}
