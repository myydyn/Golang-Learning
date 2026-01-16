import { z } from 'zod';
import { ModelStatus } from '../../../share/model/base-model';
import { ErrBrandNameTooShort } from './errors';

export const modelName = 'brand';

export const BrandSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, ErrBrandNameTooShort.message),
  image: z.string().optional(),
  description: z.string().optional(),
  tagLine: z.string().optional(),
  status: z.enum(ModelStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Brand = z.infer<typeof BrandSchema>;
