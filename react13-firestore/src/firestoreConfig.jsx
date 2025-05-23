// Firebase 서비스에 연결하기 위한 import
import { initializeApp } from "firebase/app";
// Firebase 데이터베이스 사용을 위한 import
import { getFirestore } from "firebase/firestore";

// .env 파일 생성 전
// Firebase 프로젝트를 식별하는 데 필요한 정보 => Firebase 콘솔에서 발급받은 API정보(SDK정보)
// const firebaseConfig = {
//   apiKey: "AIzaSyASl8_xmd_5-lVmdf7V1MPQbGgguMCHL2M", //내 Firebase 서비스 접근용 인증키
//   authDomain: "myreact-bb564.firebaseapp.com", //인증(로그인 등)에 쓰이는 도메인
//   projectId: "myreact-bb564", //내 프로젝트 아이디
//   storageBucket: "myreact-bb564.firebasestorage.app", //파일 업로드에 쓰이는 저장소 주소
//   messagingSenderId: "49042449629", //푸시 알림 등 메시지 기능 쓸 때 쓰는 아이디
//   appId: "1:49042449629:web:f1948ada913e53ea1e2734", //앱의 고유한 아이디
// };

// .env 파일 생성 후
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
}

// initializeApp 함수에 내 설정 정보(firebaseConfig)를 넣어서 Firebase와 내 웹앱을 연결.
// Firebase에 연결 후 앱 초기화
const app = initializeApp(firebaseConfig); //Firebase 연결 시작
// Firestore 사용을 위한 객체 생성
const firestore = getFirestore(app); //내 Firebase 앱에서 Firestore 데이터베이스 기능을 쓸 준비를 하는 코드
/* getFirestore : Firebase의 클라우드 데이터베이스를 내 웹앱에서 쓸 수 있게 "연결"해 주는 함수.
app : 위에서 initializeApp(firebaseConfig)로 초기화한 내 Firebase 앱 객체예요. */

// Firestore라는 데이터베이스 객체 export => 이걸 이용해서 데이터 읽기,쓰기,수정,삭제 등이 가능
export { firestore };