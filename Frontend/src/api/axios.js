import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true, // Kept active for cross-origin environmental compliance
});

// 🔥 AUTOMATIC ZUSTAND TOKEN EXTRACTOR & HEADER INJECTOR
API.interceptors.request.use(
    (config) => {
        // 1. Fetch your stringified Zustand state from local storage using your exact key 'desiging'
        const rawStore = localStorage.getItem('desiging');
        
        if (rawStore) {
            try {
                // 2. Parse the string wrapper into a readable JavaScript object
                const parsedStore = JSON.parse(rawStore);
                
                // 3. Drill down into the nested 'state' property to extract the token string
                const activeToken = parsedStore?.state?.token;
                
                if (activeToken) {
                    // 4. Inject it cleanly as a standard Bearer authorization token
                    config.headers.Authorization = `Bearer ${activeToken}`;
                }
            } catch (error) {
                console.error("Axios Interceptor Storage Parse Error:", error);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;