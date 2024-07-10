import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { JWT_TOKEN_SECRET } from "../../config";

const prisma = new PrismaClient();

class AuthController {
	static async register(req: Request, res: Response, next: NextFunction) {
		const { username, email, password } = req.body as {
			username: string;
			email: string;
			password: string;
		};

		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await prisma.user.create({
				data: {
					username,
					email,
					password: hashedPassword,
				},
			});

			res
				.status(201)
				.json({ message: "Registration Successful.", result: user });
		} catch (error) {
			console.error("Registration error:", error);
			return next(error);
		}
	}

	static async login(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body;

		try {
			const user = await prisma.user.findUnique({ where: { email } });
			if (!user) {
				return next(CustomErrorHandler.wrongCredentials("Wrong email"));
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				return next(CustomErrorHandler.wrongCredentials("Wrong password"));
			}

			const token = jwt.sign({ userId: user.id }, JWT_TOKEN_SECRET!, {
				expiresIn: "7d",
			});
			return res.json({ message: "Login successful", result: token });
		} catch (error) {
			console.error("Error logging in:", error);
			return next(error);
		}
	}

	static async forgotPassword(req: Request, res: Response, next: NextFunction) {
		const { email } = req.body;

		try {
			const user = await prisma.user.findUnique({ where: { email } });
			if (!user) {
				return next(
					CustomErrorHandler.wrongCredentials(
						"Please make sure the given email is valid"
					)
				);
			}

			// Generate a reset token and save it to the database or send it via email
			const resetToken = jwt.sign({ userId: user.id }, JWT_TOKEN_SECRET!, {
				expiresIn: "7h",
			});

			// Send reset token via email or save it to the database (implementation omitted)
			res.json({ message: "Password reset token sent", result: resetToken });
		} catch (error) {
			console.error("Error sending password reset token:", error);
			return next(error);
		}
	}

	static async confirmEmail(req: Request, res: Response) {
		const { token } = req.params;

		try {
			const decoded = jwt.verify(token, "your_jwt_secret") as {
				userId: string;
			};
			const user = await prisma.user.findUnique({
				where: { id: decoded.userId },
			});

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			// Mark email as confirmed in the database (implementation omitted)
			res.json({ message: "Email confirmed successfully" });
		} catch (error) {
			console.error("Error confirming email:", error);
			res.status(500).json({ message: "Internal Server Error", error });
		}
	}

	static async newPassword(req: Request, res: Response) {
		const { token, newPassword } = req.body;

		try {
			const decoded = jwt.verify(token, "your_jwt_secret") as {
				userId: string;
			};
			const hashedPassword = await bcrypt.hash(newPassword, 10);

			const user = await prisma.user.update({
				where: { id: decoded.userId },
				data: { password: hashedPassword },
			});

			res.json({ message: "Password updated successfully", user });
		} catch (error) {
			console.error("Error updating password:", error);
			res.status(500).json({ message: "Internal Server Error", error });
		}
	}
}

export default AuthController;
