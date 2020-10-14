import notifications from "../utils/notifications.js";

export default {
  login(username, password) {
    notifications.showLoading();
    return firebase.auth().signInWithEmailAndPassword(username, password);
  },
  register(username, password) {
    notifications.showLoading();
    return firebase.auth().createUserWithEmailAndPassword(username, password);
  },
  logout() {
    return firebase.auth().signOut();
  },
};
