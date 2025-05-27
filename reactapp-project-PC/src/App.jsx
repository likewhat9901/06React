import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import BoardRoutes from "./board/BoardRoutes";
import LoginRoutes from "./member/login/LoginRoutes";
import RegisterRoutes from "./member/register/RegisterRoutes";

function App() {
  
  return (<>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="member">
          {RegisterRoutes}
          {LoginRoutes}
        </Route>
        <Route path="board">
          {BoardRoutes}
        </Route>
      </Route>
    </Routes>
  </>) 
}

export default App;