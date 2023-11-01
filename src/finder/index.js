// import { Resend } from "resend";
import { bot } from "../index.js";
// import {keywords, ourCompanies } from "../utils/util.js";
import { userModel } from "../model/user.js";
import {
  credTracker,
  // result,
  upstoxTracker,
  zerodhaTracker,
} from "./company.js";

export const Finder = async (id, company) => {
  try {
    const user = await userModel.findOne({ userId: id });
    if (user && user.isSubscribed) {
      //       jobs = [];
      user.companies.forEach(async (company) => {
        if (company === "zerodha")
          await bot
            .sendMessage(id, "Searching in Zerodha")
            .then(() => zerodhaTracker(id));
        if (company === "upstox")
          await bot
            .sendMessage(id, "Searching in Upstox")
            .then(() => upstoxTracker(id));
        if (company === "cred")
          await bot
            .sendMessage(id, "Searching in Cred")
            .then(() => credTracker(id));
      });
    } else {
      // console.log("contoll");
      if (company === "cred") {
        // console.log("cred");
        bot.sendMessage(id, "Searching in CRED").then(() => credTracker(id));
      }
      if (company === "upstox")
        bot
          .sendMessage(id, "Searching in UPSTOX")
          .then(() => upstoxTracker(id));
      if (company === "zerodha")
        bot
          .sendMessage(id, "Searching in ZERODHA")
          .then(() => zerodhaTracker(id));
    }
  } catch (error) {
    console.log(error);
  }
};
