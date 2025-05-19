// 라우팅 관련 컴포넌트 import
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Routes, Route, Outlet } from "react-router-dom";
import { useState } from "react";

import List from "./components/board/List";
import Write from "./components/board/Write";
import View from "./components/board/View";
import Edit from "./components/board/Edit";
import Delete from "./components/board/Delete";
import NotFound from "./components/common/NotFound";

const nowDate = () => {
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
};

function App() {
  const [boardData, setBoardData] = useState([
    {no: 1, title: '오늘은 React공부하는날', writer: '낙짜쌤', date: '2023-01-01',
      contents: 'React를 뽀개봅시당'},
    {no: 2, title: '어제는 Javascript공부함', writer: '유겸이', date: '2023-03-03',
      contents: 'Javascript는 할게 너무 많아요'},
    {no: 3, title: '내일은 Project해야지', writer: '개똥이', date: '2023-05-05',
      contents: 'Project는 뭘 만들어볼까?'},
  ]);

  const [nextNo, setNextNo] = useState(4);
  const navigate = useNavigate();

  return (
    /* 라우팅 처리를 위해 App컴포넌트를 감싸야 하므로 이와같이 App.jsx에서
    처리해도 된다. 하지만 주로 main.jsx에서 처리하는게 좋다. */
    <BrowserRouter>
      <Routes>
        {/* 데이터로 사용할 배열을 Props로 자식컴포넌트로 전달 */}
        <Route path="/" element={<List boardData={boardData} />} />
        <Route path="/list" element={<List boardData={boardData} />} />
        {/* 열람의 경우 게시물의 일련번호를 통해 객체를 선택해야 하므로
        중첩라우터로 구현하고, 일련번호의 경우 :no 로 기술되어있다. */}
        <Route path="/view" element={<Outlet />} >
          <Route path=":no" element={<View boardData={boardData}
            navigate={navigate} />}/>
        </Route>
        {/* Write 컴포넌트로 글쓰기 처리를 위한 모든 State와 관련함수를
        props로 전달한다. */}
        <Route path="/write" element={<Write 
          boardData={boardData} setBoardData={setBoardData}
          nextNo={nextNo} setNextNo={setNextNo}
          navigate={navigate} nowDate={nowDate} />} />
        <Route path="/edit" element={<Outlet />} >
          <Route path=":no" element={<Edit 
          boardData={boardData} setBoardData={setBoardData}
          navigate={navigate} nowDate={nowDate} />} />
        </Route>
        <Route path="/delete" element={<Outlet />} >
          <Route path=":no" element={<Delete 
          boardData={boardData} setBoardData={setBoardData}
          navigate={navigate} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
