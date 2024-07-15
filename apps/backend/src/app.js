import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(express.json())
	.use(express.urlencoded({ extended: true }))
	.use(morgan("dev"))
	.use(cors());

app.get("/", (req, res) => {
	res.json({ status: "ok" });
});

app.listen(4000, () => console.log("Server running on port https://localhost:4000"));
