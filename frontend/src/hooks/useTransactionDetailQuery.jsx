import { API_ROUTES } from "constants";
import { useCustomQuery } from "./useCustomQuery";

export const useTransactionDetailQuery = ({ order }) => {
    // console.log("The order is", order)
    return useCustomQuery({
        url: `${API_ROUTES.transactions.getDetailed.endpoint}/${order?.id}`,
        key: `${API_ROUTES.transactions.getDetailed.key}-${order?.id}`,
        enabled: !!order,
        select: (data) => {
            return data.data;
        },
    })
}