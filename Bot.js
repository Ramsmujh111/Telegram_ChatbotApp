const { Telegraf } = require("telegraf");
const Mongoose = require('mongoose');
const emailValidator = require('email-validator');
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const helpMessage = `
This is the cat bot Application Please check,
/help -> type help to try on the help case
/database -> go for database and show the all credentials from the database
`;
/**
 * Create a help message for the user
 */

bot.help((ctx) => {
  ctx.reply(helpMessage);
});

/**
 * create text message for the users and authenticate with the database
 */
// bot.on('text' , async (ctx) =>{
//     const message = ctx.message.text // here i received a message to bot as a string
//     if(message === 'Hi' || message === 'Hello'){
//       return ctx.reply(`Welcome To chat Bot
//         Please enter your email 
//        `)
//     }
//     // here is the validate the email id
//     const email = emailValidator.validate(message);
//     // check the email id is valid ?
//     if(!email){
//        return ctx.reply(`Please Enter the Valid Email`);
//     }
//    const users = await Mongoose.connection.db.collection('users');
//    // find the user in the database
//    users.find().toArray(function(err , data){
//          if(err) {
//             return console.log(`email id does not available`);
//          }
//        ctx.reply(`Please Enter the Password`);
//    });    
// })

Mongoose.connect(process.env.MONGO_URI)
.then((result) =>{
   console.log(`DataBase connected successfully`);
   bot.launch();
})
.catch(err =>{
    console.log(err.message);
})
