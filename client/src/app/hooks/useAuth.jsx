import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import userService from '../services/user.service';
import localStorageService, {
    setTokens,
} from '../services/localStorage.service';
import { useNavigate } from 'react-router-dom';

export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY,
    },
});

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    async function signIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                `accounts:signInWithPassword`,
                {
                    email,
                    password,
                    returnSecureToken: true,
                }
            );
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                switch (message) {
                    case 'INVALID_LOGIN_CREDENTIALS':
                        throw new Error(
                            'Пользователя с такими данными не существует!'
                        );
                    default:
                        throw new Error(
                            'Слишком много попыток входа. Попробуйте позже!'
                        );
                }
            }
        }
    }

    function logOut() {
        localStorageService.removeAuthData();
        setCurrentUser(null);
        navigate('/');
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async function updateUserData(data) {
        try {
            const { content } = await userService.update(data);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function signUp({ email, password, ...rest }) {
        const generateAvatarName = () => {
            const avatarNames = [
                'George',
                'Baby',
                'Cleo',
                'Sheba',
                'Oscar',
                'Mimi',
                'Princess',
                'Lucy',
                'Charlie',
                'Annie',
                'Sugar',
                'Snuggles',
                'Cali',
                'Leo',
                'Luna',
                'Rascal',
                'Molly',
                'Oreo',
                'Bella',
                'Gizmo',
            ];
            return avatarNames[Math.floor(Math.random() * avatarNames.length)];
        };

        try {
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true,
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${generateAvatarName()}.svg`,
                ...rest,
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errorObject = {
                        email: 'Пользователь с таким Email уже существует',
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider
            value={{ signUp, signIn, currentUser, logOut, updateUserData }}
        >
            {!isLoading ? children : 'Загрузка...'}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
