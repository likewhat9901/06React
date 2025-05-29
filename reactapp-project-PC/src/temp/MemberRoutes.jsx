import { Route } from 'react-router-dom';
import RegisterPage from "./register/RegisterPage";
import LoginPage from "./login/LoginPage";
import EditPage from "./edit/EditPage";

const MemberRoutes = (
  <>
    <Route path='register' element={<RegisterPage />}></Route>
    <Route path='login' element={<LoginPage />}></Route>
    <Route path='edit' element={<EditPage />}></Route>
  </>
);

export default MemberRoutes;