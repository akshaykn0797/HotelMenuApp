import { useMutation, useQueryClient } from "react-query";
// Axios Request
import { useAxios } from "./useAxios";


export const useCustomMutation = ({ key, url, select, method = "POST", withCredentials = false, formData = false, invalidateQueries, ...options }) => {
    const request = useAxios()
    const queryClient = useQueryClient()
    return useMutation(
        [key],
        (data) => request({ url, method, data, withCredentials, formData }),
        {
            select: (data) => {
                if (select) {
                    return select(data)
                }
                else {
                    return data
                }
            },
            onSuccess: () => queryClient.invalidateQueries([invalidateQueries]),
            ...options
        }
    )
}
