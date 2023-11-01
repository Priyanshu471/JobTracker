import TelegramBot from "node-telegram-bot-api";
import { connectDB } from "./databse.js";
import { config } from "dotenv";
import {
  Start,
  Help,
  Defaulter,
  Find,
  Subscribe,
  Unsubscribe,
  Add,
  Remove,
  Companies,
  newUser,
} from "./middleware/commands.js";
import { userModel } from "./model/user.js";
import express from "express";

config();
connectDB();
const TOKEN = process.env.TOKEN;
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello World");
});
console.log("Server is Started");
app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});

export const bot = new TelegramBot(TOKEN, { polling: true });
export const GIF = process.env.BOT_GIF;

bot.onText(/\/start/, (msg) => {
  const { id, first_name } = msg.chat;
  Start(id, first_name);
});
bot.onText(/\/help/, (msg) => {
  const { id } = msg.chat;
  Help(id);
});
bot.onText(/\/find/, (msg) => {
  const { id } = msg.chat;
  Find(id);
});
bot.onText(/\/subscribe/, (msg) => {
  const { id } = msg.chat;
  Subscribe(id);
});
bot.onText(/\/unsubscribe/, (msg) => {
  const { id } = msg.chat;
  Unsubscribe(id);
});
bot.onText(/\/add(.+)/, (msg) => {
  const { id } = msg.chat;
  Add(id, msg.text.split(" ")[1].toString().toLowerCase());
});
bot.onText(/\/remove(.+)/, (msg) => {
  const { id } = msg.chat;
  Remove(id, msg.text.split(" ")[1].toString().toLowerCase());
});
bot.onText(/\/companies/, (msg) => {
  const { id } = msg.chat;
  Companies(id);
});
bot.onText(/\/end/, async (msg) => {
  await bot.sendMessage(
    msg.chat.id,
    "Oh you are going now!😶 \n\n hope you enjoyed feel free to give your feedback to <b>https://t.me/Chat_withPriyanshu</b>",
    { parse_mode: "HTML" }
  );
  const promt = await bot.sendMessage(
    msg.chat.id,
    "Going to delete your data \n\nAre you sure?",
    {
      reply_markup: {
        // keyboard: [["Yes", "No"]],
        force_reply: true,
      },
    }
  );
  bot.onReplyToMessage(msg.chat.id, promt.message_id, async (msg) => {
    if (msg.text === "Yes") {
      await bot.sendMessage(msg.chat.id, "Deleting your data");
      bot.sendMessage(msg.chat.id, "Bye! Take care 👋");
      await userModel.findOneAndDelete({ userId: msg.chat.id });
    } else {
      await bot.sendMessage(msg.chat.id, "Okay! not deleting your data");
      bot.sendMessage(msg.chat.id, "Bye! See you again 👋");
    }
  });
});

bot.on("message", async (msg) => {
  const {
    chat: { id, first_name },
    text,
  } = msg;
  const user = await userModel.findOne({ userId: id });
  if (!user) newUser(id, first_name);
});

bot.on("polling_error", (err) => console.log(err));
