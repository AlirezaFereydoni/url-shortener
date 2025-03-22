import express from "express";
import Routes from "./routes";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(express.json());

app.use(helmet());
app.use(cors());

app.use("/", Routes);

export default app;
