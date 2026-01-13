import { z } from 'zod';
import { ModelStatus } from '../../../share/model/base-model';

export const CategoryCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.string().optional(),
  description: z.string().optional(),
  parentId: z.uuid().nullable().optional(),
});

export type CategoryCreateDTO = z.infer<typeof CategoryCreateSchema>;

export const CategoryUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  image: z.string().optional(),
  description: z.string().max(255, 'Description is too long').optional(),
  parentId: z.uuid().nullable().optional(),
  status: z.enum(ModelStatus).optional(),
});

export type CategoryUpdateDTO = z.infer<typeof CategoryUpdateSchema>;

export const CategoryCondiDTOSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  parentId: z.uuid().optional(),
  status: z.enum(ModelStatus).optional(),
});

export type CategoryCondiDTO = z.infer<typeof CategoryCondiDTOSchema>;
