import axios from 'axios';

const api = axios.create({
    baseURL : '/ape',
    withCredentials : true
})


export default api;
