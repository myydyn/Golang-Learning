import type { Request, Response } from "express";
import { CategoryStatus } from "../model/model.js";
import { CategoryPersistence } from "./repository/dto.js";

export const deleteCategoryApi = () => async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await CategoryPersistence.findByPk(id);

  if (!category) {
    res.status(404).json({
      message: "Category not found",
    });

    return;
  }

  if (category.getDataValue("status") === CategoryStatus.Deleted) {
    res.status(400).json({
      message: "Category already deleted",
    });

    return;
  }

  await CategoryPersistence.update(
    {
      status: CategoryStatus.Deleted,
    },
    {
      where: {
        id,
      },
    }
  );

  res.status(200).json({
    data: true,
  });
};
