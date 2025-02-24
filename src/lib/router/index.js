import { createRouter, createWebHistory } from 'vue-router'

import Tasks from '@/app/Tasks/App.vue'
import TaskCreate from '@/app/Tasks/create/App.vue'
import TaskEdit from '@/app/Tasks/edit/App.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Tasks',
      component: Tasks,
    },
    {
      path: '/create',
      name: 'TaskCreate',
      component: TaskCreate,
    },
    {
      path: '/edit/:id',
      name: 'TaskEdit',
      component: TaskEdit,
      props: (route) => ({
        id: route.params.id,
      }),
    },
  ],
})

export default router
