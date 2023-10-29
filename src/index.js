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
} from "./middleware/commands.js";

config();
connectDB();
const TOKEN = process.env.TOKEN;

export const bot = new TelegramBot(TOKEN, { polling: true });
export const GIF = process.env.BOT_GIF;

console.log("Server is Started");

bot.on("message", (msg) => {
  //   console.log(msg);
  const {
    chat: { id, first_name },
    text,
  } = msg;

  switch (text) {
    case "/start":
      Start(id, first_name);
      break;
    case "/help":
      Help(id);
      break;
    case "/find":
      Find(id);
      break;
    case "/subscribe":
      Subscribe(id);
      break;
    case "/unsubscribe":
      Unsubscribe(id);
      break;
    case "/add":
      Add(id);
      break;
    case "/remove":
      Remove(id);
      break;
    case "/companies":
      Companies(id);
      break;
    default:
      Defaulter(id, text, first_name);
      break;
  }
});
