import express from "express";
import type { Request, Response } from "express";
import {config} from "dotenv";
import { setupCategoryHexagon } from "./modules/category";
import { setupBrandHexagon } from "./modules/brand";
import { sequelize } from "./share/component/sequelize";

config();

(async () => {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());

    app.get('/', (req: Request, res: Response) => {
        res.send("Hello, TypeScript Express!");
    });

    app.post('/', (req: Request, res: Response) => {
        res.send("Hello with POST");
    });

    app.use('/v1', setupCategoryHexagon(sequelize));
    app.use('/v1', setupBrandHexagon(sequelize));

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    }); 

})();
