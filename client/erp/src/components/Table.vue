<template>
    
    <table class="table table-hover my-0">
      <thead>
        <tr>
          <template v-for="{ key, label, sortable } in fields" :key="key">
            <th v-if="sortable" @click="setSort(key)" class="sortable">
              {{ label }}
              <template v-if="sortBy === key">
                <span v-if="sortDesc === true">↑</span>
                <span v-else-if="sortDesc === false">↓</span>
              </template>
            </th>
            <th v-else>
              {{ label }}
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedItems" :key="item.uuid">
          <td v-for="{ key } in fields" :key="key">
            <slot :name="`cell(${key})`" :value="item[key]" :item="item">
              {{ item[key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="text-align: right" class="mt-2">
      <button
        :disabled="pagination.currentPage <= 1"
        @click="pagination.currentPage--"
      >
        Prev Page
      </button>
      Page {{ pagination.currentPage }} of {{ pagination.totalPages }}
      <button
        :disabled="pagination.currentPage >= pagination.totalPages"
        @click="pagination.currentPage++"
      >
        Next Page
      </button>
    </div>
  </template>
  
  <script setup>
  import { computed, reactive, watch, ref } from 'vue';
//   import { sort } from 'fast-sort'
  
  const props = defineProps({
    items: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
  });
  
  const pagination = reactive({
    currentPage: 1,
    perPage: 200,
    totalPages: computed(() =>
      Math.ceil(props.items.length / pagination.perPage)
    ),
  });
  
  const sortBy = ref(null);
  const sortDesc = ref(null);
  
  const sortedItems = computed(() => {
    const { items } = props;
    if (sortDesc.value === null) return items;
  
    if (sortDesc.value) {
      return sort(items).desc(sortBy.value);
    } else {
      return sort(items).asc(sortBy.value);
    }
  });
  
  const setSort = (key) => {
    if (sortBy.value === key) {
      if (sortDesc.value === true) sortDesc.value = null;
      else if (sortDesc.value === false) sortDesc.value = true;
      else sortDesc.value = false;
    } else {
      sortBy.value = key;
      sortDesc.value = false;
    }
  };
  
  const paginatedItems = computed(() => {
    const { currentPage, perPage } = pagination;
    const start = (currentPage - 1) * perPage;
    const stop = start + perPage;
  
    return sortedItems.value.slice(start, stop);
  });
  
  watch(
    () => pagination.totalPages,
    () => (pagination.currentPage = 1)
  );
  </script>
  
  <style>
  .table {
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
  }
  
  .table > thead > tr {
    border-bottom: 1px solid black;
  }
  
  .table > tbody > tr:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.2);
  }
  
  .table > tbody > tr > td {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  
  th.sortable {
    cursor: pointer;
  }
  </style>
  