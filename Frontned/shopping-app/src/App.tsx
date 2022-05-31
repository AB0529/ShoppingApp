import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import { PrivateRoute } from './auth/PrivateRoute';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme/theme';
import { GlobalStyles } from './components/GlobalStyle';
import { useTheme } from './components/UseTheme';

import Home from './pages/home';
import NotFound from './pages/notFound';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile/profile';
import Toggle from './components/ThemeToggler';
import Catalog from './pages/catalog';
import ShoppingCart from './pages/cart';
import Checkout from './pages/checkout';
import AboutPage from './pages/aboutPage';
import { AdminRoute } from './auth/AdminRoute';
import AdminPage from './pages/admin/adminPage';


function App() {
  const [theme, themeToggler] = useTheme();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin" element={<AdminRoute />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>
              <Route path="/cart" element={<PrivateRoute />}>
                <Route path="/cart" element={<ShoppingCart />} />
              </Route>
              <Route path="/profile" element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/checkout" element={<PrivateRoute />}>
                <Route path="/checkout" element={<Checkout />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toggle theme={theme} toggleTheme={themeToggler} />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
