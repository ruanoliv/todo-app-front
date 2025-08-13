import axios from "axios"
import { GET_BASE_URL } from "../../constants/path"

export const Api = () => {
    const baseUrl = GET_BASE_URL()

    return axios.create({
        baseURL: baseUrl
    })
}