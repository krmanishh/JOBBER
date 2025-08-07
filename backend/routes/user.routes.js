import express from "express"
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAutheticated from "../middlewares/isAuthenticated.js";

const userRoute = express.Router();

userRoute.route("/register").post(register);
userRoute.route("/login").post(login)
userRoute.route("/logout").get(logout)
userRoute.route("/profile/update").post(isAutheticated, updateProfile);

export default userRoute;

