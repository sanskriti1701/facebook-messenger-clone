import firebase from 'firebase';

const firebaseApp = firebase.initializeApp(
  {
        apiKey: "AIzaSyA7gWKti5Fwlh0jtsqu0rqgZnHq19P8c-4",
        authDomain: "facebook-messenger-clone-1bec1.firebaseapp.com",
        projectId: "facebook-messenger-clone-1bec1",
        storageBucket: "facebook-messenger-clone-1bec1.appspot.com",
        messagingSenderId: "148425603409",
        appId: "1:148425603409:web:5f014002870b8580fb7b70"
      }
);

const db = firebaseApp.firestore();

export default db;