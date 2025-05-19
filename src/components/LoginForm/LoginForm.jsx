import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import s from './LoginForm.module.css'
import { loginThunk } from '../../redux/auth/operations';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .max(64, 'Max 64 characters')
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Min 8 characters')
        .max(64, 'Max 64 characters')
        .required('Password is required'),
});

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const result = await dispatch(loginThunk(values)).unwrap();
            toast.success(`Welcome, ${result.user.userName}`);
            navigate('/dashboard');
        } catch (error) {
            const message = error?.response?.data?.message || error.message || 'Login failed';
            toast.error(message);
        } finally {
            resetForm();
        }
    };

    return (
        <div className={s.container}>
            <div className={s.wrap}>
                <img src="/src/images/logo.svg" className={s.logo} />
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className={s.form}>
                        <div className={s.inputContainer}>
                            <Field name="email">
                                {({ field, meta }) => (
                                    <div className={s.inputWrap}>
                                        <input
                                            {...field}
                                            type="email"
                                            placeholder="E-mail"
                                            className={
                                                meta.touched && meta.error
                                                    ? `${s.input} ${s.errorInput}`
                                                    : s.input
                                            }
                                        />
                                        <svg width="24" height="24" className={s.icon}>
                                            <use href="/icons.svg#icon-email"></use>
                                        </svg>
                                        {meta.touched && meta.error && (
                                            <span className={s.error}>{meta.error}</span>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>

                        <div className={s.inputContainer}>
                            <Field name="password">
                                {({ field, meta }) => (
                                    <div className={s.inputWrap}>
                                        <input
                                            {...field}
                                            type="password"
                                            placeholder="Password"
                                            className={
                                                meta.touched && meta.error
                                                    ? `${s.input} ${s.errorInput}`
                                                    : s.input
                                            }
                                        />
                                        <svg width="24" height="24" className={s.icon}>
                                            <use href="/icons.svg#icon-lock"></use>
                                        </svg>
                                        {meta.touched && meta.error && (
                                            <span className={s.error}>{meta.error}</span>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>

                        <div className={s.button}>
                            <button type="submit" className={s.buttonLog}>Log in</button>
                            <Link to="/register" className={s.registerBtn}>Register</Link>
                        </div>
                    </Form>
                </Formik>
                <img src="/src/images/background-picture/img-bg-log.png" alt="Wallet" className={s.walletImage} />
            </div>
        </div>
    );
};

export default LoginForm;