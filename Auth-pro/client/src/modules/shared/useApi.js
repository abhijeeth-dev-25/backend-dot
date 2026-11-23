import axios from 'axios';
import { useAuthContext } from '../auth/context/authProvider';

export default function useApi(){

    const { accessToken } = useAuthContext();

    const api = axios.create({
    baseURL : '/api',
    withCredentials : true
     })

    api.interceptors.request.use(config => {
        console.log(accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
    });

    return api;

}



