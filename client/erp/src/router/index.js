import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReportsView from '../views/ReportsView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/auth.store';
import AdminLayout from '/src/layouts/AdminLayout.vue';
import PublicLayout from '/src/layouts/PublicLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: AdminLayout,
      redirect: '/',
      children: [
        {
          path: '/',
          name: 'Home',
          component: HomeView
        }
      ]
    },
    {
      path: '/reports',
      name: 'Report',
      component: AdminLayout,
      redirect: '/reports',
      children: [
        {
          path: '/reports',
          name: 'About',
          component: ReportsView
        }
      ]
    },
    {
      path: '/login',
      name: 'SignIn',
      component: PublicLayout,
      redirect: '/login',
      children: [
        {
          path: '/login',
          name: 'Login',
          component: LoginView
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/examples'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return '/login';
  }
});

export default router
