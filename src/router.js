import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';

const Atlas = () => import('@/components/Atlas.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/location/:latitude,:longitude/:title?',
      name: 'location',
      component: Home,
      props: true,
    },
    {
      path: '/atlas',
      name: 'atlas',
      component: Atlas,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
