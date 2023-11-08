

import { useQuery } from "react-query";
import { useAxios } from "./useAxios";


export const useCustomQuery = ({ key, onSuccess, url, enabled = true, ...options }) => {
    const request = useAxios()
    const query = useQuery(
        [key],
        () => request({ url: `${url}`, method: "GET" }),
        {
            refetchOnWindowFocus: false,
            enabled,
            retry: 0,
            onSuccess: (data) => {
                onSuccess && onSuccess(data)
            },
            ...options
        })
    // console.log('The retuerned query', query)
    return query
}