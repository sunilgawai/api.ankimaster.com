import express, { Router } from "express";
import multer from "multer";
import PackageController from "../controllers/package.controller";
import { syncWithServer } from "../utils/syncLogic";

const upload = multer({ dest: "uploads/" });

const packageRouter = Router();

packageRouter.get(
	"/package/describe",
	upload.single("file"),
	PackageController.describeDatabase
);

packageRouter.post(
	"/package/import",
	upload.single("file"),
	PackageController.import
);

packageRouter.get("/sync", async (req, res) => {
	try {
		const userId = "b3777c2e-a7ce-49f9-85eb-8cf3212d6f98";
		const clientData = req.body;

		const syncResult = await syncWithServer(userId, clientData);

		res.json(syncResult);
	} catch (error) {
		console.error("Sync error:", error);
		res.status(500).json({ error: "An error occurred during sync" });
	}
});

packageRouter.post(
	"/sync",
	async (req: express.Request, res: express.Response) => {
		try {
			const userId = "b3777c2e-a7ce-49f9-85eb-8cf3212d6f98";
			const clientData = req.body;

			const syncResult = await syncWithServer(userId, clientData);

			res.json(syncResult);
		} catch (error) {
			console.error("Sync error:", error);
			res.status(500).json({ error: "An error occurred during sync" });
		}
	}
);

export default packageRouter;
