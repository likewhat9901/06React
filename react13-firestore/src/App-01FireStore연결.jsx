// Firestore 데이터베이스 객체 import
import { firestore } from "./firestoreConfig"
// 새로운 document를 입력하거나 읽을때 사용하는 함수들
import { doc, getDoc, setDoc } from "firebase/firestore";

function App() {
  // Firestore 연결 확인
  console.log("firestore", firestore);

  // document 추가 함수
  const addMessage = async () => {
    /* 컬렉션 : SQL의 테이블과 유사함. Korea로 작성
    Document : SQL의 레코드(행)와 유사함. Seoul로 작성 *sql에서 열은 field(컬럼,속성)
    하위 데이터는 JS 객체형식으로 작성. 테이블처럼 정형화된 것이 아니라서
    원하는대로 객체에 정보추가 가능. */
    /* 문서추가를 위해 setDec(Document 정보, 추가할 데이터) 형식으로 실행 
    ex. Document 정보 : doc(firestore, "Korea", "Seoul")
    추가할 데이터 : {
      gu: "금천구",
      dong: "가산동",
      hotplace: "아울렛쇼핑몰",
      time: "10:21",
    } */
    /* doc(firestore, "컬렉션이름", "문서ID") 
      firestore: Firestore 인스턴스 (getFirestore(app)에서 얻은 것)
      "컬렉션이름": 테이블과 비슷한 데이터 집합의 이름 (예: "users")
      "문서ID": 각 문서를 구분하는 고유 ID (직접 지정하거나 자동 생성 가능) */
    await setDoc(doc(firestore, "Korea", "Incheon"), {
      gu: "남동구",
      dong: "구월동",
      hotplace: "롯데백화점",
    });
    console.log("입력성공");
  }

  // Document 읽기 함수
  const getMessage = async () => {  
    // doc(컬렉션, Document)를 통해 문서의 참조를 읽어온다.
    const docRef = doc(firestore, "Korea", "Incheon");
    // 참조를 통해 Document를 얻어온다.
    const docSnap = await getDoc(docRef);
    // 해당 Document가 존재하면 Console에 data 출력
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    }
    else {
      console.log("No such document!");
    }
  }

  return (
    <>
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>Firebase 연결</h3>
      <input type="button" value="입력" onClick={addMessage} />
      <input type="button" value="읽기" onClick={getMessage} />
    </>
  )
}

export default App
