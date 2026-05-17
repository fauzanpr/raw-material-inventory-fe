export type TRawMaterials = {
    id: number;
    code: string;
    name: string;
    stock: number;
    unit: string;
    description: string;
    category: Category;
    created_by: CreatedBy | null;
}

interface Category {
    id: number;
    name: string;
}

interface CreatedBy {
  id: number;
  name: string;
  email: string;
  password: string;
}