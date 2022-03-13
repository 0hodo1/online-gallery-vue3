import { createRouter, createWebHistory } from "vue-router";
import { authRef } from "@/firebase/config";
import HomeView from "../views/HomeView.vue";
import GalleryList from "../views/home/GalleryList.vue";
import Admin from "../views/admin/Admin.vue";
import Profile from "../views/admin/Profile.vue";

const authControl = (to, form, next) => {
  let user = authRef.currentUser;

  if (!user) {
    next({ name: "GalleryList" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "/gallery-list",
        name: "GalleryList",
        component: GalleryList,
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [
      {
        path: "/profile",
        name: "Profile",
        component: Profile,
      },
    ],
    beforeEnter: authControl,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
