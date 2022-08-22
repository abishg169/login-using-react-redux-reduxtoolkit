import { Auth, AuthRequest, Category, SubCategory } from "../models";

export class CoreDataMapper {
    static mapToCategories (response: any): Category[] {
        console.log('start mapping', response);
        const categories: Category[] = []
        response.forEach((data: any) => {
            const category: Category = this.mapToCategory(data)
            categories.push(category)
        })
        console.log('mapped data is', categories)
        return categories;
    }
    static mapToCategory (response: any): Category {
        console.log('start mapping', response);
        const obj: Category = {
            id: response.id,
            name: response.name
        }
        console.log('mapped data is', obj)
        return obj;
    }
    static mapToSubCategories (response: any): SubCategory[] {
        console.log('start mapping', response);
        const list: SubCategory[] = []
        response.forEach((data: any) => {
            const obj: SubCategory = this.mapToSubCategory(data)
            list.push(obj)
        })
        console.log('mapped data is', list)
        return list;
    }
    static mapToSubCategory (response: any): SubCategory {
        console.log('start mapping', response);
        const obj: SubCategory = {
            id: response.id,
            name: response.name,
            category: response.category
        }
        console.log('mapped data is', obj)
        return obj;
    }
}
