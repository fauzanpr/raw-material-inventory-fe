import { TRawMaterials } from "./types/raw-material";

export const RawMaterialMapper = (data: TRawMaterials[]) => {
    return data?.map(_data => ({
        ..._data,
        categoryName: _data?.category?.name
    }))
}