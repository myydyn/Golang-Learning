import { Request, Response } from "express";
import { CategoryPersistence } from "./repository/dto";
import { ca } from "zod/v4/locales";
import { CategoryStatus } from "../model/model";

export const getCategoryApi = async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await CategoryPersistence.findByPk(id);

    if (!category || category.status === CategoryStatus.DELETED) {
        res.status(404).json({
            message: 'Category not found',
        });
        return;
    }

    res.status(200).json({
        data: category,
    });
};