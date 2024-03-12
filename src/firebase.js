import { initializeApp} from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDUk4ZqFh9ob6ngm-9WfYWHorcy7j056S0",
    authDomain: "discord-vignesh.firebaseapp.com",
    projectId: "discord-vignesh",
    storageBucket: "discord-vignesh.appspot.com",
    messagingSenderId: "143664077589",
    appId: "1:143664077589:web:e1cb8d9b3387fdd05a271c",
    measurementId: "G-12G6Z58P4P"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  export {auth,provider};
  export default db;