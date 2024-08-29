import express from "express";
import routes from "./routes";
import "./database";
import { resolve } from "path";
import cors from "cors";

const list = ["https://interface-dev-club.vercel.app", "http://localhost:3000"];

const corsOption = {
  origin: function (origin, callback) {
    if (list.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

class App {
  constructor() {
    this.app = express();

    this.app.use(cors(corsOption));
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());

    this.app.use(
      "product-file",
      express.static(resolve(__dirname, "..", "uploads"))
    );

    this.app.use(
      "category-file",
      express.static(resolve(__dirname, "..", "uploads"))
    );
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
