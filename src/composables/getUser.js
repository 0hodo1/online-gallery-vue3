import { ref } from "vue";
import { authRef } from "../firebase/config";

const user = ref(authRef.currentUser);

authRef.onAuthStateChanged((u) => {
  user.value = u;
});

const getUser = () => {
  return { user };
};

export default getUser;
