import type { CommandListener } from './commandListener'
import { Message } from 'discord.js'

export const createHelpHandler = (commandListener: CommandListener) => async (receivedMessage: Message) => {
  const { channel } = receivedMessage

  await channel.send({
    embed: {
      description: `Now that I've drank your blood, you will be my master for eternity ~' \n\n **Here is what I can do for you:**`,
      color: '#f1d779',
      title: '~',
      footer: {
        text: 'Devolped by Gabriel#9871 and Jouter#0501'
      },
      author: {
        name: 'Shinobu - Kiss-shot-acerola-heart-under-blade'
      },
      thumbnail: {
        url: 'https://vignette.wikia.nocookie.net/bakemonogatari1645/images/8/81/Episode._11_Tsukihi_Phoenix%2C_Part_4_Shinobu_Oshino_3.jpg/revision/latest/top-crop/width/220/height/220?cb=20130101032705'
      },
      image: {
        url: 'https://i.pinimg.com/originals/fd/9f/d8/fd9fd8517a4e24902dc8ca06fd4bee68.gif'
      },
      fields: commandListener.getCommandList().map((command) => ({
        name: `!${command.key}`,
        value: command.description
      }))
    }
  })
}
