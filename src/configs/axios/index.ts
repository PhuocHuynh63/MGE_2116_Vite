
import axios, { AxiosError } from 'axios';
import { CookiesService } from '../../utils/helpers/cookie';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Interceptors cho axiosPrivate
axiosPrivate.interceptors.request.use(
    (config) => {
        const token = CookiesService.get();

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosPrivate.interceptors.response.use(
    (response: any) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Xử lý khi bị unauthorized
            console.error('Unauthorized! Redirecting to login...');
        }
        return Promise.reject(error);
    },
);

// Xử lý lỗi toàn cục
const handleError = (error: AxiosError) => {
    if (error.response) {
        console.error('Server Error:', error.response.data);
    } else if (error.request) {
        console.error('No Response:', error.request);
    } else {
        console.error('Error:', error.message);
    }
    return Promise.reject(error);
};

axiosClient.interceptors.response.use((response) => response, handleError);

export { axiosClient };