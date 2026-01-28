import { config } from "./config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(config.mysql as any);

