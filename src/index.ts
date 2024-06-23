import express from "express";
import cors from "cors";
import { APP_PORT } from "../config";
import morgan from "morgan"
import errorHandler from "./middlewares/errorHandler";

const app = express();

// Middlwares
app.use(
	cors({
		origin: "*",
		methods: ["POST", "PUT", "PATCH", "DELETE", "GET"],
		credentials: true,
	})
);
app.use(
	express.json({
		limit: "50mb",
	})
);
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(morgan("dev"))
app.use(express.static("build"));

// Routes...
app.use((_, res) => {
	res.json({
		message: "Hello from api.ankimaster.com",
	});
});

// Error handler...
app.use(errorHandler);

app.listen(APP_PORT, () =>
	console.log(`listening on http://localhost:${APP_PORT}`)
);
