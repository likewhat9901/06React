// 상태관리를 위한 useState 훅 import
import { useState } from 'react';
/* 모듈화한 컴포넌트를 import한다. 경로와 파일명까지만 기술하면 되고
확장자는 기술하지 않는다. */
import ListComponent from './component/ListComponent'
import ViewComponent from './component/ViewComponent'
import WriteComponent from './component/WriteComponent'

import { Routes, Route, Link } from 'react-router-dom'

function App() {
  /* 화면전환을 위한 State 변수명은 mode, 초기값은 list, 변경을 위한
  함수명은 setMode()로 선언한다. */
  const [mode, setMode] = useState('list');

  // 각 컴포넌트를 저장하기 위한 변수
  let contents = '';

  // 각 mode에 따라 컴포넌트를 변수에 할당
  if(mode === 'view'){
    /* mode를 변경하기 위해 changeMode라는 함수를 정의한 후
    Props를 전달한다. 자식컴포넌트에서 Props를 통해 이 함수를 바다
    'props.프롭스명' 형태로 호출하여 State를 변경할 수 있다.
    이때 화면은 새롭게 렌더링된다. */
    contents = <ViewComponent changeMode={(pmode)=>{
      setMode(pmode)
    }}></ViewComponent>
  }
  else if(mode === 'write'){
    contents = <WriteComponent changeMode={(pmode)=>{
      setMode(pmode)
    }}></WriteComponent>
  }
  else if(mode === 'list'){
    contents = <ListComponent changeMode={(pmode)=>{
      setMode(pmode)
    }}></ListComponent>
  }

  // 최종적으로 컴포넌트를 렌더링.
  return (<>
    <h2>React - 모듈화</h2>
    {contents}
    <br /><br />
    <hr />
    
    <h1>라우터 예제</h1>
    <nav>
      <Link to="/">홈</Link> | <Link to="/about">소개</Link>
    </nav>

    <Routes>
      <Route path="/" element={<ListComponent />} />
      <Route path="/about" element={<ViewComponent />} />
    </Routes>
  </>);
}

export default App
