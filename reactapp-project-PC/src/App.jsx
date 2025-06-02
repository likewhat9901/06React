import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Register from "./pages/members/Register";
import Login from "./pages/members/Login";
import EditProfile from "./pages/members/EditProfile";
import BoardLists from "./pages/boards/BoardLists";
import BoardWrite from "./pages/boards/BoardWrite";
import BoardView from "./pages/boards/BoardView";
import BoardEdit from "./pages/boards/BoardEdit";


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
          <Route path="lists" element={<BoardLists />} />
          <Route path="write" element={<BoardWrite />} />
          <Route path="view/:id" element={<BoardView />} />
          <Route path="edit/:id" element={<BoardEdit />} />
        </Route>
        
      </Route>
    </Routes>
  </>) 
}

export default App;