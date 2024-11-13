import Vue from 'vue'
import Router from 'vue-router'
import Catalog from "./views/Catalog";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/lentes-de-contato',
      name: 'lentes-de-contato',
      component: Catalog
    }
  ]
})
