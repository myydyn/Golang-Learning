// import { IBrandUseCase } from "../interface";
// import { Brand } from "../model/brand";
// import { BrandConditionDTO, BrandCreateDTO, BrandCreateDTOSchema, BrandUpdateDTO, BrandUpdateDTOSchema } from "../model/dto";
// import { IRepository } from "../../../share/interface";
// import { PagingDTO } from "../../../share/model/paging";

// export class BrandUseCase implements IBrandUseCase {
    
//     constructor(private readonly repository: IRepository<Brand, BrandConditionDTO, BrandUpdateDTO>) {}

//     async create(data: BrandCreateDTO): Promise<string> {
//         return "";
//     }
//     getDetail(id: string): Promise<Brand | null> {
//         return this.repository.get(id);
//     }
//     list(cond: BrandConditionDTO, paging: PagingDTO): Promise<Brand[] | null> {
//         return this.repository.list(cond, paging);
//     }
//     update(id: string, data: BrandUpdateDTO): Promise<boolean> {
//         const { success, data: parsedData, error } = BrandUpdateDTOSchema.safeParse(data);
        
//         if (!success) {
//             throw error;
//         }
        
//         return this.repository.update(id, parsedData);
//     }
//     delete(id: string): Promise<boolean> {
//         return this.repository.delete(id, false);
//     }
// }
