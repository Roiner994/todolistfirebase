import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBb2L6CMsY6kl2rbutKU9ldr30NTeZYEzs",
    authDomain: "todolist-3738b.firebaseapp.com",
    databaseURL: "https://todolist-3738b.firebaseio.com",
    projectId: "todolist-3738b",
    storageBucket: "todolist-3738b.appspot.com",
    messagingSenderId: "684401844414",
    appId: "1:684401844414:web:49cae3b25e430b93"
};

firebase.initializeApp(firebaseConfig);
export default firebase;