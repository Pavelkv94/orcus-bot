require("dotenv").config();
const bot = require("./bot");
const { startBot, menuBot } = require("./commonOptions");
const { whoisCallback } = require("./tools/whois");

const stateStorage = {
  state: null,
  save: function (state) {
    this.state = state;
  },
  get: function () {
    return this.state;
  },
};

// Set up the Telegram bot
const botActions = () => {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const currentState = stateStorage.get(); // Get the current state

    try {
      if (text === "/start") {
        startBot(chatId);
      } else if (text === "/menu") {
        menuBot(chatId, stateStorage);
      }

      if (text && currentState === "waiting_for_user_input") {
        
        whoisCallback(chatId, text);
        stateStorage.save(null);
        menuBot(chatId, stateStorage);
      }
    } catch (e) {
      console.log(e);
      return bot.sendMessage(chatId, "Ой! Произошла серьезная ошибка!");
    }
  });
};

botActions();
