import Vue from 'vue'
import VueRouter from 'vue-router'
import rt1 from "./rt1";
import rt2 from "./rt2";
import tr3 from './tr3'

Vue.use(VueRouter)

const baseRoutes = [];
const routes = baseRoutes.concat(rt1,rt2,tr3);

const router1 = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router1
