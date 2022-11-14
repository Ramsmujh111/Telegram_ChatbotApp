const Scene = require('telegraf/scenes/base')

const passScene = new Scene('passScene')

passScene.enter(ctx => ctx.reply('Enter your password:'));

passScene.on('text', ctx => {
    ctx.session.pass = ctx.message.text
    let password = ctx.session.pass;
    if(!parseInt(password)){
        return ctx.reply(`Wrong password, Please try again!
        `);
    }
    return ctx.scene.leave()
})

passScene.leave(ctx => ctx.reply(`Login Successful
Thanks for your time
`))

module.exports = passScene