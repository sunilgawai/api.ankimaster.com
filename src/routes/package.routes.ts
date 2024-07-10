import { Router } from "express";
import multer from "multer";
import PackageController from "../controllers/package.controller";

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

export default packageRouter;
