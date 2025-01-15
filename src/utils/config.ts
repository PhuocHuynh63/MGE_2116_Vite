import axios from "axios";

// export const BASE_URL = "http://localhost:8080/api";
export const BASE_URL = 'http://14.225.212.121:8080/api' // IP của nhà Kumo


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