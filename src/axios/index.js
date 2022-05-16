import axios from 'axios';
import apiUrl from '@/config/api-url';

export default axios.create({
    baseURL: apiUrl,
    withCredentials: true
});