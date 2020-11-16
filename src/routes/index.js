import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("@/views/home.vue"),
      meta: {
        title: "Home",
      },
    },
    {
      path: "/oauth",
      component: () => import("@/views/oauth.vue"),
      meta: {
        title: "OAuth",
      },
    },
    {
      path: "*",
      component: () => import("@/views/error.vue"),
      meta: {
        title: "Error",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  to.meta.title += " · ToDoList";
  next();
});

export default router;
