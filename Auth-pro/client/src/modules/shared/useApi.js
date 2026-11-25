import axios from 'axios';
import { useAuthContext } from '../auth/context/authProvider';

let refreshPromise = null;

function refreshAccessToken() {
    if (!refreshPromise) {
        refreshPromise = axios
            .post('/api/user/refresh', {}, { withCredentials: true })
            .finally(() => {
                refreshPromise = null;
            });
    }
    return refreshPromise;
}

export default function useApi(){

    const { accessToken, setAccessToken } = useAuthContext();

    const api = axios.create({
        baseURL: '/api',
        withCredentials: true
    });

    api.interceptors.request.use(config => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    });

    api.interceptors.response.use(
        response => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const res = await refreshAccessToken();
                    const newAccessToken = res.data?.data?.accessToken;

                    setAccessToken(newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return axios(originalRequest);
                } catch (err) {
                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        }
    );

    return api;
}



