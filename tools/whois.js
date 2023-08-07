const bot = require("../bot");

const whois = require("whois");

module.exports = {
  async whoisCallback(chatId, domen) {
    const domenCheck = /[a-zA-Zа-яА-ЯёЁ0-9_-]+(\.[a-zA-Zа-яА-ЯёЁ0-9_-]+)*\.[a-zA-Zа-яА-ЯёЁ]{2,5}/;
    const ipCheck = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?)$/;

    if (domenCheck.test(domen) || ipCheck.test(domen)) {
      console.log(domenCheck.test(domen));
      whois.lookup(domen, (err, data) => {
        if (err) {
          bot.sendMessage(chatId, "An error occurred. Please try again.");
        } else {
          bot.sendMessage(chatId, data);
        }
      });
    } else {
      bot.sendMessage(chatId, "👹 Некорректный домен или IP ресурса.");
    }
  },
};
