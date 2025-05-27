import { Route } from 'react-router-dom';
import LoginPage from "./LoginPage";

const LoginRoutes = (
  <>
    <Route path='login'>
      <Route index element={<LoginPage />} />
    </Route>
  </> 
);

export default LoginRoutes;