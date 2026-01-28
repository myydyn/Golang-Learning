import { IBrandQueryRepository, ICategoryQueryRepository } from "@modules/product/interface";
import { ProductBrand, ProductBrandSchema, ProductCategory, ProductCategorySchema } from "@modules/product/model/product";
import axios from "axios";

export class RPCProductBrandRepository implements IBrandQueryRepository {
    constructor (private readonly baseUrl: string) {}
    
    async get(id: string): Promise<ProductBrand | null> {
        try {
            const {data} = await axios.get(`${this.baseUrl}/v1/brands/${id}`);
            
            const brand = ProductBrandSchema.parse(data.data);
            
            return brand;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export class RPCProductCategoryRepository implements ICategoryQueryRepository {
    constructor (private readonly baseUrl: string) {}
    
    async get(id: string): Promise<ProductCategory | null> {
        try {
            const {data} = await axios.get(`${this.baseUrl}/v1/categories/${id}`);
            
            const category = ProductCategorySchema.parse(data.data);
            
            return category;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

// Proxy pattern

export class ProxyProductBrandRepository implements IBrandQueryRepository {
    constructor(private readonly origin: IBrandQueryRepository) {}

    private cache: Record<string, ProductBrand> = {};
    
    async get(id: string): Promise<ProductBrand | null> {
        try {
            if (this.cache[id]) {
                return this.cache[id];
            }
            
            const brand = await this.origin.get(id);
            
            if (brand) {
                this.cache[id] = brand;
            }
            
            return brand;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export class ProxyProductCategoryRepository implements ICategoryQueryRepository {
    constructor(private readonly origin: ICategoryQueryRepository) {}
    
    private cache: Record<string, ProductCategory> = {};
    
    async get(id: string): Promise<ProductCategory | null> {
        try {
            if (this.cache[id]) {
                return this.cache[id];  
            }
            
            const category = await this.origin.get(id);
            
            if (category) {
                this.cache[id] = category;
            }
            
            return category;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}