import { useState, useMemo } from "react"

/* 함수형 컴포넌트의 특징
- 컴포넌트가 렌더링될때 정의된 함수가 실행된다.
- 이때 함수 내부의 모든 변수가 초기화된다. 즉 렌더링될때마다
  컴포넌트 내부의 모든 코드가 실행되는 구조를 가진다. */

// 호출시 시간이 매우 많이 걸리는 로직 함수(API 통신 등)
const longTimeCalculate = (number) => {
  console.log('시간이 많이 걸리는 계산');
  // 12억번 정도 반복하는 for문
  for (let i = 0; i < 1234567890; i++) {}
  return number + 10000;
}

// 매우 간단한 로직을 수행하는 함수
const simpleCalculate = (number) => {
  console.log('금방 끝나는 계산');
  return number + 1;
}

function App() {
  // State 생성
  const [longTimeNum, setLongTimeNum] = useState(1);
  const [simpleNumber, setSimpleNumber] = useState(1);

  /* Step1 : App 컴포넌트가 렌더링되면 아래 2개 함수를 호출하여 
  반환된 값으로 설정한다. 매개변수로는 State가 인수로 전달된다.
  따라서 렌더링될 때마다 2개의 함수는 모두 실행되어 성능에 영향을 미치게 된다. */
  // const longTimeSum = longTimeCalculate(longTimeNum);
  // const simpleSum = simpleCalculate(simpleNumber);

  /* Step2 : 시간이 많이 걸리는 함수를 호출한 후 반환되는 값을 useMemo를
  통해 메모이제이션한다. 이 값은 longTimeNum이 변경될때만 다시 함수를 호출하므로,
  short버튼을 눌렀을때는 실행되지 않는다. 즉 렌더링 시 불필요하게 함수가 실행되는 것을
  줄일 수 있어 성능이 향상된다. */
  const longTimeSum = useMemo(()=>{
    return longTimeCalculate(longTimeNum);
  }, [longTimeNum]);
  const simpleSum = simpleCalculate(simpleNumber);

  return (<>
    {/* input 상자의 스핀박스를 누를때마다 핸들러에서 각 setter 함수를 호출한다.
    이 입력값을 통해 State를 변경한다. */}
    <h2>Long Time 계산기</h2>
    <input type="number" value={longTimeNum}
      onChange={(e)=>setLongTimeNum(parseInt(e.target.value))} />
    <span> + 10000 = {longTimeSum}</span>

    <h2>Short Time 계산기</h2>
    <input type="number" value={simpleNumber}
      onChange={(e)=>setSimpleNumber(parseInt(e.target.value))} />
    <span> + 1 = {simpleSum}</span>
  </>)
}

export default App

