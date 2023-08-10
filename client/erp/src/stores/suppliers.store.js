import { defineStore } from 'pinia';

import { connector } from '@/services/connector';

const user = JSON.parse(localStorage.getItem('user'));

export const useSuppliersStore = defineStore({
    id: 'suppliers',
    state: () => ({
        suppliers: []
    }),
    actions: {
        async getAll() {
            this.suppliers = { loading: true };
            connector.get('/api/suppliers', {
                headers: {
                    Authorization: `Bearer ${user.access_token}` 
                }
            })
                .then(suppliers => this.suppliers = suppliers.data.data)
                .catch(error => this.suppliers = { error })
        }
    }
});