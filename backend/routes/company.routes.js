import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import isAutheticated from "../middlewares/isAuthenticated.js";


const companyRouter = express.Router();

companyRouter.route("/register").post(isAutheticated, registerCompany);
companyRouter.route("/get").get(isAutheticated, getCompany);
companyRouter.route("/get/:id").get(isAutheticated, getCompanyById);
companyRouter.route("/update/:id").post(isAutheticated,updateCompany);


export default companyRouter;