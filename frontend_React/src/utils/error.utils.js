import { isAxiosError } from "axios"

export const getErrorMessage = (error) => {
    if (isAxiosError(error)) {
        return error.response.data.message
    }
    else {
        return error.message
    }
}