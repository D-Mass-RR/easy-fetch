import axios from "axios"

const createApiClient = (
    baseURL: string,
    options: Record<string, any> = {},
) => {
    return axios.create({
        baseURL,
        timeout: 10000,
        ...options,
    })
}

export default createApiClient
