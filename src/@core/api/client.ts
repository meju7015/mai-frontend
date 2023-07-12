/**
 *
 */
import Axios, {AxiosResponse} from 'axios';

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

backend.interceptors.response.use(responseInterceptor);

export default backend;
