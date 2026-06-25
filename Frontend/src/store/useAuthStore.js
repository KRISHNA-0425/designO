import { create } from 'zustand'
import API from '../api/axios';
import { persist, createJSONStorage } from 'zustand/middleware'; // Fixed missing import

export const useAuthStore = create(
    persist((set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        token: null,


        // native functionalities ->

        // 1. register

        register: async (name, email, password) => {
            set({ isLoading: true })

            try {
                const res = await API.post('/auth/register', {
                    name,
                    email,
                    password
                })

                set({
                    user: res.data.user,
                    isAuthenticated: true,
                    isLoading: false,
                    token: res.data.token
                })
                return { success: true };

            } catch (err) {
                const errMsg = err.response?.data?.message || 'Registration failed ✕';
                set({ isLoading: false });
                console.log(errMsg)
                return { success: false };

            }
        },

        // 2. login
        login: async (email, password) => {
            set({ isLoading: true })
            try {
                const result = await API.post('/auth/login', {
                    email, password
                })
                set({
                    user: result.data.user,
                    isAuthenticated: true,
                    isLoading: false,
                    token: result.data.token
                })
                return { success: true };
            } catch (err) {
                const errMsg = err.response?.data?.message || 'login failed ✕';
                set({ isLoading: false });
                console.log(errMsg)
                return { success: false };
            }
        },

        //3. logout
        logout: async () => {
            set({ isLoading: true })
            try {
                await API.post('/auth/logout')
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error: null
                })
            } catch (err) {
                const errMsg = err.response?.data?.message || 'logout failed ✕';
                set({ isLoading: false });
                console.log(errMsg)
                return { success: false };
            }
        },

        //google auth 

        googleAuth: async (name, email) => {
            set({ isLoading: true })
            try {
                const result = await API.post("/auth/googleAuth", {
                    name,
                    email
                })
                set({
                    user: result.data.user,
                    isAuthenticated: true,
                    token: result.data.token,
                    isLoading: false
                })
                return { success: true }
            } catch (err) {
                const errMsg = err.response?.data?.message || 'googleAuth failed ✕';
                set({ isLoading: false });
                console.log(errMsg)
                return { success: false };
            }
        }

    }))
)


