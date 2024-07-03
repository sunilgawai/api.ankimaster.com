import { Router } from "express";

const authRoutes = Router();
authRoutes.get("/", (req, res) => res.json("auth"));
/**
 * Register User
 */
authRoutes.post("/register");

/**
 * Login User
 */

authRoutes.post("/login");

export default authRoutes;
