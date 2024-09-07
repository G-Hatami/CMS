/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory} from 'vue-router'
import LoginPage from "@/views/LoginPage.vue";
import Dashboard from "@/views/DashboardView.vue";
import FacultiesView from "@/views/FacultiesView.vue";
import TeachersView from "@/views/TeachersView.vue";
import StudentsView from "@/views/StudentsView.vue";
import CoursesView from "@/views/CoursesView.vue";


const routes = [{
  path: '/',
  name: 'login',
  component: LoginPage,
  meta: {hideNavBar: true},
},
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    // meta : {hideNavBar: false} ,
  },
  {
    path: '/faculties',
    name: 'faculties',
    component: FacultiesView
  },
  {
    path: '/teachers',
    name: 'teachers',
    component: TeachersView
  }, {
    path: '/courses',
    name: 'courses',
    component: CoursesView
  }, {
    path: '/students',
    name: 'students',
    component: StudentsView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('authenticated');
  if (to.name !== 'login' && !isAuthenticated) next({name: 'login'});
  else next();
});


export default router
