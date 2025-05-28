import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home";
import BoardRoutes from "./board/BoardRoutes";
import MemberRoutes from "./member/MemberRoutes";

function App() {
  
  return (<>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="member">
          {MemberRoutes}
        </Route>
        <Route path="board">
          {BoardRoutes}
        </Route>
      </Route>
    </Routes>
  </>) 
}

export default App;