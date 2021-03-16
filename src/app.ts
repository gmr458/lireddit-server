import express from "express";
import morgan from "morgan";

const app: express.Application = express();

app.set("PORT", process.env.PORT || 3000);

app.use(morgan("dev"));

export default app;
