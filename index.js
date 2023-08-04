const bot = require('./bot');
require('dotenv').config();


// Set up the Telegram bot
const botActions = () => {
    bot.on('message', async (msg) => {
      const text = msg.text;
      const chatId = msg.chat.id;
  
      try {
        if (text === '/start') {
            bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/9ef/db1/9efdb148-747f-30f8-9575-7f6e06d34bac/7.webp');
        } 
      } catch (e) {
        console.log(e);
        return bot.sendMessage(chatId, 'Ой! Произошла серьезная ошибка!');
      }
    });
  
    // bot.on('callback_query', async (msg) => {
    //   const data = msg.data;
    //   const chatId = msg.message.chat.id;
  
    //   if (data === '24h_history' || data === '7d_history' || data === '30d_history') {
    //     getHistory(chatId, data);
    //   }
    // });
  };
  
  botActions();