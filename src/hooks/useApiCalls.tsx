import { routing } from '@/types/web-routing';
interface FetchOptions extends RequestInit {
    headers?: HeadersInit;
}

export const fetchInstance = {
    defaultHeaders: (authToken : string) => {
        return {
            'Content-Type': 'application/json',
            'Authorization': authToken || ''
        }
    },

    get: async (url: string, options: FetchOptions = {}) => {
        try {
            return await fetch(url, { method: 'GET', headers: { ...options.headers }, ...options})
                .then(async response => {
                    if (!response.ok) {
                        throw new Error(response.status.toString());
                    }
                    return response.json();
                });
        } catch(error) {
            fetchInstance.checkErrors(error);
        }
    },

    post: async (url: string, body: any, options: FetchOptions = {}) => {
        try {
            return await fetch(url, { method: 'POST', body: JSON.stringify(body), headers: { ...options.headers }, ...options })
                .then(async response => {
                    if (!response.ok) {
                        throw new Error(response.status.toString());
                    }
                    return response.json();
                });
        } catch(error) {
            fetchInstance.checkErrors(error);
        }
    },

    put: async (url: string, body: any, options: FetchOptions = {}) => {
        try {
            return await fetch(url, { method: 'PUT', body: JSON.stringify(body), headers: { ...options.headers }, ...options })
                .then(async response => {
                    if (!response.ok) {
                        throw new Error(response.status.toString());
                    }
                    return response.json();
                });
        } catch(error) {
            fetchInstance.checkErrors(error);
        }
    },

    delete: async (url: string, options: FetchOptions = {}) => {
        try {
            return await fetch(url, { method: 'DELETE', headers: { ...options.headers }, ...options })
                .then(async response => {
                    if (!response.ok) {
                        throw new Error(response.status.toString());
                    }
                    return response.json();
                });
        } catch(error) {
            fetchInstance.checkErrors(error);
        }
    },

    checkErrors : (error: any) => {
        // un authorized
        if (error instanceof Error && error.message.includes('401')) {
            window.location.href = routing.home
        }
    }
};

export function addUrlPaginationParams (endpoint: string, currentPage: number, numItems: number) {
    const url        = new URL(endpoint);
    const pagination = url.searchParams;

    pagination.set('limit', String(numItems));
    pagination.set('page', String(currentPage));
    
    return url.toString();
}