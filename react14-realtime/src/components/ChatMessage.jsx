// css파일을 추가하는 경우 src하위에 생성한 후 import해서 적용한다.
import '../Chat.css';
// 리얼타임 데이터베이스 연결 및 객체 얻어오기
import { realtime } from '../realtimeConfig';
// 리얼타임 사용을 위한 함수 import
// ref: 데이터베이스에서 특정 위치(노드)를 가리키는 참조 객체를 생성 => 읽기, 쓰기 가능
import { onValue, push, set, child, ref } from 'firebase/database';
// React에서 제공하는 Hooks
import { useState, useEffect, useRef } from 'react';
// Router에서 제공하는 Hooks
import { useSearchParams } from "react-router-dom";

// 스크롤바를 최하단으로 내려줌.
const scrollTop = (chatWindow) => {
  console.log('scrolltop 호출됨');
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/* 컴포넌트 정의 */
function ChatMessage() {
  /* 쿼리스트링으로 전달된 파라미터를 조작할때 사용하는 라우터 훅 */
  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
  /* 채팅 내역의 DOM 참조 */
  const chatWindow = useRef();
  // 채팅 데이터 저장용.
  const [chatData, setChatData] = useState('');
  
  // 리얼타임에 대화내역 저장
  function messageWrite(chatRoom, chatId, chatMessage) {
    // 고유키 생성. 데이터 저장 시 중복되지 않는 일련번호와 같이 사용된다.
    const newPostKey = push(child(ref(realtime), chatRoom)).key;
    /* set(): 해당 경로에 데이터를 "덮어쓰기"로 저장.
    기존 데이터가 있어도 새 데이터로 완전히 대체함. 비동기 함수 → await 또는 .then() 필요 */
    /* 데이터 저장시 '방명'이 최상위 node가 되고, 하위에 '고유키'로 구분하여
    대화내용을 저장한다. 입력된 순서는 지켜지므로 별도의 정렬은 필요없다.ㅏ
    입력데이터는 대화명과 내용으로 구성된다. */
    set(ref(realtime, chatRoom + '/' + newPostKey), {
      id: chatId,
      message: chatMessage,
    });
    console.log('입력성공');
  }

  /* Realtime 리스너(onValue) 정의. 새롭게 입력된 대화내용을 실시간으로 얻어온다.
  채팅 내역이 저장된 'room1' 노드를 참조하는 변수를 생성 후 사용한다. */
  const dbRef = ref(realtime, roomId);
  useEffect(()=>{
    // 리스너 생성. 새로운 대화내역이 확인되는 즉시 이벤트가 발생된다.
    onValue(dbRef, (snapshot)=>{

      // 새로운 메세지 추가시 스크롤바가 최하단으로 이동하지 않는 문제 해결.
      // onValue가 작동한 0.1초후에 스크롤바를 내리는 함수를 강제 실행.
      setTimeout(()=>{
        scrollTop(chatWindow.current);
      }, 100)

      let showDiv = [];
      /* 대화내역 전체를 배열로 받은 후 반복 */
      snapshot.forEach((childSnapshot) => {
        // const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        // console.log("리스너", childKey, childData.id, userId);
        /* 대화내용을 내가 보낸 것만 우측으로 정렬 */
        if (childData.id === userId) {
          /* 데이터베이스에 등록된 데이터의 아이디와 대화창에 접속한
          사용자의 아이디가 일치하면, 본인이므로 '우측'으로 정렬한다. */
          showDiv.push(<div className='myMsg'
            style={{textAlign:'right'}}>{childData.message}</div>);
        }
        else{
          /* 상대방이 보낸 메세지는 좌측 정렬 */
          showDiv.push(<div>{`${childData.id} : ${childData.message}`}</div>)
        }
        // 스크롤바 최하단으로 내려주기
        scrollTop(chatWindow.current);
      });
      // State 변경해서 대화내용 업데이트
      setChatData(showDiv);
    })
  }, []);
  
  return (<>
    <div className="App">
      <h2>Realtime 채팅</h2>
      대화명 : {userId} &nbsp;&nbsp;
      {/* 창을 닫아줌 */}
      <button id='closeBtn' onClick={() => window.self.close()}>
        채팅종료
      </button>
      {/* 채팅 내역이 출력되는 부분으로 ref를 사용해서 DOM요소 참조. */}
      <div id="chatWindow" ref={chatWindow}>
        {chatData}
      </div>
      <form onSubmit={(e)=>{
        e.preventDefault();
        /* Event의 target 속성으로 form값을 얻어옴 */
        let chatRoom = e.target.chatRoom.value;
        let chatId = e.target.chatId.value;
        // 빈값 검증
        if (chatId === '') {
          alert('대화명을 입력하세요');
          return;
        }
        // 입력한 메세지 얻어오기
        let message = e.target.message.value;
        if (message === '') {
          alert('메세지를 입력하세요');
          return;
        }
        console.log('submit', chatRoom, chatId, message);
        /* 입력한 폼값들을 매개변수로 Realtime에 입력 */
        messageWrite(chatRoom, chatId, message);
        /* 입력이 완료되면 입력란을 비워줌. */
        e.target.message.value = '';
      }}>
        {/* 룸명과 아이디는 hidden 상자로 표시 */}
        <input type="hidden" name="chatRoom" value={roomId} />
        <input type="hidden" name="chatId" value={userId} />
        {/* 메세지 입력상자와 전송 버튼. */}
        <input type="text" name="message" />
        <button type='submit'>전송</button>
      </form>
    </div>
  </>) 
}

export default ChatMessage;