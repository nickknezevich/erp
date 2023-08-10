<script setup>
//TODO place the table into separate component with props
import { storeToRefs } from 'pinia';
import { ref, onMounted, computed } from 'vue';
import { useWidgetsReportStore } from '../stores/widgets_report.store';
import { useRoute } from 'vue-router'
import router from '../router';
const route = useRoute()
const page = ref(route.query.page || 0);
const num_per_page = ref(route.query.num_per_page || 10);

const previousDisabled = ref(parseInt(route.query.page) === 0 || route.query.page === undefined ? true : false);
const nextDisabled = ref(false);
const store = useWidgetsReportStore();

const { widgets, pagination, loading } = storeToRefs(store);

const previousPage = () => {
  nextDisabled.value = false;
  if (page.value > 0) {
    page.value--
    router.push({ path: 'reports', query: { page: page.value } })
    store.getWidgetsReport(page.value, num_per_page.value);
  }
  if (page.value === 0) {
    page.value = 0;
    router.push({ path: 'reports', query: { page: undefined } })
    previousDisabled.value = true
    store.getWidgetsReport(page.value, num_per_page.value);
  }
}


const nextPage = () => {

  page.value++
  if (pagination.value.total_pages === parseInt(page.value)) {
    nextDisabled.value = true;
  } else {
    nextDisabled.value = false;
  }

  router.push({ path: 'reports', query: { page: page.value } })
  store.getWidgetsReport(page.value, num_per_page.value);
  previousDisabled.value = false;

}

onMounted(async () => {
  await store.getWidgetsReport(route.query.page || 0, 10);
});

const fields = [
  { key: 'pid', label: 'PID', sortable: true },
  { key: 'product_name', label: 'Product Name', sortable: true },
  { key: 'customer_name', label: 'Customer Name', sortable: true },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'supplier_name', label: 'Supplier Name', sortable: true },
  { key: 'cost', label: 'Cost', sortable: true },
  { key: 'warehouse_name', label: 'Warehouse', sortable: true },
  { key: 'qty', label: 'QTY', sortable: true },
  { key: 'min_qty', label: 'Min QTY', sortable: true }
];

</script>

<template>
  <div class="row">
    <div class="col-12 col-lg-12 col-xxl-12 d-flex">
      <div class="card flex-fill">
        <div class="card-header">
          <h5 class="card-title mb-0">Widgets</h5>
        </div>
        <table class="table table-hover my-0" v-if="!loading">
          <thead>
            <tr>
              <th>PID</th>
              <th class="d-none d-xl-table-cell">Product Name</th>
              <th class="d-xl-table-cell">Customer Name</th>
              <th class="d-md-table-cell">Price</th>
              <th class="d-md-table-cell">Supplier Name</th>
              <th class="d-md-table-cell">Cost</th>
              <th class="d-md-table-cell">Warehouse Name</th>
              <th class="d-md-table-cell">Qty</th>
              <th class="d-md-table-cell">Min Qty</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(widget, index) in widgets" :key="index">
              <td class="d-xl-table-cell">{{ widget.pid }}</td>
              <td class="d-xl-table-cell">{{ widget.product_name }}</td>
              <td class="d-xl-table-cell">{{ widget.customer_name }}</td>
              <td class="d-xl-table-cell">{{ widget.price }}</td>
              <td class="d-xl-table-cell">{{ widget.supplier_name }}</td>
              <td class="d-xl-table-cell">{{ widget.cost }}</td>
              <td class="d-xl-table-cell">{{ widget.warehouse_name }}</td>
              <td class="d-xl-table-cell">{{ widget.qty }}</td>
              <td class="d-xl-table-cell">{{ widget.min_qty }}</td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="..." class="mt-3 table-pagination">
          <ul class="pagination flex justify-content-end mr-1">
            <li class="page-item" :class="{ disabled: previousDisabled }">
              <a class="page-link" :class="{ disabled: previousDisabled }" href="#" @click="previousPage" tabindex="-1"
                aria-disabled="true">Previous</a>
            </li>
            <li class="page-item" :class="{ disabled: nextDisabled }">
              <a class="page-link" :class="{ disabled: nextDisabled }" @click="nextPage" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style>
.table-pagination {
  margin-right: 15px;
}

ul.pagination {
  float: right;
}

.page-item {
  display: inline-block;
  margin: 0 2px;
  /* Adjust spacing between pagination items */
}

.page-link {
  padding: 0.5rem 0.75rem;
  /* Adjust padding for a more comfortable click area */
  border-radius: 0.25rem;
  /* Rounded corners */
}

.page-link:hover {
  background-color: #f8f9fa;
  /* Hover background color */
}

.page-item.disabled .page-link {
  color: #6c757d;
  /* Disabled text color */
  background-color: #fff;
  /* Disabled background color */
  border-color: #dee2e6;
  /* Disabled border color */
}

.page-item.active .page-link {
  z-index: 1;
  color: #fff;
  /* Active text color */
  background-color: #007bff;
  /* Active background color */
  border-color: #007bff;
  /* Active border color */
}</style>
