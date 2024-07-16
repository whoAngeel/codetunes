import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import cfg from "../src/config/config.js";
import { Artist, Song, User } from "./models/index.js";
import { connection } from "./config/db.js";
import { useApiRouter } from "./router/index.js";
import {
	boomErrorHandler,
	errorHandler,
	logErrors,
	ormErrorHandler,
} from "./middlewares/errorHandler.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

import "./utils/passport/index.js"; // strategies de passport

app.get("/", (req, res) => {
	res.json({ status: "ok" });
});
useApiRouter(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);

connection();

app.listen(cfg.port, () => {
	console.log("Server running on http://localhost:" + cfg.port);
});
