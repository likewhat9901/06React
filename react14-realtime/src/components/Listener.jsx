import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { realtime } from "../realtimeConfig.jsx";
import Navi from "../components/Navi.jsx";

function Listener() {
  console.log("aa.realtime", realtime);

  // realtime database로부터 받은 데이터를 저장하기 위한 State
  const [fireData, setFireData] = useState([]);
  // 'users' 노드를 참조한 객체 생성
  const dbRef = ref(realtime, 'users');
  // 1차 렌더링 후 내부의 코드 실행을 위한 수명주기 훅 선언
  useEffect(()=>{
    /* onValue()
      : 특정 노드의 데이터를 읽고 변경사항을 감지하기 위해 수신대기하는 실시간 리스너
      함수로, 이벤트 발생 시점에 특정 경로에 있는 정적 스냅샷을 읽는데 사용된다.
      노드의 하위요소를 포함하여 데이터가 변경될때마다 자동으로 동작한다. */
    /* 한번 실행되면, dbRef 경로를 계속 감시(Listen)한다. 데이터가 바뀔 때마다,
    Firebase가 자동으로 전달한 콜백함수를 계속 호출한다. */
    onValue(dbRef, (snapshot)=>{
      let showTr = [];
      /* 이벤트(입력 혹은 수정 등)가 감지되면 데이터 전체를 배열로 가져온다. */
      snapshot.forEach((childSnapshot) => {
        // 각 객체의 Key와 Value를 추출
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log(childKey, childData);
        // 화면에 출력할 내용을 만듬
        showTr.push(
          <tr key={childKey}>
            <td>{childKey}</td>
            <td>{childData.name}</td>
            <td>{childData.pass}</td>
            <td>{childData.fireKey}</td>
          </tr>
        )
      });
      console.log('bb', showTr);
      /* 출력할 내용으로 State를 변경 후 리렌더링 */
      setFireData(showTr)
    })
  }, []);
  console.log('cc');
  
  return (<>
    <div className="App">
      <Navi />
      <h2>Firebase - Realtime Database App</h2>
      <h3>02.Listener</h3>
      <table border={1} className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>아이디</th>
            <th>이름</th>
            <th>패스워드</th>
            <th>고유키</th>
          </tr>
        </thead>
        <tbody>
          {fireData}
        </tbody>
      </table>
    </div>
  </>) 
}

export default Listener;