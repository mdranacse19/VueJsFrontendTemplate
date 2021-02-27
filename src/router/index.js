import { createRouter, createWebHistory, onBeforeRouteLeave } from 'vue-router'
import LoginComponent from '../views/LoginComponent.vue'
import Dashboard from '../components/Dashboard.vue'


const routes = [
  { path: '/', redirect:'/login' },
  { path: '/login', name: 'LoginComponent', component: LoginComponent },

  { path: '/dashboard', name: 'dashboard', component: Dashboard,
      beforeEnter(to, from, next) {
        // check vuex store //
        if (localStorage.getItem("token")) next()
        // back to safety route //
        else next({ name: "LoginComponent" });
      }
  },

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
