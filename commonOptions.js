const bot = require("./bot");

module.exports = {
  async startBot(chatId) {
    const welcomeText =
      "Привет! 👋 \n\n Добро пожаловать в бота, специализирующегося на хакинге, инфобезопасности и взломе информационных систем. \n\n 🔒 Здесь вы можете изучить методы атак и защиты, разбираться в шифровании и анализе уязвимостей. Я не поощряю противозаконные действия или противоправные действия в сети. Моя цель — помочь развивать твои знания в области информационной безопасности и осознанное использование полученной информации.\n\n 🔐 Не забывай, что хакинг и взлом без разрешения владельца системы — противозаконные действия. Важно соблюдать этический кодекс и использовать полученные знания в законных целях. Обращайся со своими вопросами, будем исследовать мир информационной безопасности вместе! 💻🛡️";

    await bot.sendPhoto(chatId, "./assets/welcome.jpg", { caption: welcomeText });
  },

  async menuBot(chatId, stateStorage) {
    const keyboard = {
      inline_keyboard: [[{ text: "🛠 Показать инструменты 🛠", callback_data: "show_tools" }]],
    };

    const messageOptions = {
      reply_markup: JSON.stringify(keyboard),
    };

    const sentMessage = await bot.sendMessage(chatId, "Выберите опцию:", messageOptions);

    


    // Listen for callback queries
    bot.on("callback_query", async (query) => {
      // Handle the callback query based on the data received
      if (query.data === "show_tools") {
        // Edit the current message with the new message after clicking the "show_tools" button
        const toolsText = "Выберите категорию:"; // Your new message here

        const keyboard = {
          inline_keyboard: [
            [{ text: "Сайты", callback_data: "sites" }],
            [{ text: "Инструмент 2", callback_data: "tool_2" }],
            [{ text: "Назад", callback_data: "back" }],

            // Add more buttons as needed
          ],
        };

        const messageOptions = {
          reply_markup: JSON.stringify(keyboard),
        };

        await bot.editMessageText(toolsText, {
          chat_id: chatId,
          message_id: sentMessage.message_id,
          reply_markup: messageOptions.reply_markup,
        });
      }

      if (query.data === "sites") {
        const toolsText  = "Сайты"; // Your new message here

        const keyboard = {
          inline_keyboard: [
            [{ text: "Whois", callback_data: "whois", width: 3 }],
            // Add more buttons as needed
          ],
        };

        const messageOptions = {
          reply_markup: JSON.stringify(keyboard),
        };

        await bot.editMessageText(toolsText, {
          chat_id: chatId,
          message_id: sentMessage.message_id,
          reply_markup: messageOptions.reply_markup,
        });
      }

      if (query.data === "whois") {
        
        const whoisDescription = "Whois - это утилита или сервис, который предоставляет информацию о регистрации доменных имен. Он позволяет получить данные о владельце домена, контактные данные, даты регистрации и другие сведения.\n\n Чтобы воспользоваться данным сервисом введите название сайта без протокола либо его IP."
            // Save the current state to indicate that we are waiting for the user's response
        await bot.sendMessage(chatId, whoisDescription);
        
        stateStorage.save("waiting_for_user_input");
     }
    
    });
   
   
  },
};
