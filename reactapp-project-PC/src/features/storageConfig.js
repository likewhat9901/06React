import app from "./firebase";
import { getStorage } from "firebase/storage";


const storage = getStorage(app, "gs://myreact-bb564.firebasestorage.app");

export { storage };