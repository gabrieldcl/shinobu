import { Message } from 'discord.js'
import { commandListener } from '../../utils/commandListener'
import puppeteer from 'puppeteer'

const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const handleWatch = async (receivedMessage: Message, args: string[]) => {
  const { channel } = receivedMessage

  if (!args.length) {
    await channel.send(`Are you stupid? You need to send me a url..`)
    return
  }

  const url = args[0]

  await channel.send(`Hmmm... Ok Master, let's see what I can do`)

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await channel.send(`Navigating...`)
  await page.goto('https://sync-tube.de/create')
  
  await channel.send(`Typing url in search bar...`)
  await page.waitForSelector('body > header > div.header_wrapper > div.search_input_wrapper > input')
  await page.type('body > header > div.header_wrapper > div.search_input_wrapper > input', url)

  await channel.send(`Pressing enter...`)
  await page.keyboard.press('Enter')
  
  await channel.send(`Hovering video player...`)
  await page.waitForSelector('#player')
  await page.hover('#player')

  const currentPageUrl = page.url()

  await page.close()
  await browser.close()

  await channel.send(`Ok Master, I've already setup everything for you. Follow this link: ${currentPageUrl}`)
}

commandListener.registerHandler('watch', handleWatch, `Watch`)
