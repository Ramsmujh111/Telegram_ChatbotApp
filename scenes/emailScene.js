const Scene = require('telegraf/scenes/base')
const emailValidator = require('email-validator');

const emailScene = new Scene('emailScene')

emailScene.enter(ctx => ctx.reply('Enter your email:'))

emailScene.on('text', (ctx) => {
   try {
    ctx.session.email = ctx.message.text
    const email = emailValidator.validate(ctx.session.email);
    if(!email){
       return ctx.reply('Please Enter the valid email');
    }
    return ctx.scene.enter('passScene')
   } catch (error) {
      ctx.reply(error.message);
      console.log(error.message);
   }
})


module.exports = emailScene