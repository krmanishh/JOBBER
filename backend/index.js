import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";

import connectDB from "./utils/db.js";
dotenv.config({});


const app = express();

//middlewares --
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
  origin:'http://localhost:5173',
  credentials: true,
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRouter);


app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at Port: ${PORT}`);
})