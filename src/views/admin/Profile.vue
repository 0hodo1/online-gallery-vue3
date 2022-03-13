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
          <form @submit.prevent="sendMessage">
            <input class="input-field" v-model="messageText" />
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
            <li
              class="collection-item black-text"
              v-for="mesaj in mesajlar"
              :key="mesaj"
            >
              <div>
                {{ mesaj.content }}
                <a href="#" class="secondary-content">
                  <i
                    class="fas fa-trash red-text"
                    @click="mesajSil(mesaj.id)"
                  ></i>
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

    const messageText = ref("");
    const mesajlar = ref([]);

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

      await firestoreRef
        .collection("mesajlar")
        .where("kime", "==", userUID)
        .where("aktiflik", "==", true)
        .onSnapshot((snap) => {
          mesajlar.value = [];
          snap.docs.forEach((doc) => {
            mesajlar.value.push({ ...doc.data(), id: doc.id });
          });
        });
    });

    const sendMessage = async () => {
      if (messageText.value != "") {
        console.log(messageText.value);

        const newMessage = {
          content: messageText.value,
          kimden: userUID,
          kime: "admin",
          tarih: date(),
          aktiflik: true,
        };

        await firestoreRef
          .collection("mesajlar")
          .add(newMessage)
          .then(() => {
            messageText.value = "";
          });
      }
    };

    const deleteMesaj = async (id) => {
      await firestoreRef
        .collection("mesajlar")
        .doc(id)
        .update({ aktiflik: false });
    };

    return {
      photoURL,
      displayName,
      email,
      role,
      messageText,
      sendMessage,
      mesajlar,
      deleteMesaj,
    };
  },
};
</script>

<style></style>
