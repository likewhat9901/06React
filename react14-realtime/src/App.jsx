import { realtime } from "./realtimeConfig";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import RealtimeCRUD from "./components/RealtimeCRUD";
// import Listener from "./components/Listener";
// import ChatStart from "./components/ChatStart";
// import ChatMessage from "./components/ChatMessage";

function App() {
  console.log("realtime", realtime);
  return (<>
    <BrowserRouter>
      {/* <div className="App"> */}
        <Routes>
          <Route path="/" element={<RealtimeCRUD/>}/>
          <Route path="/crud" element={<RealtimeCRUD/>}/>
          {/* <Route path="/listener" element={<Listener/>}/> */}
          {/* <Route path='/chat' element={<Outlet/>}>
            <Route index element={<ChatStart />}/>
            <Route path="talk" element={<ChatMessage />}/>
          </Route> */}
        </Routes>
      {/* </div> */}
    </BrowserRouter>
  </>) 
}

export default App;