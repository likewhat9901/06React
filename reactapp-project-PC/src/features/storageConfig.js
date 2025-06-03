import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
}

// App 초기화
const app = initializeApp(firebaseConfig);
// storage 객체 생성(본인의 스토리지 gs주소 사용)
const storage = getStorage(app, "gs://myreact-bb564.firebasestorage.app");

export { storage };