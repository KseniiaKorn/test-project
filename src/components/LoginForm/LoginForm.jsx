import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import s from './LoginForm.module.css'
import { loginThunk } from '../../redux/auth/operations';
import { FiMail, FiLock } from 'react-icons/fi';

const validationSchema = Yup.object().shape({
    email: Yup.string().max(64).email('Invalid email').required('Email is required'),
    password: Yup.string().min(8).max(64).required('Password is required'),
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
            toast.error(error.message || 'Login failed');
        } finally {
            resetForm(false);
        }
    };

    return (
        <div className={s.container}>
            <div className={s.wrap}>
                <h1 className={s.logo}>Spendy</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className={s.form}>
                        <div className={s.input}>
                        <label className={s.label}>
                            <span><FiMail /> E-mail</span>
                            <Field name="email" type="email" className={s.inputEmail} />
                            <ErrorMessage name="email" component="div" className={s.error} />
                        </label>
                        <label className={s.label}>
                            <span><FiLock /> Password</span>
                            <Field name="password" type="password" className={s.inputPass} />
                            <ErrorMessage name="password" component="div" className={s.error} />
                            </label>
                            </div>
                        <div className={s.button}>
                            <button type="submit" className={s.buttonLog}>Log in</button>

                            <Link to="/register">
                                <button type="button" className={s.registerButton}>
                                    Register
                                </button>
                            </Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default LoginForm;