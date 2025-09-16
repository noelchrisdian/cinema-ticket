import axios, { type InternalAxiosRequestConfig } from 'axios';
import { getSession } from './utils';

export const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 3000
})

export const privateInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 3000,
})

privateInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const session = getSession();
    config.headers.Authorization = `Bearer ${session?.token}`;
    
    return config;
})