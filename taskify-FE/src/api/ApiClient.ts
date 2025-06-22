import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class ApiClient {
    private readonly client: AxiosInstance;

    constructor(baseURL: string, defaultConfig?: AxiosRequestConfig) {
        this.client = axios.create({
            baseURL,
            headers: { "Content-Type": "application/json" },
            ...defaultConfig,
        });

        // Example interceptor: attach auth token if present
        this.client.interceptors.request.use(config => {
            const token = localStorage.getItem("authToken");
            if (token) config.headers!["Authorization"] = `Bearer ${token}`;
            return config;
        });

        // Example interceptor: global error handling
        this.client.interceptors.response.use(
            res => res,
            err => {
                console.error("API Error:", err);
                return Promise.reject(err);
            }
        );
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.get<T, AxiosResponse<T>>(url, config);
        return response.data;
    }

    async post<T, U = any>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T> {
        const r = await this.client.post<T, AxiosResponse<T>>(url, data, config);
        return r.data;
    }

    async put<T, U = any>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T> {
        const r = await this.client.put<T, AxiosResponse<T>>(url, data, config);
        return r.data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const r = await this.client.delete<T, AxiosResponse<T>>(url, config);
        return r.data;
    }

}

export const apiClient = new ApiClient("http://localhost:8080/api");
