import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Wants from "@/views/Wants.vue";
import MongoAPI from "@/components/MongoAPI.vue";
import ImportCSV from "@/components/ImportCSV.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/wants",
    name: "Wants",
    component: Wants,
  },
  {
    path: "/api",
    name: "API",
    component: MongoAPI,
  },
  {
    path: "/import",
    name: "Import",
    component: ImportCSV,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
