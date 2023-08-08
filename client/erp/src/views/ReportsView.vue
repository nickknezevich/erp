<script setup>
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import { useWidgetsReportStore } from '../stores/widgets_report.store';

const store = useWidgetsReportStore();

onMounted(async () => {
    await store.getWidgetsReport();
});

const { widgets, loading } = storeToRefs(store);

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
      </div>
    </div>

  </div>
</template>
