import { useRef, useState } from "react";

export default function Stopwatch(props) {
  // 스탑워치가 동작 중인지 확인을 위한 State
  const [timerFlag, setTimerFlag] = useState(false);
  // 타이머에서 사용할 시간
  let [ticker, setTicker] = useState(0);
  // 타이머 중지용
  let timerRef = useRef(0);

  const startTimer = () => {
    ticker++;
    // 1초에 한번씩 증가된 값으로 State를 변경
    timerRef.current = setInterval(() => {
      console.log('틱톡');
      // Setter 함수 호출해서 리렌더링
      setTicker(ticker++);
    }, 1000);
  } 

  // 스탑워치 중지
  const stopTimer = () => {
    clearInterval(timerRef.current);
  }
  console.log('timerRef', timerRef);

  return (<>
    <div className="stopwatch">
      <h1 className="h1">StopWatch</h1>
      {/* 시간 표시 */}
      <span className="stopwatch-time">{ticker}</span>
      {/* 시작/중지 버튼 */}
      <button onClick={()=>{ 
        // 토글해서 State를 변경
        setTimerFlag(!timerFlag);
        // 토글된 상태에 따라 각기 다른 함수의 호출과 버튼 타이틀 변경
        (timerFlag === true) ? stopTimer() : startTimer();
      }}>{(timerFlag === false) ? 'Start' : 'Stop'}</button>
      {/* 리셋 버튼 */}
      <button onClick={()=>{ 
        /* 타이머가 동작 중일땐, 누르면 경고창 */
        if (timerFlag === true) {
          alert('StopWatch가 동작중입니다.');
        }
        else {
          /* 중지된 상태면 0으로 리셋. */
          setTicker(0);
        }
      }}>Reset</button>
    </div>
  </>);
}