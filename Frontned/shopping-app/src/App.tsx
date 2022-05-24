import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/home/home';
import NotFound from './pages/not-found/notFound';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Profile from './pages/profile/profile';
import { PrivateRoute } from './auth/PrivateRoute';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme/theme';
import { GlobalStyles } from './components/GlobalStyle';
import { useTheme } from './components/UseTheme';
import Toggle from './components/ThemeToggler';
import { authenticationService } from './auth/AuthService';
import { useEffect } from 'react';

// TODO: Impliment cart
function App() {
  const [theme, themeToggler] = useTheme();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  // Refresh login
  useEffect(() => {
    authenticationService.checkLogin();
  }, [])
  

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<PrivateRoute />}>
                <Route path="/cart" element={<NotFound />} />
              </Route>
              <Route path="/profile" element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
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
