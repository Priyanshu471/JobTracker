import Cheerio from "cheerio";
import axios from "axios";

export const zerodhaTracker = async (id) => {
  //   const response = await axios.get(ourCompanies[2].url);
  //   const $ = Cheerio.load(response.data);
  //   const target = $("div.result");
  //   target.each((i, el) => {
  //     const job = $(el).find("h3").text().toLowerCase();
  //     const link = $(el).find("a").attr("href");
  //     keywords.forEach((keyword) => {
  //       if (job.includes(keyword)) {
  //         jobs.push({ job, link });
  //       }
  //     });
  //   });
  //   if (jobs.length > 0) {
  //     jobs.forEach((job, i) => {
  //       job.link = ourCompanies[i].url;
  //       bot.sendMessage(
  //         id,
  //         `<b>${
  //           job.job.charAt(0).toUpperCase() + job.job.slice(1)
  //         }</b> \n<a href="${job.link}">Link</a>`,
  //         {
  //           parse_mode: "HTML",
  //         }
  //       );
  //     });
  //   }
  console.log("Company: zerodha");
};
export const upstoxTracker = async (id) => {
  console.log("Company: upstox");
};
export const credTracker = async (id) => {
  console.log("Company: cred");
};
