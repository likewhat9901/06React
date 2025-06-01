import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
// import Register from "./pages/members/Register";
import Register from "./pages/members/Register";
import Login from "./pages/members/Login";
import EditProfile from "./pages/members/EditProfile";
import Boardlists from "./pages/boards/BoardLists";
import BoardWrite from "./pages/boards/BoardWrite";
import BoardView from "./pages/boards/BoardView";
import BoardEdit from "./pages/boards/BoardEdit";

// import MainBoard from "./pages/boards/main/MainBoard";
// import MainWrite from "./pages/boards/main/MainWrite";
// import MainView from './pages/boards/main/MainView';
// import MainEdit from './pages/boards/main/MainEdit';
// import QnABoard from './pages/boards/qna/QnABoard';
// import FileBoard from './FileBoard';
// import QnAView from './view/QnAView';
// import FileView from './view/FileView';

import ClassRoom from "./temp/ClassRoom";


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
          <Route path='edit' element={<EditProfile />}></Route>
        </Route>

        <Route path="board/:type">
          <Route path="lists" element={<Boardlists />} />
          <Route path="write" element={<BoardWrite />} />
          <Route path="view/:id" element={<BoardView />} />
          <Route path="edit/:id" element={<BoardEdit />} />
        </Route>
        
        {/* Boards Page */}
        {/* <Route path="board/main">
          <Route index element={<MainBoard />} />
          <Route path="write" element={<MainWrite />} />
          <Route path="view/:id" element={<MainView />} />
          <Route path="edit/:id" element={<MainEdit />} />
        </Route> */}

        {/* QnA Board */}
        {/* <Route path="/board/qna">
          <Route index element={<QnABoard />} />
          <Route path="view/:id" element={<QnAView />} />
        </Route> */}

        {/* File Board */}
        {/* <Route path="file">
          <Route index element={<FileBoard />} /> */}
          {/* <Route path="view/:id" element={<FileView />} /> */}
        {/* </Route> */}
        <Route path="classroom" element={<ClassRoom />}></Route>
      </Route>
    </Routes>
  </>) 
}

export default App;