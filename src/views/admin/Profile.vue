<template>
  <div class="row">
    <div class="col m12 s12">
      <div class="card grey lighten-1">
        <div class="card-contend white-text">
          <span class="card-title black-text">Kişisel Bilgiler</span>
          <table class="responsive-table centered">
            <tbody>
              <tr>
                <td class="black-text">
                  <img :src="photoURL" height="50" />
                </td>

                <td class="black-text">{{ displayName }}</td>
                <td class="black-text">{{ email }}</td>
                <td class="black-text">{{ role }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col m6 s12">
      <div class="card grey lighten-1">
        <div class="card-contend white-text">
          <span class="card-title black-text">Admine mesaj gönder</span>
          <form>
            <input class="input-field" />
            <button class="btn black">Gönder</button>
          </form>
        </div>
      </div>
    </div>
    <div class="col m6 s12">
      <div class="card grey lighten-1">
        <div class="card-contend white-text">
          <span class="card-title black-text">Kişisel Bilgiler</span>
          <ul class="collection">
            <li class="collection-item black-text">
              <div>
                Mesaj
                <a href="#" class="secondary-content">
                  <i class="fas fa-trash red-text"></i>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import getUser from "@/composables/getUser";
import { firestoreRef, date } from "@/firebase/config";

export default {
  setup() {
    const photoURL = ref(null);
    const displayName = ref(null);
    const email = ref(null);
    const role = ref(null);

    const { user } = getUser();
    const userUID = user.value.uid;

    onMounted(async () => {
      const snapshot = await firestoreRef
        .collection("users")
        .where("uid", "==", userUID)
        .get();

      snapshot.forEach((doc) => {
        const data = doc.data();
        photoURL.value = data.photoURL;
        displayName.value = data.displayName;
        email.value = data.email;
        role.value = data.role;
      });
    });

    return {
      photoURL,
      displayName,
      email,
      role,
    };
  },
};
</script>

<style></style>
