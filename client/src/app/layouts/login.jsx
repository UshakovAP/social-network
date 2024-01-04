import React, { useState } from 'react';
import LoginForm from '../components/ui/loginForm';
import { useParams } from 'react-router-dom';
import RegisterForm from '../components/ui/registerForm';

const Login = () => {
    const { type } = useParams();

    const [formType, setFormType] = useState(
        type === 'register' ? type : 'login'
    );

    const toggleFormType = () => {
        setFormType(prevState =>
            prevState === 'register' ? 'login' : 'register'
        );
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === 'register' ? (
                        <>
                            <h3 className="mb-4">Зарегистрироваться</h3>
                            <RegisterForm />
                            <a
                                className="d-flex justify-content-center mt-3 text-body text-decoration-none"
                                role="button"
                                onClick={toggleFormType}
                            >
                                Уже зарегистрированы? Войти
                            </a>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Войти</h3>
                            <LoginForm />
                            <a
                                className="d-flex justify-content-center mt-3 text-body text-decoration-none"
                                role="button"
                                onClick={toggleFormType}
                            >
                                У вас нет учетной записи? Зарегистрируйтесь!
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
