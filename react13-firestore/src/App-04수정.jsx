import { firestore } from "./firestoreConfig"
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
  console.log("firestore", firestore !== null ? "연결완료" : "연결실패");

  const nowDate = () => {
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
    var day = ("0" + dateObj.getDate()).slice(-2);

    // return new Date().toISOString().slice(0, 10);
    return year + "-" + month + "-" + day;
  }

  // Document 수정 함수
  const memberEdit = async (p_collection, p_id, p_pass, p_name) => {
    // 기존 Document가 있으면 수정처리
    await setDoc(doc(firestore, p_collection, p_id), {
      id: p_id,
      pass: p_pass,
      name: p_name,
      regdate: nowDate(),
    }, /* {merge: true} */);
    console.log("수정성공");
  }

  // select태그의 내용을 추가하기 위한 State
  const [showData, setShowData] = useState([]) ;

  // 화면 렌더링 이후 실행되는 수명주기 함수
  useEffect(()=>{
    const getCollection = async () => {  
      // members 컬렉션 하위의 Document를 얻어온다.
      const querySnapshot = await getDocs(collection(firestore, "members"));
      // 개수만큼 반복해서 option태그를 만듬.
      let trArray = [];
      querySnapshot.forEach((doc)=>{
        let memberInfo = doc.data();
        trArray.push (
          // value에는 회원아이디, text에는 이름을 삽입
          <option key={doc.id} value={doc.id}>{memberInfo.name}</option>
        );
      });
      return trArray;
    }

    // 함수를 호출한 뒤, 콜백데이터를 then절에서 처리
    getCollection().then((result)=>{
      console.log('result', result);
      // showData State변수에 getCollection에서 만든 option태그들이 추가 => result = trArray;
      setShowData(result);
    });
  }, []);
  /* useEffect의 두번째 인자가 빈 배열이므로 렌더링 완료 후 딱 한번만 실행됨. */

  // -----------------------------------------------
  // input의 State 변수 선언
  const [id, setId] = useState('') ;
  const [pass, setPass] = useState('') ;
  const [name, setName] = useState('') ;

  return (
    <>
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>개별 조회 및 수정하기</h3>
      {/* select 선택할때마다 onChange 실행 */}
      <select onChange={async (e) => {
        // 선택 항목의 value를 변수에 저장. 즉 아이디를 저장
        let user_id = e.target.value;
        console.log("선택", user_id);

        // 컬렉션명과 Document ID를 통해 데이터의 참조를 얻어온다.
        const docRef = doc(firestore, "members", user_id);
        // 참조값을 통해 해당 Document를 얻어옴.
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          // 해당 Document가 존재하면 Data를 인출해서..
          let callData = docSnap.data();
          // 각 State를 선택한 user_id에 따라 위에서 인출한 값으로 변경하여 input 값에 반영.
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
      <form onSubmit={(event)=>{
        event.preventDefault();

        // submit 이벤트 발생 시 form 값을 얻어온다.
        let collection = event.target.collection.value;
        let id = event.target.id.value;
        let pass = event.target.pass.value;
        let name = event.target.name.value;

        // 아이디만 빈 값인지 확인
        if(id===''){ alert('사용자를 먼저 선택해주세요'); return;}

        // 수정을 위한 함수 호출(매개변수로 정보 전달)
        memberEdit(collection, id, pass, name);

        // 수정완료되면 입력폼 비우기
        event.target.id.value = '';
        event.target.pass.value = '';
        event.target.name.value = '';
      }}>
        <table className="table table-bordered table-striped">
          <tbody>
            <tr>
              <td>컬렉션(테이블)</td>
              <td><input type="text" name="collection" value="members" readOnly/></td>
            </tr>
            <tr>
              <td>아이디(변경불가)</td>
              <td><input type="text" name="id" value={id}
                onChange={(event)=>{
                  setId(event.target.value);
                }} readOnly /></td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td><input type="text" name="pass" value={pass}
                onChange={(event)=>{
                  setPass(event.target.value);
                }}
              /></td>
            </tr>
            <tr>
              <td>이름</td>
              <td><input type="text" name="name" value={name}
                onChange={(event)=>{
                  setName(event.target.value);
                }}
              /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit">수정</button>
      </form>
    </>
  )
}

export default App
