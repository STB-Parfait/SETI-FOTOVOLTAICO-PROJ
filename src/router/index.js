import { createRouter, createWebHistory } from 'vue-router'
import ProjectList from '../views/ProjectList.vue'
import ProjectCreate from '../views/ProjectCreate.vue'
import ProjectDetail from '../views/ProjectDetail.vue'

const routes = [
  {
    path: '/',
    name: 'ProjectList',
    component: ProjectList
  },
  {
    path: '/novo-projeto',
    name: 'ProjectCreate',
    component: ProjectCreate
  },
  {
    path: '/projeto/:id',
    name: 'ProjectDetail',
    component: ProjectDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
