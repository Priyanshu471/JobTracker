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

config();
connectDB();
const TOKEN = process.env.TOKEN;

export const bot = new TelegramBot(TOKEN, { polling: true });
export const GIF = process.env.BOT_GIF;

console.log("Server is Started");
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

bot.on("message", async (msg) => {
  const {
    chat: { id, first_name },
    text,
  } = msg;
  const user = await userModel.findOne({ userId: id });
  if (!user) newUser(id, first_name);
});

bot.on("polling_error", (err) => console.log(err));
