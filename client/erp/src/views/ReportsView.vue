<script setup>
//TODO place the table into separate component with props
import { storeToRefs } from 'pinia';
import { ref, onMounted, computed } from 'vue';
import { useWidgetsReportStore } from '../stores/widgets_report.store';
import { useSuppliersStore } from '../stores/suppliers.store';
import { useRoute } from 'vue-router'
import router from '../router';
import Typeahead from '../components/Typehead.vue'
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

const initialFilterValues = {
  page: 1, num_per_page: 10 
}
const route = useRoute()
router.push({ path: 'reports', query: initialFilterValues })
const page = ref(route.query.page || 1);
const num_per_page = ref(route.query.num_per_page || 10);
const previousDisabled = ref(parseInt(route.query.page) === 1 || route.query.page === undefined ? true : false);
const nextDisabled = ref(false);
const store = useWidgetsReportStore();
const suppliersStore = useSuppliersStore();
const supplier = ref(null)
const supplier_id = ref(null)


const { widgets, pagination, loading } = storeToRefs(store);

const { suppliers } = storeToRefs(suppliersStore);

const supplierProjection = (supplier) => (supplier ? supplier.name : '');

const previousPage = () => {
  nextDisabled.value = false;
  if (page.value > 1) {
    page.value--
    router.push({ path: 'reports', query: {page: page.value, num_per_page: num_per_page.value || 10, supplier_id: route.query.supplier_id } })
    
  }
  if (page.value === 1) {
    page.value = 1;
    router.push({ path: 'reports', query: {page: page.value, num_per_page: num_per_page.value || 10, supplier_id: route.query.supplier_id  } })
    previousDisabled.value = true
    
  }

  store.getWidgetsReport({page: page.value, num_per_page: route.query.num_per_page || 10, supplier_id: route.query.supplier_id});
}

const nextPage = () => {
  page.value++
  console.log(pagination.value.total_pages, route.query.page)
  if (pagination.value.total_pages === parseInt(page.value)) {
    nextDisabled.value = true;
  } else {
    nextDisabled.value = false;
  }
  router.push({ path: 'reports', query: { page: page.value, num_per_page: route.query.num_per_page || 10, supplier_id: route.query.supplier_id} })
  
  store.getWidgetsReport({page: page.value, num_per_page: route.query.num_per_page || 10, supplier_id: route.query.supplier_id});
  previousDisabled.value = false;

}

onMounted(async () => {
  await store.getWidgetsReport({ page: route.query.page || 1, num_per_page: 10 });
  await suppliersStore.getAll();
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

const schema = Yup.object().shape({
  supplier_id: Yup.string().optional('Supplier Id is required'),
});

function clearForm() {
  supplier_id.value = null;
  page.value = 1;
  router.push({ path: 'reports', query: initialFilterValues })
  store.getWidgetsReport({ page: 1, num_per_page: num_per_page.value })
}
function onSubmit() {
  if(supplier_id){
    page.value = 1;
    router.push({ path: 'reports', query: { supplier_id: supplier_id.value.id, page: 1, num_per_page: num_per_page.value } })
  }
  
  return store.getWidgetsReport({ supplier_id: supplier_id.value.id, page: undefined, num_per_page: num_per_page.value })
    .catch(error => setErrors({ apiError: error }));
}

</script>

<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">Filters</h5>
        </div>
        <div class="card-body">
          <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" class="row align-items-end">
            <div class="col-6">
              <label class="form-label">Supplier</label>
              <Typeahead name="supplier" v-validate="'required'" v-model="supplier_id" :items="suppliers"
                :itemProjection="supplierProjection" dropdownClass="dropdown flex-fill" @request:fired="spinner = true"
                @request:completed="spinner = false" @request:canceled="spinner = false">
                <template #item="slot">
                  <div v-html="slot.boldMatchText(slot.itemProjection(slot.item))"></div>
                </template>
              </Typeahead>
            </div>
            <div class="col-auto">
              <button class="btn btn-success" style="margin-right: 10px;">Search</button>
              <button class="btn btn-primary" @click="clearForm">Reset</button>
            </div>
            
          </Form>
        </div>
      </div>
    </div>
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
        <nav aria-label="..." class="mt-3 table-pagination" v-if="pagination.total_pages !==1">
          <ul class="pagination flex justify-content-end mr-1">
            <li class="page-item" :class="{ disabled: previousDisabled }">
              <a class="page-link" :class="{ disabled: previousDisabled }" href="#" @click="previousPage" tabindex="-1"
                :aria-disabled="previousDisabled" :disabled="previousDisabled">Previous</a>
            </li>
            <li class="page-item" :class="{ disabled: nextDisabled }">
              <a class="page-link" :class="{ disabled: nextDisabled }" @click="nextPage" href="#" :disabled="nextDisabled">Next</a>
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
}
</style>
