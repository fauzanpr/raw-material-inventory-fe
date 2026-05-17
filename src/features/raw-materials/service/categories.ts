import { API_URL } from "@/data/url";
import { apiRequest } from "@/utils/api"
import { TCategories } from "../types/categories";

export const getCategories = (): Promise<TCategories[]> => {
    return apiRequest({
        method: "GET",
        urlKey: API_URL.CATEGORIES.INDEX,
    });
}