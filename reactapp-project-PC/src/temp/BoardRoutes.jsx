import { Route } from 'react-router-dom';
import MainBoard from '../pages/boards/MainBoard';
import QnABoard from '../pages/boards/QnABoard';
import FileBoard from '../pages/boards/FileBoard';
import MainView from '../pages/boards/view/MainView';
import QnAView from '../pages/boards/view/QnAView';
import FileView from '../pages/boards/view/FileView';

const BoardRoutes = (
    <>
      <Route index element={<MainBoard />} />
      <Route path="view/:id" element={<MainView />} />
      <Route path="qna">
        <Route index element={<QnABoard />} />
        <Route path="view/:id" element={<QnAView />} />
      </Route>
      <Route path="file">
        <Route index element={<FileBoard />} />
        <Route path="view/:id" element={<FileView />} />
      </Route>
    </>
);

export default BoardRoutes
