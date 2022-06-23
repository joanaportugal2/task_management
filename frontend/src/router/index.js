import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import ResetPassword from "../views/ResetPassword.vue";
import Landing from "../views/Landing.vue";
import Profile from "../views/Profile.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/reset",
    name: "ResetPassword",
    component: ResetPassword,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/home",
    name: "Landing",
    component: Landing,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.getToken) {
    next({ name: "Home" });
  } else if (!to.meta.requiresAuth && store.getters.getToken) {
    next({ name: "Landing" });
  } else {
    next();
  }
});

export default router;
