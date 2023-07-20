/**
 *
 */
import Axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios';

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('jwt');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}

const responseInterceptor = (response: AxiosResponse) => {
    if (response.data.statusCode > 201) {
        return Promise.reject(response);
    } else {
        return Promise.resolve(response);
    }
}

const backend = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

backend.interceptors.request.use(requestInterceptor);
backend.interceptors.response.use(responseInterceptor);

export default backend;
