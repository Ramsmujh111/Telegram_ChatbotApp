require('dotenv').config()

const { Telegraf, session } = require('telegraf')

const Stage = require('telegraf/stage')

const {
    emailScene,
    passScene
} = require('./scenes')

const stage = new Stage([emailScene, passScene])

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(session())
bot.use(stage.middleware())

bot.start(ctx => ctx.reply("Send the /email command to enter your email. /password to enter your password"))

bot.command('email', ctx => ctx.scene.enter('emailScene'))
bot.command('password', ctx => ctx.scene.enter('passScene'))
bot.hears('Hi' , async (ctx) =>{
    ctx.reply(`Hello,
      Welcome To chatbot application
      Please enter your login credentials  using /start command`)
})
bot.hears('Hello' , async (ctx) =>{
    ctx.reply(`Hi,
      Welcome To chatbot application
      Please enter you login credentials using /start command`)
})

bot.help(ctx => ctx.reply(ctx.session.name + " " + ctx.session.age))

bot.launch()
