import { useRef } from "react";
import Navi from "../components/Navi.jsx";
import { useNavigate } from 'react-router-dom';

function ChatStart() {
  // input 태그 DOM에 접근하기 위한 useRef변수 생성
  /* useRef()를 통해 변수를 생성하면 current라는 key를 가진 객체를 반환한다.
  즉 {current : 초기값} 과 같은 형태가 된다. */
  // 대화방의 이름(아이디)
  const refRoom = useRef();
  // 접속자의 아이디
  const refId = useRef();
  const navigate = useNavigate();

  /* open() 함수를 이용해서 채팅창을 팝업으로 오픈함.
    형식] open(팝업창의 요청URL, 창의이름, 창의속성);
      두번째 인수인 '창의 이름'에 이름을 부여하면, 새로운 창을 열었을때 열려있던 창을 재사용한다.
      창의 이름을 부여하지 않으면 매번 새로운 창을 연다. */
  /* window.open(url, windowName, windowFeatures) */
  const openChatWin = () => {
    /* useRef를 통해 참조한 input의 DOM을 이용해서 입력값을 얻어온다.
    그리고 팝업창을 띄울때 파라미터로 사용한다. 즉 대화창을 팝업으로 띄울때 방명과 대화명을 전달해야 한다. */
    window.open(`/chat/talk?roomId=${refRoom.current.value}&userId=${refId.current.value}`,
      '', 'width=500, height=700');
    // navigate(`/chat/talk?roomId=${roomId}&userId=${userId}`);
  }
  
  return (<>
    <div className="App">
      <Navi />
      <h2>Firebase - Realtime Database Chatting</h2>
      {/* input에 앞에서 생성한 Ref변수를 추가하여 DOM에 접근한다. */}
      {/* 대화방의 아이디는 room1로 고정한다. 단 필요하다면 변경하거나
      입력할 수 있다. */}
      방명: <input type="text" name="roomId" value="room1" ref={refRoom} readOnly/> <br />
      대화명: <input type="text" name="userId" ref={refId} /> <br />
      {/* 버튼을 누르면 팝업창이 나옴 */}
      <button type="button" onClick={openChatWin}>채팅시작</button>
    </div>
  </>) 
}

export default ChatStart;