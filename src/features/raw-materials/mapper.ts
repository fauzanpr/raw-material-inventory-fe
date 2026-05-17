import { TRawMaterials } from "./types/raw-material";

export const RawMaterialMapper = (data: TRawMaterials[]) => {
    return data?.map(_data => ({
        ..._data,
        categoryName: _data?.category?.name,
        created_by_data: !!_data?.created_by?.name ? _data?.created_by?.name : "-",
        description: !!_data?.description ? _data.description : "-"
    }))
}