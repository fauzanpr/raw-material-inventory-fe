export type TRawMaterials = {
    id: number;
    code: string;
    name: string;
    stock: number;
    unit: string;
    description: string;
    category: Category;
    created_by: null;
}

interface Category {
    id: number;
    name: string;
}