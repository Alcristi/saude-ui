import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as null | { email: string; name?: string },
        token: (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') !== 'null') ? localStorage.getItem('token') : '',
        isLoading: false,
        error: null as null | string,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async login(email: string, password: string) {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await api.post('/autenticacao/login', { email, password });

                // Assuming response.data contains the token and user info
                // Adjust based on actual API response structure
                this.token = response.data.accessToken;
                this.user = response.data.user;

                if (this.token && typeof this.token === 'string' && this.token !== 'undefined' && this.token !== 'null') {
                    localStorage.setItem('token', this.token);
                    api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                }
            } catch (err: any) {
                if (err.response && err.response.data && err.response.data.message) {
                    this.error = err.response.data.message;
                } else {
                    this.error = err.message || 'Falha na autenticação';
                }
                throw err;
            } finally {
                this.isLoading = false;
            }
        },

        async checkAuth() {
            if (!this.token) return false;

            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                const response = await api.get('/autenticacao/profile');
                this.user = response.data;
                return true;
            } catch (error) {
                console.error('Sessão inválida', error);
                this.logout();
                return false;
            }
        },

        logout() {
            this.token = '';
            this.user = null;
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
        }
    }
});
