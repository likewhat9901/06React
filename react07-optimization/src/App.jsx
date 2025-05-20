import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

/* 박스 컴포넌트 정의. props로 받은 스타일을 div에 적용한다. */
const Box = ({createBoxStyle}) => {
  // State 생성
  const [style, setStyle] = useState({});

  /* props로 받은 createBoxStyle 함수가 변경될때마다 호출되도록 정의 */
  useEffect(()=>{
    console.log('박스 키우기');
    setStyle(createBoxStyle());
  }, [createBoxStyle]);

  // div 박스를 렌더링한다.
  return <div style={style}></div> 
}

function App() {
  // 박스 사이즈
  const [size, setSize] = useState(100);
  // 배경색
  const [isDark, setIsDark] = useState(false);

  // 스타일 반환을 위한 함수 선언
  /* Step1 : App 컴포넌트가 렌더링될때마다 새로운 참조값이 부여된다. 따라서 테마변경을
  눌러도 이와 상관없는 '박스키우기'가 출력된다. */
/*   const createBoxStyle = () => {
    return {
      backgroundColor : 'pink',
      width : `${size}px`,
      height : `${size}px`
    };
  } */
  /* Step2 : useCallback을 함수에 적용. size가 변경될때만 새롭게 함수를 메모이제이션 */
  const createBoxStyle = useCallback(() => {
    return {
      backgroundColor : 'pink',
      width : `${size}px`,
      height : `${size}px`
    };
  }, [size]);

  /* div박스의 배경색이 isDark에 따라 변경된다. */
  return (<div className="App" style={{
    background : isDark ? 'black' : 'white'
  }}>
    <h2>useCallback()</h2>
    {/* 스핀 버튼으로 증감시킨 값이 size를 변경하고, 리렌더링 함. */}
    <input type="number" value={size} step={5}
      onChange={(e)=> setSize(e.target.value)} />
    <button onClick={()=>setIsDark(!isDark)}>테마변경</button>
    {/* 스타일 반환함수를 props로 전달 */}
    <Box createBoxStyle={createBoxStyle} />
  </div>) 
}

export default App;