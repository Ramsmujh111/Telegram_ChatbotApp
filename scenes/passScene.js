const Scene = require('telegraf/scenes/base')
// creating passScene object from the Scene class
const passScene = new Scene('passScene')
// call the enter method the invoke the password
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
// this is Leave the scene event 
passScene.leave(ctx => ctx.reply(`Login Successful
Thanks for your time
`))

module.exports = passScene