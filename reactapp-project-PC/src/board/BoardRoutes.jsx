import { Route } from 'react-router-dom';
import MainBoard from './MainBoard';
import QnABoard from './QnABoard';
import FileBoard from './FileBoard';
import MainView from './view/MainView';
import QnAView from './view/QnAView';
import FileView from './view/FileView';

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
