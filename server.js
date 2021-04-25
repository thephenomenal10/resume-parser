const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("unhandled exception , shuting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

// const DB = "mongodb://localhost:27017/resume-db";
// &w=majority
const DB = "mongodb+srv://rootuser:<PASSWORD>@ai-recruiter.bggjj.mongodb.net/AI-Recruiter?retryWrites=true".replace(
  "<PASSWORD>",
  process.env.DATABASE_PASS
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connections Successfull!!");
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app is running on port no ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandled rejection , shuting down...");
  server.close(() => {
    process.exit(1);
  });
});
