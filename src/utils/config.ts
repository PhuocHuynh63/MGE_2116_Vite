import axios from "axios";

// export const BASE_URL = "http://localhost:8080/api";
export const BASE_URL = 'http://14.225.192.51:8080/api'


export const configHeader = () => {
    return {
        // Authorization: "Bearer " + localService.get()?.accessToken,
        // ? là optional chaining
    }
}

export const https = axios.create({
    baseURL: BASE_URL,
    headers: configHeader(),
})