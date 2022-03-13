<template>
  <div class="row">
    <div class="col m6 s12">
      <div class="card grey lighten-1">
        <div class="card-content white-text">
          <span class="card-title black-text">Gelen Mesajlar</span>
          <ul class="collection">
            <li
              class="collection-item black-text"
              v-for="mesaj in mesajlar"
              :key="mesaj"
            >
              <div>
                {{ mesaj.content }}
                <a class="secondary-content">
                  <i
                    class="fas fa-paper-plane brown-text"
                    @click="showMessage(mesaj.kimden, mesaj.content)"
                  ></i>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col m6 s12">
      <div class="card grey lighten-1">
        <div class="card-content white-text">
          <span class="card-title black-text">Cevap Gönder</span>
          <form>
            <label class="white-text row">
              <span class="black-text">Kime: </span>
              {{ username }}
            </label>
            <label class="white-text row">
              <span class="black-text">İçerik: </span>
              {{ mesajIcerik }}
            </label>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { firestoreRef, date } from "@/firebase/config";

export default {
  setup() {
    const mesajlar = ref([]);
    const mesajIcerik = ref("");
    const username = ref("");
    onMounted(async () => {
      await firestoreRef
        .collection("mesajlar")
        .where("kime", "==", "admin")
        .where("aktiflik", "==", true)
        .onSnapshot((snap) => {
          mesajlar.value = [];
          snap.forEach((doc) => {
            mesajlar.value.push({
              ...doc.data(),
              id: doc.id,
            });
          });
        });
    });

    const showMessage = async (kimden, icerik) => {
      mesajIcerik.value = icerik;

      const snap = await firestoreRef
        .collection("users")
        .where("uid", "==", kimden)
        .get();

      snap.forEach((doc) => {
        username.value = doc.data().displayName;
      });
    };

    return {
      mesajlar,
      mesajIcerik,
      username,
      showMessage,
    };
  },
};
</script>

<style></style>
