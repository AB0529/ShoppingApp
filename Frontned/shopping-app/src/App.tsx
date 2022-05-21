import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/home/home';

import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './pages/not-found/notFound';
import Login from './pages/login/login';
import { PrivateRoute } from './auth/PrivateRoute';

// TODO: Impliment cart
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<PrivateRoute />}>
          <Route path="/cart" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
