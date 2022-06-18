import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from '../views/SignInView.vue'
import ViewTableView from '../views/ViewTableView.vue'
import AddTableView from '../views/AddTableView.vue'
import EditTableView from '../views/EditTableView.vue'
import RemoveTableView from '../views/RemoveTableView.vue'

import ViewMenuView from '../views/menu/ViewMenuView.vue'
import AddMenuView from '../views/menu/AddMenuView.vue'
import EditMenuView from '../views/menu/EditMenuView.vue'
import RemoveMenuView from '../views/menu/RemoveMenuView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignInView
    },
    {
      path: '/tables',
      name: 'ViewTables',
      component: ViewTableView
    },
    {
      path: '/add-table',
      name: 'AddTable',
      component: AddTableView
    },
    {
      path: '/edit-table',
      name: "EditTable",
      component: EditTableView
    },
    {
      path: '/remove-table',
      name: "RemoveTable",
      component: RemoveTableView
    },
    {
      path: '/menu',
      name: 'ViewMenu',
      component: ViewMenuView
    },
    {
      path: '/add-menu',
      name: 'AddMenu',
      component: AddMenuView
    },
    {
      path: '/edit-menu',
      name: "EditMenu",
      component: EditMenuView
    },
    {
      path: '/remove-menu',
      name: "RemoveMenu",
      component: RemoveMenuView
    }
  ]
})

export default router
