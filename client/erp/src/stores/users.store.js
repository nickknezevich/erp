import { defineStore } from 'pinia';

import { connector } from '@/services';

const user = localStorage.getItem('user');

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {}
    }),
    actions: {
        async getAll() {
            this.users = { loading: true };
            connector.get('/api/users', {
                headers: {
                    Authorization: `Bearer ${user.access_token}` 
                  }
            })
                .then(users => this.users = users)
                .catch(error => this.users = { error })
        }
    }
});