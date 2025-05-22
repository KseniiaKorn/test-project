import { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';
import s from './AuthPage.module.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={s.authWrapper}>
      <div className={s.authBox}>
        <div className={`${s.formWrapper} ${isLogin ? s.show : ''}`}>
          <LoginForm />
        </div>
        <div className={`${s.formWrapper} ${!isLogin ? s.show : ''}`}>
          <RegistrationForm />
        </div>
      </div>

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Перейти до реєстрації' : 'У мене вже є акаунт'}
      </button>
    </div>
  );
};

export default AuthPage;