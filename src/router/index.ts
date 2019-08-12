import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/main';

import about from './modules/about';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home.vue')
        }
      ],
    },
    about,
  ]
});
