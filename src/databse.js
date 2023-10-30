import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "JobFinder",
    })
    .then((c) => console.log(`DB is connected`))
    .catch((e) => console.log(e));
};
