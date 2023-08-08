import { defineStore } from 'pinia';

import { connector } from '@/services/connector';

const user = JSON.parse(localStorage.getItem('user'));

export const useWidgetsReportStore = defineStore({
    id: 'reports_widgets',
    state: () => ({
        widgets: []
    }),
    actions: {
        async getWidgetsReport() {
            this.widgets = { loading: true };
            connector.get('/api/reports/widgets', {
                headers: {
                    Authorization: `Bearer ${user.access_token}` 
                  }
            })
                .then(response => this.widgets = response.data.data)
                .catch(error => this.widgets = { error })
        },
        
    },
    getters: {
        all(state) {
            return state.widgets;
        }
    }
});