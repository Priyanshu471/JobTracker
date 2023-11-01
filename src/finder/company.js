import Cheerio from "cheerio";
import axios from "axios";
import { keywords, ourCompanies } from "../utils/util.js";
import { bot } from "../index.js";

let zerodhaJobs = [];
let upstoxJobs = [];
let credJobs = [];
export const zerodhaTracker = async (id) => {
  if ((!zerodhaJobs, length)) {
    const response = await axios.get(ourCompanies[2].url);
    const $ = Cheerio.load(response.data);
    const target = $("div.result");
    target.each((i, el) => {
      const job = $(el).find("h3").text().toLowerCase();
      const link = $(el).find("a").attr("href");
      keywords.forEach((keyword) => {
        if (job.includes(keyword)) {
          zerodhaJobs.push({ job, link });
        }
      });
    });
  }
  if (zerodhaJobs.length > 0) {
    bot.sendChatAction(id, "typing");
    bot.sendMessage(id, `Hey Found some jobs for you in Zerodha`);
    zerodhaJobs.forEach((job, i) => {
      bot.sendMessage(id, `Title : <b>${job.job} </b> \n<b>${job.link}</b>`, {
        parse_mode: "HTML",
      });
      // console.log(job.job);
    });
  } else bot.sendMessage(id, "No jobs found in Zerodha");
};
export const upstoxTracker = async (id) => {
  console.log("Company: upstox");
  if (!upstoxJobs.length) {
    console.log("getting");
    const response = await axios.get("https://jobs.lever.co/upstox");
    console.log("Got data");
    const $ = Cheerio.load(response.data);
    console.log("Targeting");
    const target = $("div.posting");
    console.log("Scrapping");
    console.log("Found Array empty...putting values");
    target.each((i, el) => {
      const job = $(el).find("h5").text().toLowerCase();
      const link = $(el).find("a").attr("href");
      // upstoxJobs.push({ job, link });
      keywords.forEach((keyword) => {
        if (job.includes(keyword)) {
          upstoxJobs.push({ job, link });
        }
      });
    });
  }
  if (upstoxJobs.length > 0) {
    console.log("Already have jobs");
    bot.sendChatAction(id, "typing");
    bot.sendMessage(id, `Hey Found some jobs for you in Upstox`);
    upstoxJobs.forEach((job, i) => {
      bot.sendMessage(id, `Title : <b>${job.job} </b> \n<b>${job.link}</b>`, {
        parse_mode: "HTML",
      });
      // console.log(job.job);
    });
  } else bot.sendMessage(id, "No jobs found in Upstox");
};
export const credTracker = async (id) => {
  if (!credJobs.length) {
    console.log("getting");
    const response = await axios.get("https://jobs.lever.co/cred");
    console.log("Got data");
    const $ = Cheerio.load(response.data);
    const target = $("div.posting");
    let jobs = [];
    console.log("Scrapping");
    target.each((i, el) => {
      const job = $(el).find("h5").text().toLowerCase();
      const link = $(el).find("a").attr("href");
      keywords.forEach((keyword) => {
        if (job.includes(keyword)) {
          // console.log("Found", job.slice(0, 8));
          jobs.push({ job, link });
        }
      });
    });
  }
  if (credJobs.length > 0) {
    bot.sendChatAction(id, "typing");
    bot.sendMessage(id, `Hey Found some jobs for you in Cred`);
    credJobs.forEach((job, i) => {
      bot.sendMessage(id, `Title : <b>${job.job} </b> \n<b>${job.link}</b>`, {
        parse_mode: "HTML",
      });
      console.log(job.job);
    });
  } else {
    bot.sendMessage(id, "No jobs found in Cred");
  }
  console.log("Company: cred");
};
export const result = async (id) => {
  bot.sendMessage(id, `Hey Found some jobs for you in ${company}`);
  jobs.forEach((job, i) => {
    bot.sendMessage(
      id,
      `Title : <b> ${job.job} </b> \n<a href=${job.link}>Link</a>`,
      { parse_mode: "HTML" }
    );
  });
};
