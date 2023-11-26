import axios from "axios";
import configuration from "configuration";
import { useGlobalContext } from "./useGlobalContext";
import { useEffect } from "react";

const API_BASE_URL = configuration.apiUrl;

const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        // "Content-Type": "application/json",
        platform: "Taste-Of-India-PWA",
    },
})

export const useAxios = () => {

    const { tokens } = useGlobalContext();

    useEffect(() => {
        if (tokens) {
            client.defaults.headers.common.Authorization = `Bearer ${tokens?.accessToken}`
        }

        return () => { }
    }, [tokens])
    // console.log("THe tokens in useAxios are", tokens)

    // client.defaults.headers.common.Authorization = `Bearer ${tokens?.accessToken}`

    function axiosRequest(options, onError, localSuccessHandlingFunction, localErrorHandlingFunction,) {

        const onSuccess = (response) => {
            localSuccessHandlingFunction && localSuccessHandlingFunction();
            return response
        }

        const onLocalError = (err) => {
            // TODO :- ADD GLOBAL ERROR HANDLING
            console.log("Global Error Handling", err)
            throw err
            localErrorHandlingFunction && localErrorHandlingFunction();
        }

        return client(options).then(onSuccess).catch(onLocalError).finally();


    }
    function start(options, onError, localSuccessHandlingFunction, localErrorHandlingFunction) {
        return axiosRequest(options, onError, localSuccessHandlingFunction, localErrorHandlingFunction);
    }
    return (options) => start(options, options.onError, options.localSuccessHandlingFunction, options.localErrorHandlingFunction);

}

export const request = (options) => {

    client.defaults.headers.common.Authorization = `Bearer ${options.token}`

    const onSuccess = (response) => {
        // localSuccessHandlingFunction && localSuccessHandlingFunction();
        return response
    }

    const onLocalError = () => {
        // onError();
        // localErrorHandlingFunction && localErrorHandlingFunction();
    }

    return client(options).then(onSuccess).catch(onLocalError).finally();

}