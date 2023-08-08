<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth.store';
import { storeToRefs } from 'pinia';
import MainSidebar from './components/MainSidebar.vue';
import MainNavbar from './components/MainNavbar.vue'

const authStore = useAuthStore();

const { isAuthenticated } = authStore;
console.log("IS_AUTHENTICATED", isAuthenticated)
if (authStore.isAuthenticated === true) {
  const { user } = authStore.user;
}


const user = authStore.user

const logout = () => {
  authStore.logout();
}
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
