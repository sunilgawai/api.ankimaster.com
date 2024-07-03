import { NextFunction, Request, Response } from "express";

class AuthController {
	static async register(req: Request, res: Response, next: NextFunction) {
		res.json({
			message: "Register Successfull",
		});
	}

    static async login(req: Request, res: Response, next: NextFunction) {
		res.json({
			message: "Login Successfull",
		});
	}
}

export default AuthController;
