import { Route } from 'react-router-dom';
import RegisterPage from "./RegisterPage";

const RegisterRoutes = (
  <>
    <Route path='register'>
      <Route index element={<RegisterPage />} />
    </Route>
  </> 
);

export default RegisterRoutes;