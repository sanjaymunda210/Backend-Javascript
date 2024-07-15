import dotenv from "dotenv";
import connectDB from "./db/index.js";
// import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});
// *****App data to remove error*****
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);
// *****app data end**********

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(` server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection failed !!! ", err);
  });

// explanation code for connection and server setup
// import express from "express";
// const app = express();

// ( async() => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME} `)
//         app.on("error", () => {
//             console.log("ERROR: ", error);
//             throw error
//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error("ERROR: ", error);
//         throw err
//     }
// })()

// Dynamic import method to resolve circular dependency error
// SyntaxError: Invalid or unexpected token
//     at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:167:18)
//     at callTranslator (node:internal/modules/esm/loader:285:14)
//     at ModuleLoader.moduleProvider (node:internal/modules/esm/loader:291:30)
//     at async link (node:internal/modules/esm/module_job:76:21)

// Node.js v20.11.0
// [nodemon] app crashed - waiting for file changes before starting...

// connectDB()
//   .then(() => {
//     import("./app.js").then((appModule) => {
//       const app = appModule.app;
//       app.listen(process.env.PORT || 8000, () => {
//         console.log(` server is running at port ${process.env.PORT}`);
//       });
//     });
//   })
//   .catch((err) => {
//     console.log("Mongo db connection failed !!! ", err);
//   });
