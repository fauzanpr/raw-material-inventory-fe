/* eslint-disable @typescript-eslint/no-explicit-any */

import { QUERY_KEYS } from "@/data/query-key";
import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteRawMaterial, getRawMaterial, postRawMaterial, putRawMaterial } from "../service/raw-material";
import { MutateFunctionType, MutationFunctionType, TPagination } from "@/types/request";
import { TRawMaterials } from "../types/raw-material";

export const useRawMaterialsQuery = (params?: Record<any,any>) => {
    return useQuery<TPagination<TRawMaterials[]>>({
        queryKey: [QUERY_KEYS.RAW_MATERIALS.INDEX, params],
        queryFn: () => getRawMaterial(params),
        retry: false,
        refetchOnWindowFocus: false,
        placeholderData: data => data
    });
}

export const useRawMaterialsMutation = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ method, data, id }: MutateFunctionType) => {
            if (method === "DELETE") return deleteRawMaterial(id || "");
            else if (method === "PUT") return putRawMaterial(id || "", data || {});
            
            return postRawMaterial(data || {});
        },
        onSuccess: onSuccess,
        onError: onError
    });
}