/* eslint-disable @typescript-eslint/no-explicit-any */
import { APP_CONFIG } from "@/config/app-config";
import { APP_URL } from "@/data/url";
import axios, { CustomParamsSerializer, ParamsSerializerOptions, ResponseType } from "axios";

const getToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("access_token");
    }

    return process.env.NEXT_PUBLIC_TOKEN;
};

export const resetPermission = () => {
    localStorage.removeItem("access_token");
}


type TApiRequest = {
    urlKey: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    additionalHeaders?: Record<any, any>;
    data?: any;
    isWithAuthorization?: boolean;
    queryParams?: Record<string, string | number | undefined | null>;
    responseType?: ResponseType,
    paramsSerializer?: ParamsSerializerOptions | CustomParamsSerializer | undefined;
};

export const apiRequest = async <T>({
    urlKey,
    method,
    data,
    additionalHeaders,
    isWithAuthorization = true,
    queryParams,
    responseType = "json",
    paramsSerializer,
}: TApiRequest): Promise<T> => {
    const token = getToken();

    const forceLogout = () => {
        window.location.href = APP_URL.LOGIN;
        resetPermission();
    }

    const getDefaultHeader = () => ({
        // ...(isWithAuthorization && { Authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
        ...additionalHeaders
    });

    const instance = axios.create({
        baseURL: APP_CONFIG.apiUrl,
        method,
        headers: getDefaultHeader(),
        // withCredentials: true,
        responseType,
        paramsSerializer
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                forceLogout();
            }

            return Promise.reject(error);
        }
    );

    const response = await instance.request({
        url: urlKey,
        method,
        data,
        params: queryParams
    });

    return response.data;
};

