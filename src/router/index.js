import { createRouter, createWebHistory } from "vue-router";
import { authRef } from "@/firebase/config";
import HomeView from "../views/HomeView.vue";
import GalleryList from "../views/home/GalleryList.vue";
import Admin from "../views/admin/Admin.vue";
import Profile from "../views/admin/Profile.vue";
import Messages from "../views/admin/Messages.vue";
import Managment from "../views/admin/Managment.vue";
import CreateGallery from "../views/admin/CreateGallery.vue";
import AddPhoto from "../views/admin/AddPhoto.vue";

import getYetki from "@/composables/getYetki";

const authControl = (to, form, next) => {
  let user = authRef.currentUser;
  if (!user) {
    next({ name: "GalleryList" });
  } else {
    next();
  }
};

const adminControl = async (to, form, next) => {
  let user = authRef.currentUser;
  const { yetki } = getYetki(user.uid);
  if (yetki.value != "admin") {
    next({ name: "Profile" });
  } else {
    next();
  }
};

const yetkiliControl = async (to, form, next) => {
  let user = authRef.currentUser;
  const { yetki } = getYetki(user.uid);

  if (yetki.value == "admin" || yetki.value == "yetkili") {
    next();
  } else {
    next({ name: "Profile" });
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
      {
        path: "/messages",
        name: "Messages",
        component: Messages,
        beforeEnter: adminControl,
      },
      {
        path: "/managment",
        name: "Managment",
        component: Managment,
        beforeEnter: adminControl,
      },
      {
        path: "/create-gallery",
        name: "CreateGallery",
        component: CreateGallery,
        beforeEnter: yetkiliControl,
      },
      {
        path: "/add-photo",
        name: "AddPhoto",
        component: AddPhoto,
        beforeEnter: yetkiliControl,
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
