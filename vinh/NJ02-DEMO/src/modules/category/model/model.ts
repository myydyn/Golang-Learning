import { z } from 'zod';
import { ModelStatus } from '../../../share/model/base-model';

export enum CategoryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
}

// Business object/model/entity
export const CategorySchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Name is required'),
  image: z.string().optional(),
  description: z.string().optional(),
  position: z.number().min(0, 'Position must be non-negative').default(0),
  parentId: z.uuid().nullable().optional(),
  status: z.enum(ModelStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Category = z.infer<typeof CategorySchema>;