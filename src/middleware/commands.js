import { Finder } from "../finder/index.js";
import { bot, GIF } from "../index.js";
import { userModel } from "../model/user.js";

const servies = ["cred", "upstox", "zerodha"];
export const newUser = async (id, first_name) => {
  const newUser = new userModel({
    userId: id,
    name: first_name,
    isSubscribed: false,
    companies: [],
  });
  await newUser.save();
};
export const Start = (id, name) => {
  bot.sendMessage(
    id,
    `Hello ${name}, I can scan a career page and tell you if they have any suitable opening. \n\nTry /help`
  );
  bot.sendMessage(
    id,
    "Since I'am at beta stage, I can only search for jobs in Cred, Upstox and Zerodha."
  );
  // bot.sendAnimation(id, GIF);
  bot.sendMessage(id, "🤖");
};
export const Help = (id) => {
  bot.sendMessage(
    id,
    "Confused? Don't worry, I'm here to help. \n\n Type /find if your want a quick job search \n\n Type /subscribe to get daily updates on job openings \n\n Type /unsubscribe to stop receiving daily updates \n\n If you are a subscriber, then \n\n Type /add if you want to add more company to keep an eye on them \n\n Type /remove if you want to remove a company from your list \n\n Type /companies to see the list of companies you are tracking \n\n Type /end to delete your data from our database"
  );
};
export const Find = async (id) => {
  const user = await userModel.findOne({ userId: id });
  if (user && user.isSubscribed) {
    await bot.sendMessage(id, "🔭");
    await bot.sendMessage(
      id,
      "Going to search for jobs please hold on it might take a while! up to 2 min"
    );
    await Finder(id);
    return;
  } else {
    const ask = await bot.sendMessage(
      id,
      "Looks like you are not a subscriber. \n\nEnter the name of the company you want to search for. \n\nFor example Cred",
      {
        reply_markup: {
          force_reply: true,
        },
      }
    );
    bot.onReplyToMessage(id, ask.message_id, async (msg) => {
      // const company = msg.text.charAt(0).toUpperCase() + msg.text.slice(1);
      bot.sendMessage(msg.chat.id, "🔭");
      // await bot.sendMessage(msg.chat.id, `Searching in ${company}`);
      if (!servies.includes(msg.text.toLowerCase())) {
        bot.sendMessage(
          msg.chat.id,
          "Sorry I can't search for this company \n\nTry Cred, Uptox or Zerodha"
        );
        return;
      }
      Finder(msg.chat.id, msg.text.toLowerCase());
    });
  }
  // Finder(id);
};
export const Subscribe = async (id) => {
  // bot.sendMessage(id, "Wait lemme do some checks....");
  bot.sendChatAction(id, "typing");
  const user = await userModel.findOne({ userId: id });
  if (user && user.isSubscribed)
    await bot.sendMessage(
      id,
      "<b>Heyyyy! you are already a subscriber.</b> 🙄",
      { parse_mode: "HTML" }
    );
  if (!user.isSubscribed) {
    await userModel.findOneAndUpdate({ userId: id }, { isSubscribed: true });
    await bot.sendMessage(id, "<b>Hurray! You are subscribed now.</b>", {
      parse_mode: "HTML",
    });
    await bot.sendMessage(id, "🎊");
  }
  bot.sendMessage(
    id,
    "You will receive daily updates on job openings for the companies which are included in your subscription list. \n\nType company name after /add or /remove to edit your subscription list. \n<i>For example /add Apple.</i>",
    { parse_mode: "HTML" }
  );
};
export const Unsubscribe = async (id) => {
  const user = await userModel.findOne({ userId: id });
  if (user && !user.isSubscribed) {
    await bot.sendMessage(id, "Heyyyy! you are not a subscriber. 🙄");
    bot.sendMessage(id, "Type /subscribe to subscribe");
  } else {
    await userModel.findOneAndUpdate({ userId: id }, { isSubscribed: false });
    await bot.sendMessage(id, "You are unsubscribed now.");
    await bot.sendMessage(id, "😒");
  }
};
export const Add = async (id, company) => {
  //
  const user = await userModel.findOne({ userId: id });
  try {
    if (!user.isSubscribed) {
      await bot.sendMessage(
        id,
        "This service is only for subscriber. \n\nType /subscribe to subscribe"
      );
      return;
    }
    if (user && user.companies.includes(company)) {
      await bot.sendMessage(
        id,
        "Heyyyy! you are already tracking this company. 🙄 \n\nTo see your list enter /companies."
      );
      return;
    } else {
      await userModel.updateOne(
        { userId: id },
        { $push: { companies: company } }
      );
      company = company.slice(0, 1).toUpperCase() + company.slice(1);
      bot.sendMessage(id, `${company} is added to your list`);
    }
  } catch (error) {
    console.log(error);
  }
};
export const Remove = async (id, company) => {
  const user = await userModel.findOne({ userId: id });
  if (!user.isSubscribed) {
    await bot.sendMessage(
      id,
      "This service is only for subscriber. \n\nType /subscribe to subscribe"
    );
    return;
  }
  if (user && user.companies.includes(company)) {
    await userModel.updateOne(
      { userId: id },
      { $pull: { companies: company } }
    );
    company = company.slice(0, 1).toUpperCase() + company.slice(1);
    await bot.sendMessage(id, `${company} is removed from your list`);
    return;
  } else {
    await bot.sendMessage(
      id,
      "Heyyyy! you are not tracking this company. 🙄 \n\nTo see your list enter /companies."
    );
  }
};
export const Companies = async (id) => {
  const user = await userModel.findOne({ userId: id });
  if (!user.isSubscribed) {
    await bot.sendMessage(
      id,
      "This service is only for subscriber. \n\nType /subscribe to subscribe"
    );
    return;
  }
  if (user && user.companies.length > 0) {
    let res = "";
    user.companies.forEach((company) => {
      company = company.slice(0, 1).toUpperCase() + company.slice(1);
      res += `${company} \n`;
    });
    await bot.sendMessage(id, `<b>Your Subscription list.</b> \n${res}`, {
      parse_mode: "HTML",
    });
  } else {
    await bot.sendMessage(id, "You are not tracking any company");
  }
};
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

  if (
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
