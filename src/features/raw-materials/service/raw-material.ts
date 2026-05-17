/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/data/url";
import { apiRequest } from "@/utils/api"
import { TRawMaterials } from "../types/raw-material";
import { TPagination } from "@/types/request";

export const getRawMaterial = (params?: Record<any, any>): Promise<TPagination<TRawMaterials[]>> => {
    return apiRequest({
        method: "GET",
        urlKey: API_URL.RAW_MATERIAL.INDEX,
        queryParams: params
    });
}

export const postRawMaterial = (data: Record<any, any>) => {
    return apiRequest({
        method: "POST",
        urlKey: API_URL.RAW_MATERIAL.INDEX,
        data: data
    });
}

export const putRawMaterial = (id: string, data: Record<any, any>) => {
    return apiRequest({
        method: "PUT",
        urlKey: API_URL.RAW_MATERIAL.DETAIL.replace(":id", id),
        data: data
    });
}

export const deleteRawMaterial = (id: string) => {
    return apiRequest({
        method: "DELETE",
        urlKey: API_URL.RAW_MATERIAL.DETAIL.replace(":id", id),
    });
}