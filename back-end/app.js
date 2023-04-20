
import cors from 'cors';
import express from 'express';
import { categoryRouter, productRouter } from "./routes";

const app = express();
app.use(cors());

app,use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/product", productRouter);
app.use("/category", categoryRouter);