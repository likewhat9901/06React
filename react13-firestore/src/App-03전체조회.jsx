import { firestore } from "./firestoreConfig"
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";

function App() {
  console.log("firestore", firestore !== null ? "연결완료" : "연결실패");
  // Firestore 데이터를 저장할 State 정의. 초기값은 빈 배열.
  const [showData, setShowData] = useState([]) ;

  const getCollection = async () => {  
    let trArray = [];
    // 컬렉션명으로 하위 Document를 읽어옴
    const querySnapshot = await getDocs(collection(firestore, "members"));
    // 배열로 얻어온 Document의 개수만큼 반복
    querySnapshot.forEach((doc)=>{
      // console.log(doc.id, " => ", doc.data());
      // Callback 된 객체(doc)를 기반으로 data()함수를 호출하여 실제데이터 얻기
      let memberInfo = doc.data();
      // console.log("파싱", doc.id, memberInfo.pass, memberInfo.name,
      //   memberInfo.regdate);
      // tr태그로 출력할 항목 구성
      trArray.push (
        <tr key={doc.id}>
          <td className="cen">{doc.id}</td>
          <td className="cen">{memberInfo.pass}</td>
          <td className="cen">{memberInfo.name}</td>
          <td className="cen">{memberInfo.regdate}</td>
        </tr>
      )
    });
    // 파싱된 데이터를 통해 State 변경 및 리렌더링
    setShowData(trArray);
  }
  return (
    <>
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>전체조회하기</h3>
      <button type="button" onClick={getCollection}>전체조회</button>
      <table border="1" className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>아이디</th>
            <th>비밀번호</th>
            <th>이름</th>
            <th>가입일</th>
          </tr>
        </thead>
        <tbody>
          {/* 상단에서 구성한 데이터 출력 */}
          {showData}
        </tbody>
      </table>
    </>
  )
}

export default App
