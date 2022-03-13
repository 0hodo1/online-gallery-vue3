<template>
  <nav class="black">
    <li class="brand-logo">Hodo Online Gallery Admin</li>
    <ul class="right">
      <span v-if="adminBtn || yetkiliBtn">
        <li>
          <a class="waves-effect waves-red btn-flat navbar-btn red darken-3">
            Sergi
          </a>
          <a class="waves-effect waves-red btn-flat navbar-btn red darken-3">
            Resim
          </a>
        </li>
      </span>
      <span v-if="adminBtn">
        <li>
          <a class="waves-effect waves-red btn-flat navbar-btn red darken-3">
            Yöentim
          </a>
          <a class="waves-effect waves-red btn-flat navbar-btn red darken-3">
            Mesajlar
          </a>
        </li>
      </span>
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
import { onMounted, ref } from "vue";
import { authRef, firestoreRef } from "@/firebase/config";
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";

export default {
  setup() {
    const adminBtn = ref(false);
    const yetkiliBtn = ref(false);

    const router = useRouter();

    const handleLogout = async () => {
      await authRef.signOut().then(() => {
        router.push({ name: "GalleryList" });
      });
    };

    onMounted(async () => {
      const { user } = getUser();
      const userUID = user.value.uid;

      const snapshot = await firestoreRef
        .collection("users")
        .where("uid", "==", userUID)
        .get();

      snapshot.forEach((doc) => {
        if (doc.data().role == "admin") {
          adminBtn.value = true;
          yetkiliBtn.value = true;
        } else if (doc.data().role == "yetkili") {
          adminBtn.value = false;
          yetkiliBtn.value = true;
        } else {
          adminBtn.value = false;
          yetkiliBtn.value = false;
        }
      });
    });

    return { handleLogout, adminBtn, yetkiliBtn };
  },
};
</script>

<style></style>
