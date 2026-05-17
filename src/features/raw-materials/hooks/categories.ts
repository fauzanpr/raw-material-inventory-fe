import { QUERY_KEYS } from "@/data/query-key";
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../service/categories";
import { TCategories } from "../types/categories";

export const useCategoriesQuery = () => {
    return useQuery<TCategories[]>({
        queryKey: [QUERY_KEYS.CATEGORIES.INDEX],
        queryFn: () => getCategories(),
        retry: false,
        refetchOnWindowFocus: false
    });
}