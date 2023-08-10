import { defineStore } from 'pinia';

import { connector } from '@/services/connector';

const user = JSON.parse(localStorage.getItem('user'));

const filterParams = {
    page: undefined,
    num_per_page: undefined,
    supplier_id: undefined
}

export const useWidgetsReportStore = defineStore({
    id: 'reports_widgets',
    state: () => ({
        widgets: [],
        pagination: {
            total: 0,
            page: 0,
            total_pages: 0
        }
    }),
    actions: {
        async getWidgetsReport(filterParams) {
            this.widgets = { loading: true };
            connector.get('/api/reports/widgets',{
                params: filterParams,
                headers: {
                    Authorization: `Bearer ${user.access_token}` 
                  }
            })
                .then(response => {
                    this.widgets = response.data.data
                    this.pagination = response.data.pagination
                    })
                .catch(error => this.widgets = { error })
        },
        
    },
    getters: {
        all(state) {
            return state.widgets;
        }
    }
});