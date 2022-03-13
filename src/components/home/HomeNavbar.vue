<template>
  <nav class="deep-purple lighten-3">
    <div>
      <router-link :to="{ name: 'GalleryList' }" class="brand-logo"
        >Hodo Gallery</router-link
      >
      <ul class="right">
        <li>
          <a class="btn-flat waves-effect waves-light" @click="handleLogin">
            <i class="fab fa-google-plus-g"></i>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { firebase, authRef, firestoreRef } from "@/firebase/config";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const handleLogin = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      await authRef.signInWithPopup(provider).then(async () => {
        const { uid, email, displayName, photoURL } = authRef.currentUser;

        const snapshot = await firestoreRef
          .collection("users")
          .where("uid", "==", uid)
          .get();
        console.log(snapshot);

        if (snapshot.empty) {
          console.log("Kullanıcı kayıtlı değil");
          const newUser = {
            uid,
            email,
            displayName,
            photoURL,
            role: "yok",
          };

          await firestoreRef
            .collection("users")
            .add(newUser)
            .then(() => {
              router.push({ name: "Profile" });
            });
        } else {
          console.log("Kullanıcı kayıtlı");
          router.push({ name: "Profile" });
        }
      });
    };

    return {
      handleLogin,
    };
  },
};
</script>

<style></style>
