import { config } from "dotenv";
import express, { type Request, type Response } from "express";
import { setupCategoryHexagon } from "./modules/category/index.js";
import { sequelize } from "./share/component/sequelize.js";

config();

(async () => {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");

  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello 200Lab!");
  });

  app.use("/v1", setupCategoryHexagon(sequelize));

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})();
