import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'Create Project',
          path: 'project/create-project',
          component: () => import('@/views/dashboard/pages/CreateProject'),
        },
        // {
        //   name: 'Notifications',
        //   path: 'components/notifications',
        //   component: () => import('@/views/dashboard/component/Notifications'),
        // },
        // {
        //   name: 'Icons',
        //   path: 'components/icons',
        //   component: () => import('@/views/dashboard/component/Icons'),
        // },
        // {
        //   name: 'Typography',
        //   path: 'components/typography',
        //   component: () => import('@/views/dashboard/component/Typography'),
        // },
        // // Tables
        {
          name: 'View Project',
          path: 'project/view-project',
          component: () => import('@/views/dashboard/tables/ViewProject'),
        },
        {
          name: 'View Project Detail',
          path: 'project/view-project-detail',
          component: () => import('@/views/dashboard/tables/ProjectDetails'),
        },
        {
          name: 'Client view',
          path: 'project/client-view',
          component: () => import('@/views/dashboard/tables/ClientView.vue'),
        },
        {
          name: 'User view',
          path: 'project/user-view',
          component: () => import('@/views/dashboard/tables/UserView.vue'),
        },
        {
          name: 'Material view',
          path: 'project/material-view',
          component: () => import('@/views/dashboard/tables/Material.vue'),
        },
        {
          name: 'Supplier view',
          path: 'project/supplier-view',
          component: () => import('@/views/dashboard/tables/Supplier.vue'),
        },
        // // Maps
        // {
        //   name: 'Google Maps',
        //   path: 'maps/google-maps',
        //   component: () => import('@/views/dashboard/maps/GoogleMaps'),
        // },
        // // Upgrade
        // {
        //   name: 'Upgrade',
        //   path: 'upgrade',
        //   component: () => import('@/views/dashboard/Upgrade'),
        // },
      ],
    },
  ],
})
