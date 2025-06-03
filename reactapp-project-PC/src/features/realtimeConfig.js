import app from "./firebase"; // ✅ 공통 app 사용
import { getDatabase } from "firebase/database";


const realtime = getDatabase(app); 

export { realtime };