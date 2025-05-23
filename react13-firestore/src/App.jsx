import { firestore } from "./firestoreConfig"
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";

function App() {
  console.log("firestore", firestore !== null ? "연결완료" : "연결실패");

  const [showData, setShowData] = useState([]) ;
  
  const getCollection = async (sField, sStr) => {  
    console.log("선택", sField);
    let getRows = [];

    if (sField === 'id') {
      /* 아이디를 통한 검색은 도큐먼트를 찾는것으로 구현한다. 이 앱은 아이디를
      Document명으로 사용했기 째문에 이렇게 구현할 수 있다. */
      const docRef = doc(firestore, "members", sStr);
      // 참조값을 통해 Document를 찾는다.
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        // 찾은 데이터를 빈 배열에 추가.
        getRows.push(docSnap.data());
      }
      else {
        alert("No such document!");
      }
    }
    else if(sField === 'name') {
      /* 이름으로 검색하는 경우는 where, query 함수를 사용한다.
      먼저 Collection을 얻어온다. */
      const membersRef = collection(firestore, "members");
      /* where함수는 조건에 맞는 데이터를 검색한다. 이를 통해 query함수를
      실행하여 Document를 얻어온다.  */
      const q = query(membersRef, where("name", "==", sStr));
      // 조건에 일치하는 Document는 2개 이상일 수 있으므로 forEach를 사용한다.
      const querySnapshot = await getDocs(q);
      console.log("Document data:", querySnapshot);
      querySnapshot.forEach((doc)=>{
        console.log("반복인출", doc.id, doc.data());
        getRows.push(doc.data());
      });
    }

    // UI에 표시할 항목을 만들어준다.
    let trArray = [];
    console.log("getRows", getRows);
    getRows.forEach((row)=>{
      trArray.push (
        <tr key={row.id}>
          <td className="cen">{row.id}</td>
          <td className="cen">{row.pass}</td>
          <td className="cen">{row.name}</td>
          <td className="cen">{row.regdate}</td>
        </tr>
      );
    });
    setShowData(trArray);
  };

  return (
    <>
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>검색하기</h3>
      <form onSubmit={async (e)=>{
        e.preventDefault();
        let sf = e.target.searchField.value;
        let ss = e.target.searchStr.value;
        // Form값을 submit하면 입력값을 받은 뒤 검색을 위한 함수를 호출한다.
        getCollection(sf, ss);
      }}>
        <div className="input_group" id="myForm">
          <select name="searchField" className="form-control" >
            <option value="id">아이디</option>
            <option value="name">이름</option>
          </select>
          <input type="text" name="searchStr" className="form-control" />
          <button type="submit" className="btn btn-danger" >전체조회</button>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th>아이디</th>
              <th>비밀번호</th>
              <th>이름</th>
              <th>가입일</th>
            </tr>
          </thead>
          <tbody>
            {showData}
          </tbody>
        </table>
      </form>
    </>
  )
}

export default App
