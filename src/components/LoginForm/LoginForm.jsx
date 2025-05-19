import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import s from './LoginForm.module.css'
import { loginThunk } from '../../redux/auth/operations';
import SvgIcon from '../SvgIcon';

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
            const message = error?.response?.data?.message || error.message || 'Login failed';
            toast.error(message);
        } finally {
            resetForm();
        }
    };

    return (
        <div className={s.container}>
            <div className={s.wrap}>
                <span>
                    <SvgIcon iconId="icon-Wallet" className={s.iconWallet} />
                </span>
                <h1 className={s.logo}>Spendy</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className={s.form}>
                        <div className={s.inputContainer}>
                            <div className={s.inputWrap}>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="E-mail"
                                    className={s.input} />
                                <SvgIcon iconId="icon-Email" className={s.icon} />
                            </div>
                            <ErrorMessage name="email" component="span" className={s.error} />
                        </div>

                        <div className={s.inputContainer}>
                            <div className={s.inputWrap}>
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className={s.input} />
                                <SvgIcon iconId="icon-Lock" className={s.icon} />
                            </div>
                            <ErrorMessage name="password" component="div" className={s.error} />
                        </div>

                        <div className={s.button}>
                            <button type="submit" className={s.buttonLog}>Log in</button>
                            <Link to="/register" className={s.registerBtn}>
                                Register
                            </Link>
                        </div>
                    </Form>
                </Formik>
                <img src="/public/images/wallet.png" alt="Wallet" className={s.walletImage} />
            </div>
        </div>
    );
};

export default LoginForm;