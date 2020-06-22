var firebaseConfig = {
  apiKey: "AIzaSyDBIQRfIdiQqVZrWYVqz0vLD_ekbQhAeAA",
  authDomain: "trajectory-lab.firebaseapp.com",
  databaseURL: "https://trajectory-lab.firebaseio.com",
  projectId: "trajectory-lab",
  storageBucket: "trajectory-lab.appspot.com",
  messagingSenderId: "499059510751",
  appId: "1:499059510751:web:f5d324387b41632c3a886a",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const saveSystem = ({ id, system }) => {
  firebase
    .database()
    .ref("systems/" + id)
    .set(system);
};

const loadSystem = (id) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref("/systems/" + id)
      .once("value")
      .then((snapshot) => {
        resolve(snapshot.val());
      });
  });
};
