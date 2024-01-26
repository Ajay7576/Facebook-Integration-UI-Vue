import HelloWorldVue from "@/components/HelloWorld.vue";

import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorldVue,
    },

    {
      path: "/callback",
      name: "PostView",
      component: () => import("@/components/PostView.vue"),
    },
  ],
});

export default router;
