require("dotenv").config();

const { Telegraf, session } = require("telegraf");

const Stage = require("telegraf/stage");

const { emailScene, passScene } = require("./scenes");

// Here we are creating a instance/object for the Stage classes and passing as params our stage messages
const stage = new Stage([emailScene, passScene]);
// initialize the BOT_TOKEN in Telegraf class and create the bot class Telegraf instance/object
const bot = new Telegraf(process.env.BOT_TOKEN);
// set the session middleware 
bot.use(session());
// we need to create a state middleware to invokes the stages message
bot.use(stage.middleware());
// bot start it's create the /start keywords in Telegram chat and start the interaction with chat
bot.start((ctx) =>
  ctx.reply(
    "Send the /email command to enter your email. /password to enter your password"
  )
);
// Here create a random commands and /email and send callback
bot.command("email", (ctx) => ctx.scene.enter("emailScene"));
bot.command("password", (ctx) => ctx.scene.enter("passScene"));
// here is also define keywords
bot.hears("Hi", async (ctx) => {
  ctx.reply(`Hello,
      Welcome To chatbot application
      Please enter your login credentials  using /start command`);
});
// here is also define keywords
bot.hears("Hello", async (ctx) => {
  ctx.reply(`Hi,
      Welcome To chatbot application
      Please enter you login credentials using /start command`);
});

bot.help((ctx) => ctx.reply(ctx.session.email + " " + ctx.session.password));
// Launch the bot server
bot.launch();
