
import cors from 'cors';
import express from 'express';
import { categoryRouter, productRouter } from "./routes";
import { errorHandler } from './middlewares';
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/product", productRouter);
app.use("/category", categoryRouter);

app.use(errorHandler);

 export { app };