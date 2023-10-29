import { bot, GIF } from "../index.js";

export const Start = (id, name) => {
  bot.sendMessage(
    id,
    `Hello ${name}, I can scan a career page and tell you if they have any suitable opening. \n\nTry /help`
  );
  bot.sendAnimation(id, GIF);
};
export const Help = (id) => {
  bot.sendMessage(
    id,
    "Confused? Don't worry, I'm here to help. \n\n Type /find if your want a quick job search \n\n Type /subscribe to get daily updates on job openings \n\n Type /unsubscribe to stop receiving daily updates \n\n If you are a subscriber, then \n\n Type /add if you want to add more company to keep an eye on them \n\n Type /remove if you want to remove a company from your list \n\n Type /companies to see the list of companies you are tracking"
  );
};
export const Find = (id) => {};
export const Subscribe = (id) => {};
export const Unsubscribe = (id) => {};
export const Add = (id) => {};
export const Remove = (id) => {};
export const Companies = (id) => {};

export const Defaulter = (id, text, name) => {
  const sticker = [
    "https://tlgrm.eu/_/stickers/4e9/f82/4e9f8261-7c25-3624-b040-323197eaf136/192/3.webp",
    "https://tlgrm.eu/_/stickers/4e9/f82/4e9f8261-7c25-3624-b040-323197eaf136/192/10.webp",
    "https://tlgrm.eu/_/stickers/4e9/f82/4e9f8261-7c25-3624-b040-323197eaf136/192/23.webp",
    "https://tlgrm.eu/_/stickers/4e9/f82/4e9f8261-7c25-3624-b040-323197eaf136/192/13.webp",
  ];
  const res = [
    "Heyyyyyzzzz i am not a human 🫤",
    "I am a bot 🙄",
    "Ughhh",
    "can't see this anymore ",
  ];
  const idx = Math.round(Math.random() * 4);

  if (text.startsWith("/")) {
    bot.sendMessage(
      id,
      "Sorry, I don't understand that command. Type /help to see the list of commands"
    );
  } else if (
    text.toLowerCase().includes("hi") ||
    text.toLowerCase().includes("hello") ||
    text.toLowerCase().includes("hey")
  ) {
    bot.sendMessage(
      id,
      `Hola ${name}, I'm a bot to track your job openings. \n\nTo get started, type /start ;)`
    );
    bot.sendMessage(id, "☺️");
  } else if (
    text.toLowerCase().includes("bye") ||
    text.toLowerCase().includes("goodbye")
  ) {
    bot.sendMessage(id, `Bye! Take care.`);
    bot.sendMessage(id, "🤖");
  } else {
    bot.sendChatAction(id, "choose_sticker").then(() => {
      bot.sendSticker(id, sticker[idx]);

      bot.sendMessage(id, res[idx]);
    });
  }
};
