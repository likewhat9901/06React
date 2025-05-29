import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Register from "./pages/members/Register";
import Login from "./pages/members/Login";
import EditProfile from "./pages/members/EditProfile";
// import MainBoard from "./pages/boards/main/MainBoard";
// import MainBoard from './MainBoard';
// import QnABoard from './QnABoard';
// import FileBoard from './FileBoard';
// import MainView from './view/MainView';
// import QnAView from './view/QnAView';
// import FileView from './view/FileView';


function App() {
  
  return (<>
    <Routes>
      {/* Layout 컴포넌트를 통해 <Outlet/> 써보기 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>

        {/* Member Page */}
        <Route path="member">
          <Route path='register' element={<Register />}></Route>
          <Route path='login' element={<Login />}></Route>
          {/* <Route path='edit' element={<EditProfile />}></Route> */}
        </Route>
        
        {/* Main Board */}
        {/* <Route path="main">
          <Route index element={<MainBoard />} />
          <Route path="view/:id" element={<MainView />} />
        </Route> */}

        {/* QnA Board */}
        {/* <Route path="qna">
          <Route index element={<QnABoard />} />
          <Route path="view/:id" element={<QnAView />} />
        </Route> */}

        {/* File Board */}
        {/* <Route path="file">
          <Route index element={<FileBoard />} /> */}
          {/* <Route path="view/:id" element={<FileView />} /> */}
        {/* </Route> */}
      </Route>
    </Routes>
  </>) 
}

export default App;