import { Route } from 'react-router-dom';
import RegisterPage from "./register/RegisterPage";
import LoginPage from "./login/LoginPage";
import EditPage from "./edit/EditPage";

const MemberRoutes = (
  <>
    <Route path='register'>
      <Route index element={<RegisterPage />} />
    </Route>
    <Route path='login'>
      <Route index element={<LoginPage />} />
    </Route>
    <Route path='edit'>
      <Route index element={<EditPage />} />
    </Route>
  </>
);

export default MemberRoutes;