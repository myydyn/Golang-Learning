import { z } from 'zod';
import { CategoryStatus } from './model';

export const CategoryCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.string().optional(),
  description: z.string().optional(),
  parentId: z.string().uuid().nullable().optional(),
});

export type CategoryCreateDTO = z.infer<typeof CategoryCreateSchema>;

export const categoryUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  image: z.string().optional(),
  description: z.string().max(255, 'Description is too long').optional(),
  parentId: z.string().uuid().nullable().optional(),
  status: z.nativeEnum(CategoryStatus).optional(),
});

export type CategoryUpdateDTO = z.infer<typeof categoryUpdateSchema>;
