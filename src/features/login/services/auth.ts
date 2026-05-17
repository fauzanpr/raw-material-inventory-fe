import { API_URL } from "@/data/url";
import { apiRequest } from "@/utils/api"

export const postAuth = (data: Record<any,any>): Promise<{ access_token: string; }> => {
    return apiRequest({
        method: "POST",
        urlKey: API_URL.AUTH.INDEX,
        data: data
    });
}