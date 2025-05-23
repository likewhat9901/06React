import { firestore } from "./firestoreConfig"
import { doc, deleteDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
  console.log("firestore", firestore !== null ? "연결완료" : "연결실패");

  const [showData, setShowData] = useState([]) ;
  
  const getCollection = async () => {  
    const querySnapshot = await getDocs(collection(firestore, "members"));
    let trArray = [];
    querySnapshot.forEach((doc)=>{
      let memberInfo = doc.data();
      trArray.push (
        <option key={doc.id} value={doc.id}>{memberInfo.name}</option>
      );
    });
    setShowData(trArray);
  };

  useEffect(()=>{
    getCollection();
  }, []);

  // input 태그에 설정된 값을 수정하기 위한 State
  const [id, setId] = useState('') ;
  const [pass, setPass] = useState('') ;
  const [name, setName] = useState('') ;

  return (
    <>
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>개별 조회 및 삭제하기</h3>
      <form onSubmit={async (event)=>{
        event.preventDefault();
        let id = event.target.id.value;
        console.log("삭제", id);
        if(id===''){ alert('사용자를 먼저 선택해주세요'); return;}

        /* onSubmit을 통해 선택한 Id로 Document 참조를 얻고, deleteDoc함수를 실행해서 데이터 삭제. */
        await deleteDoc(doc(firestore, "members", event.target.id.value));

        setId('');
        setPass('');
        setName('');

        getCollection();
      }}>
        <div className="input_group" id="myForm">
          <select className="form-control" onChange={async (e) => {
            // select에서 선택한 항목의 데이터를 불러와서 input에 설정
            let user_id = e.target.value;
            // console.log("선택", user_id);

            const docRef = doc(firestore, "members", user_id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              // console.log("Document data:", docSnap.data());
              let callData = docSnap.data();
              setId(user_id);
              setPass(callData.pass);
              setName(callData.name);
            }
            else {
              console.log("No such document!");
            }
          }}>
            <option value="">선택하세요</option>
            {showData}
          </select>
          <button type="submit" className="btn btn-danger" >삭제</button>
        </div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>컬렉션(테이블)</td>
              <td><input type="text" name="collection" value="members" readOnly
                className="form-control"/></td>
            </tr>
            <tr>
              <td>아이디(변경불가)</td>
              <td><input type="text" name="id" value={id} className="form-control" readOnly /></td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td><input type="text" name="pass" value={pass} className="form" readOnly /></td>
            </tr>
            <tr>
              <td>이름</td>
              <td><input type="text" name="name" value={name} className="form" readOnly /></td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  )
}

export default App
