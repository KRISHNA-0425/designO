import { create } from 'zustand'
import API from '../api/axios';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            // --- STATE PROPERTIES ---
            user: null,
            token: null, // Cleaned up the duplicate declaration
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // --- NATIVE FUNCTIONALITIES ---

            // 1. REGISTER
            register: async (name, email, password) => {
                set({ isLoading: true, error: null })
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
                    set({ isLoading: false, error: errMsg });
                    return { success: false };
                }
            },

            // 2. LOGIN
            login: async (email, password) => {
                set({ isLoading: true, error: null })
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
                    const errMsg = err.response?.data?.message || 'Login failed ✕';
                    set({ isLoading: false, error: errMsg });
                    return { success: false };
                }
            },

            // 3. LOGOUT
            logout: async () => {
                set({ isLoading: true })
                try {
                    await API.post('/auth/logout')
                } catch (err) {
                    const errMsg = err.response?.data?.message || 'Logout failed ✕';
                } finally {
                    // Always reset local state fields safely
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: null
                    })
                }
            },

            // 4. GOOGLE AUTH
            googleAuth: async (name, email) => {
                set({ isLoading: true, error: null })
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
                    const errMsg = err.response?.data?.message || 'Google Auth failed ✕';
                    set({ isLoading: false, error: errMsg });
                    return { success: false };
                }
            }
        }), 
        {
            name: 'desiging', // The key tag used to read/write to your disk
            storage: createJSONStorage(() => localStorage),
            // Selectively keeps error banners and spinners out of local storage cache
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
)