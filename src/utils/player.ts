import ytdl from 'ytdl-core'
import { VoiceConnection, TextChannel, StreamDispatcher } from 'discord.js'
import fs from 'fs'

const downloadToFile = async (videoInfo: ytdl.videoInfo, fileName: string): Promise<void> => {
  const stream = ytdl.downloadFromInfo(videoInfo, { filter: 'audioonly' })
  return new Promise(resolve => {
    stream.pipe(fs.createWriteStream(fileName))
    stream.on('end', () => {
      resolve()
    })
  })
}

class Player {
  private isPlaying: boolean = false
  private voiceConnection: VoiceConnection | null = null
  private queue: ytdl.videoInfo[] = []
  private textChannel: TextChannel | null = null
  private dispatcher: StreamDispatcher | null = null
  private currentMusic: ytdl.videoInfo | null = null
  private volume: number = 1

  getIsPlaying = (): boolean => {
    return this.isPlaying
  }

  getCurrentMusic = (): ytdl.videoInfo | null => {
    return this.currentMusic
  }

  setVoiceConnection = (connection: VoiceConnection | null) => {
    this.voiceConnection = connection
  }

  setTextChannel = (textChannel: TextChannel | null) => {
    this.textChannel = textChannel
  }

  safelySendTextMessage = async (message: string): Promise<void> => {
    if (!this.textChannel) {
      return
    }

    try {
      await this.textChannel.send(message)
    } catch (err) {
      console.error(err)
    }
  }

  enqueueNextMusic = async (url: string): Promise<void> => {
    const videoInfo = await ytdl.getInfo(url)
    this.queue.push(videoInfo)

    if (!this.isPlaying) {
      this.play().catch(console.error)
      return
    }

    await this.safelySendTextMessage(`Master, wait a sec, I will play ${videoInfo.videoDetails.title} latter ~'`) 
  }

  play = async (): Promise<void> => {
    if (this.isPlaying) {
      await this.safelySendTextMessage(`I can't do two things at time, bakayaro.`) 
    }

    if (!this.queue.length) {
      await this.safelySendTextMessage('Master, queue is currently empty, what do you expect me to do?')
      return
    }

    if (!this.voiceConnection) {
      await this.safelySendTextMessage(`I'm sleeping in your shadow right now ka ka.`)
      return
    }

    const elementToPlay = this.queue.shift()!
    this.isPlaying = true
    this.currentMusic = elementToPlay
    await this.safelySendTextMessage(`**${elementToPlay.videoDetails.title}** is being downloaded. Relax master`)

    if (!fs.existsSync('./tmp')) {
      fs.mkdirSync('./tmp')
    }

    await downloadToFile(elementToPlay, './tmp/audioToPlay.flv')
    this.dispatcher = this.voiceConnection.play('./tmp/audioToPlay.flv', { volume: this.volume })

    await this.safelySendTextMessage(`**${elementToPlay.videoDetails.title}** is playing right now. Be grateful Ka ka.`)

    this.dispatcher.on('finish', async () => {
      await this.safelySendTextMessage(`Master, your music has stopped..`)
      this.isPlaying = false
      this.currentMusic = null
      if (this.queue.length) {
        this.play().catch(console.error)
      }
    })
  }

  stop = () => {
    this.dispatcher?.destroy()
    this.isPlaying = false
    this.currentMusic = null
  }

  pause = () => {
    this.dispatcher?.pause()
  }

  resume = () => {
    this.dispatcher?.resume()
  }

  setVolume = (volume: number) => {
    this.volume = volume
    this.dispatcher?.setVolume(volume)
  }

  skip = () => {
    this.stop()

    if (this.queue.length) {
      this.play().catch(console.error)
    }
  }

  clearPlayer = () => {
    this.stop()
    this.queue = []
    this.voiceConnection = null
    this.textChannel = null
    this.dispatcher = null
    this.currentMusic = null
  }
}

export const player = new Player()
