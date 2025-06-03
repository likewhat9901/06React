import app from "./firebase"; // ✅ 공통 app 사용
import { getFirestore } from "firebase/firestore";


const firestore = getFirestore(app);

export { firestore };