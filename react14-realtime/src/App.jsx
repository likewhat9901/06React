import { realtime } from "./realtimeConfig";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import RealtimeCRUD from "./components/RealtimeCRUD.jsx";
import Listener from "./components/Listener.jsx";
import ChatStart from "./components/ChatStart.jsx";
import ChatMessage from "./components/ChatMessage.jsx";

function App() {
  console.log("realtime", realtime);
  return (<>
    <BrowserRouter>
      {/* <div className="App"> */}
        <Routes>
          <Route path="/" element={<RealtimeCRUD/>}/>
          <Route path="/crud" element={<RealtimeCRUD/>}/>
          <Route path="/listener" element={<Listener/>}/>
          {/* 실시간 채팅은 2단계 라우팅 처리가 되어있다.
          첫번째 화면은 대화방, 대화명 입력을 위한 입력상자가 있음.
          2개의 정보를 입력 후 팝업창으로 채팅 대화창(2번째 화면)을 띄우게 됨. */}
          <Route path='/chat' element={<Outlet/>}>
            <Route index element={<ChatStart />}/>
            <Route path="talk" element={<ChatMessage />}/>
          </Route>
        </Routes>
      {/* </div> */}
    </BrowserRouter>
  </>) 
}

export default App;