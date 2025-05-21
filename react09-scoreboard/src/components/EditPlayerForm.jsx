import { useRef, useState } from "react";

/* 일반적으로 컴포넌트 선언과 export default는 따로 진행하지만 아래와 같이
선언과 동시에 export 할 수 있다. */
export default function AddPlayerForm(props) {
  // props로 전달받은 선수명을 State로 저장
  const [playerName, setPlayName] = useState(props.playerName) ;

  return (<>
    <form className="form" noValidate
      onSubmit={(e)=>{
        e.preventDefault();
        // target 속성으로 form값을 받음
        let playerName = e.target.player.value;
        // 수정을 위한 함수 호출(선수의 일련번호, 수정할 선수명)
        props.onEditPlayer(props.playerIdx, playerName);
        // 수정Form 숨김처리
        props.setShowEdit(false);
      }}
    >
      {/* value에 설정된 값은 onChange 리스너를 통해 setter 함수를 호출해서 변경해야 한다. */}
      <input type="text" name="player" minLength="10" className="input" 
        placeholder="이름을 추가하세요" required onChange={(e)=>{
          setPlayName(e.target.value);
        }} value={playerName} />
      {/* 선수추가 경고창은 제거합니다. */}
      <input type="submit" className="input" value="Edit" />
    </form>
  </>);
}