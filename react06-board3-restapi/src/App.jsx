import { Routes, Route, Outlet } from "react-router-dom";

import List from "./components/board/List";
import Write from "./components/board/Write";
import View from "./components/board/View";
import Edit from "./components/board/Edit";
import NotFound from "./components/common/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/list" element={<List />} />
      {/* 중첩라우팅으로 게시물의 일련번호가 하위경로 형태로 추가된다.
      이것을 useParams Hook을 통해 읽어올 수 있다. */}
      <Route path="/view" element={<Outlet />}>
        <Route path=":idx" element={<View />} />
      </Route>
      <Route path="/write" element={<Write />} />
      <Route path="/edit" element={<Outlet />}>
        <Route path=":idx" element={<Edit />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
