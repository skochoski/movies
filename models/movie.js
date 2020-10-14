import notifications from "../utils/notifications.js";

const db = firebase.firestore();

export default {
  create(data) {
    notifications.showLoading();
    return db.collection("movies").add(data);
  },
  getAll() {
    notifications.showLoading();
    return db.collection("movies").get();
  },
  get(id) {
    notifications.showLoading();
    return db.collection("movies").doc(id).get();
  },
  delete(id) {
    notifications.showLoading();
    return db.collection("movies").doc(id).delete();
  },
  update(id, data) {
    notifications.showLoading();
    return db.collection("movies").doc(id).update(data);
  },
};
