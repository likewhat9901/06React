import { useState } from 'react';

import Header from './components/Header';
import AddPlayerForm from './components/AddPlayerForm';
import Player from './components/Player';

function App() {
  // 데이터로 사용할 객체형 배열을 State로 생성
  const [playerData, setPlayerData] = useState([
    {idx: 1, name: '홍길동', score: 10},
    {idx: 2, name: '손오공', score: 20},
    {idx: 3, name: '유비', score: 30},
    {idx: 4, name: '달타냥', score: 40},
  ]);
  // 시퀀스로 사용할 State 생성. 초기값은 5부터 시작
  const [nextVal, setNextVal] = useState(5);

  // 플레이어 추가를 위한 함수
  const addPlayerProcess = (pName) => {
    // 이름만 매개변수로 받아 추가할 객체 생성
    console.log('onAddPlayer', pName);
    let addPlayer = { idx: nextVal, name: pName, score: 0 };

    // 방법1
/*     // 기존 데이터의 복사본 배열 생성
    let copyPlayers = [...playerData];
    // 복사본에 새로운 데이터 추가
    copyPlayers.push(addPlayer);
    // setter 함수를 호출해서 State를 변경
    setPlayerData(copyPlayers); */

    // 방법2 : 방법1을 한줄의 코드로 수정할 수 있다.
    setPlayerData([...playerData, addPlayer]);

    // 데이터가 추가되지만 리렌더링되지 않음.
    // !원본데이터를 변경하는 것은 권장하지 않는다.
    // playerData.push(addPlayer);
    // setPlayerData(playersData);
    // console.log(players);

    setNextVal(nextVal+1);
  }

  // 점수의 증감을 위한 함수. 매개변수는 증감을 위한 플래그, 선수의 일련번호.
  const scoreChangeProcess = (flag, playerIdx) => {
    console.log('idx', playerIdx, 'flag', flag);
    let copyPlayers = [...playerData];
    // 복사본을 통해 반복
    copyPlayers.forEach((row)=>{
      // 현재 수정할 일련번호와 일치 여부 확인
      if (row.idx === playerIdx) {
        console.log(row.name);
        // flag에 따라 점수를 5점씩 증가.
        if (flag === '+') {
          row.score += 5;
        } else {
          row.score -= 5;
        }
        // 점수는 음수가 될수 없으므로 0으로 고정한다.
        if (row.score < 0) row.score = 0;
      }
    });
    setPlayerData(copyPlayers);
  }

  // 플레이어 삭제(내 답안)
  // function deletePlayerProcess(idx) {
  //   if (confirm('삭제하시겠습니까?')) {
  //     // const filtered = playerData.reduce((acc, cur)=>{
  //     //   if(cur.idx !== idx) acc.push(cur);
  //     //   return acc;
  //     // }, []);
  //     // setPlayerData(filtered);

  //     // 방법2
  //     setPlayerData(playerData.filter(player => player.idx !== idx));
  //   }
  // }

  // 플레이어 삭제(선생님 답안)
  const deletePlayerProcess = (playerIdx) => {
    console.log('삭제idx', playerIdx);

    // 방법1 : 삭제하려는 일련번호와 일치하지 않는 데이터만 모아서 업데이트
    // let newPlayerData = [];
    // for (let i = 0; i < playerData.length; i++) {
    //   if(playerData[i].idx !== playerIdx){
    //     newPlayerData.push(playerData[i]);
    //   }
    // }

    // 방법2 : reduce 함수를 사용
    let newPlayerData = playerData.reduce((prev, cur)=>{
      /* prev는 초기값으로 빈배열을 지정하고, 각 루프에서 삭제할 플레이어를
      제외한 나머지 객체를 추가한다. */
      if(cur.idx !== playerIdx)
        prev.push(cur);

      // 최종적으로 삭제할 플레이어가 제외된 배열을 반환.
      return prev;
    }, []);

    setPlayerData(newPlayerData);
  }

  // 수정을 위한 함수
  const editPlayerProcess = (idx, name) => {
    console.log('수정', idx, name);
    let newPlayersData = playerData.filter((row) => {
      // 수정할 선수의 IDX와 일치하면 이름을 수정
      if (row.idx === idx) {
        row.name = name;  
      }
      // 여기서 반환한 객체를 통해 새로운 배열이 생성된다.
      return row;
    });
    /* State 변경 후 리렌더링 */
    setPlayerData(newPlayersData);
  }

  return (
    <div className="scoreboard">
      {/* 인원수, 점수합산을 위해 선수 전체데이터를 props로 전달 */}
      <Header title="My Scoreboard" playersData={playerData}/>
      {
        // map함수를 통해 인원수만큼 반복해서 Player컴포넌트 렌더링
        playerData.map((playerRow) => (
          // 선수 한명의 정보를 담은 객체를 순차적으로 전달
          // unique한 key prop은 선수의 일련번호 사용
          // 점수변경을 위한 함수를 props로 전달
          // 선수 삭제를 위한 함수 전달
          <Player key={playerRow.idx} playerData={playerRow} 
            onChangeScore={scoreChangeProcess} 
            onDeletePlayer={deletePlayerProcess}
            onEditPlayer={editPlayerProcess} />
        ))  
      }
      {/* 새로운 선수 등록을 위한 입력폼 */}
      {/* 플레이어 추가를 위한 함수를 props로 전달 */}
      <AddPlayerForm onAddPlayer={addPlayerProcess}></AddPlayerForm>
    </div>
  );
}

export default App;
