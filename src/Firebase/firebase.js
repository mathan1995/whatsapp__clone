import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDAH3DfE8J82HbJ-24_f3u6WQL2tz8sVY8',
  authDomain: 'whatsapp-clone-a6882.firebaseapp.com',
  databaseURL: 'https://whatsapp-clone-a6882.firebaseio.com',
  projectId: 'whatsapp-clone-a6882',
  storageBucket: 'whatsapp-clone-a6882.appspot.com',
  messagingSenderId: '785887803261',
  appId: '1:785887803261:web:aa121f4b3f46e43677be14',
  measurementId: 'G-Z3CQ8K1F3C',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
