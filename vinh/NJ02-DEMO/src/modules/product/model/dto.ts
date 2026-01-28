import z from "zod";
import { ErrNameMustBeAtLeast2Characters, ErrPriceMustBePositive, ErrSalePriceMustBeNonnegative, ErrQuantityMustBeNonnegative, ErrBrandIdMustBeValidUUID, ErrCategoryIdMustBeValidUUID } from "./errors";

// Schema dùng để validate
export const ProductCreateSchema = z.object({
    name: z.string().min(2, ErrNameMustBeAtLeast2Characters),  // Bắt buộc
    price: z.number().positive(ErrPriceMustBePositive),         // Bắt buộc
    salePrice: z.number().nonnegative(ErrSalePriceMustBeNonnegative).default(0),
    quantity: z.number().int().nonnegative(ErrQuantityMustBeNonnegative).default(0),
    brandId: z.string().uuid(ErrBrandIdMustBeValidUUID),        // Bắt buộc
    categoryId: z.string().uuid(ErrCategoryIdMustBeValidUUID),  // Bắt buộc
    color: z.string().optional(),
    content: z.string().optional(),
    description: z.string().optional(),
});

// Type dùng cho TypeScript
export type ProductCreateDTO = z.infer<typeof ProductCreateSchema>;

export const ProductUpdateSchema = z.object({
    name: z.string().min(2, ErrNameMustBeAtLeast2Characters).optional(),
    price: z.number().positive(ErrPriceMustBePositive).optional(),
    salePrice: z.number().nonnegative(ErrSalePriceMustBeNonnegative).optional(),
    quantity: z.number().int().nonnegative(ErrQuantityMustBeNonnegative).optional(),
    brandId: z.string().uuid(ErrBrandIdMustBeValidUUID).optional(),
    categoryId: z.string().uuid(ErrCategoryIdMustBeValidUUID).optional(),
    content: z.string().optional(),
    description: z.string().optional(),
});

export type ProductUpdateDTO = z.infer<typeof ProductUpdateSchema>;

export const ProductConditionSchema = z.object({
    fromPrice: z.number().positive(ErrPriceMustBePositive).optional(),
    toPrice: z.number().positive(ErrPriceMustBePositive).optional(),
    brandId: z.string().uuid(ErrBrandIdMustBeValidUUID).optional(),
    categoryId: z.string().uuid(ErrCategoryIdMustBeValidUUID).optional(),
});

export type ProductConditionDTO = z.infer<typeof ProductConditionSchema>;