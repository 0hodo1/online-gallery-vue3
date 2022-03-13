<template>
  <nav class="black">
    <li class="brand-logo">Hodo Online Gallery Admin</li>
    <ul class="right">
      <li>
        <router-link
          :to="{ name: 'Profile' }"
          class="waves-effect waves-red btn-flat navbar-btn white"
        >
          Profil
        </router-link>
        <a
          :to="{ name: 'Profile' }"
          @click="handleLogout"
          class="waves-effect waves-light btn-small navbar-btn red darken-4"
        >
          Çıkış
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { authRef } from "@/firebase/config";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const handleLogout = async () => {
      await authRef.signOut().then(() => {
        router.push({ name: "GalleryList" });
      });
    };
    return { handleLogout };
  },
};
</script>

<style></style>
