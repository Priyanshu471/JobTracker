// import { Resend } from "resend";
import { bot } from "../index.js";
import { jobs, keywords, ourCompanies } from "../utils/util.js";
import { userModel } from "../model/user.js";
import { credTracker, upstoxTracker, zerodhaTracker } from "./company.js";

export const Finder = async (id, company) => {
  try {
    const user = await userModel.findOne({ userId: id });
    if (user && user.isSubscribed) {
      //       jobs = [];
      user.companies.forEach(async (company) => {
        if (company === "zerodha") {
          zerodhaTracker(id);
          await bot.sendMessage(id, "Searching for Zerodha jobs");
        }
        if (company === "upstox") {
          upstoxTracker(id);
          await bot.sendMessage(id, "Searching for Upstox jobs");
        }
        if (company === "cred") {
          credTracker(id);
          await bot.sendMessage(id, "Searching for Cred jobs");
        }
      });
      if (jobs.length) {
        return bot.sendMessage(id, "<b>Here are the jobs for you</b>", {
          parse_mode: "HTML",
        });
      } else {
        setTimeout(() => {
          bot.sendMessage(id, "<b>No jobs found</b>", {
            parse_mode: "HTML",
          });
        }, 100);
      }
    } else {
      if (company === "cred") {
        credTracker(id);
      }
      if (company === "upstox") {
        upstoxTracker(id);
      }
      if (company === "zerodha") {
        zerodhaTracker(id);
      }
      setTimeout(() => {
        bot.sendMessage(id, "<b>No jobs found</b>", {
          parse_mode: "HTML",
        });
      }, 500);
    }
  } catch (error) {
    console.log(error);
  }
};
