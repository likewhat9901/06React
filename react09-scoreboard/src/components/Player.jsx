import { useState } from 'react';
import Counter from '../components/Counter';
import EditPlayerForm from "../components/EditPlayerForm";

export default function Player(props) {
  let row = props.playerData;

  // 수정폼을 보임/숨김 처리를 위한 State
  const [showEdit, setShowEdit] = useState(false);
  let editForm;
  if (showEdit === false) {
    // false일때는 빈값을 할당해서 숨김처리
    editForm = '';
  }
  else {
    // true일때는 컴포넌트 할당
    editForm = <EditPlayerForm playerName={row.name} playerIdx={row.idx}
      onEditPlayer={props.onEditPlayer}
      showEdit={showEdit} setShowEdit={setShowEdit} />
  }

  return (<>
    <div className="player">
      <span className="player-name">
        <button className="remove-player" 
          onClick={() => { 
            // 삭제버튼을 누르면 confirm으로 확인 후 함수를 호출한다.
            if(window.confirm('삭제할까요?')){
              props.onDeletePlayer(row.idx);
            }
          }}> x </button>
        <a href="/" onClick={(e) => {
          e.preventDefault();
          setShowEdit(!showEdit);
        }}>{row.name}</a>
      </span>
      {/* App 컴포넌트에서 전달받은 함수를 자식 컴포넌트로 재전달한다.
      React는 Top-down 방식으로 데이터를 전달하는 구조를 가지고 있어
      컴포넌트의 구조가 복잡해질수록 상태관리가 어려워진다는 단점이 있다. */}
      <Counter idx={row.idx} score={row.score} 
        onChangeScore={props.onChangeScore} />
    </div>
    {/* 각 선수마다 하위에는 수정폼이 추가. 이름을 누르면 토글 */}
    {editForm}
  </>);
}