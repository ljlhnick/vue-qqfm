import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "../components/layout.vue";
import Category from "../components/category.vue";
import AblumDetail from "../components/ablumDetail.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Layout
  },
  {
    path: "/category",
    name: "Category",
    component: Category
  },
  {
    path: "/ablumDetail",
    component: AblumDetail
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
