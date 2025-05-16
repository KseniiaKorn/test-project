import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import  LoginForm  from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import { selectIsLoggedIn } from './redux/auth/selectors';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';

export default function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginForm />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <RegisterForm />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />}
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
