import { API_ROUTES } from "constants";
import { useCustomQuery } from "./useCustomQuery";

// fetch all products
export const useAllProductsQuery = () => {
    return useCustomQuery(
        {
            key: API_ROUTES.products.get.key,
            url: API_ROUTES.products.get.endpoint,
            select: (data) => data.data.products,
            staleTime: 100
        }
    )
};
