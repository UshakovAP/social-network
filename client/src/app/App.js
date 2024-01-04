import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Users from './layouts/users';
import Login from './layouts/login';
import Main from './layouts/main';
import NavBar from './components/ui/navBar';
import { ProfessionProvider } from './hooks/useProfessions';
import { QualitiesProvider } from './hooks/useQualities';
import AuthProvider from './hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logOut';

function App() {
    return (
        <div>
            <AuthProvider>
                <NavBar />

                <QualitiesProvider>
                    <ProfessionProvider>
                        <Routes>
                            <Route
                                path={'/users/:userId?/:edit?'}
                                element={<ProtectedRoute component={Users} />}
                            />
                            <Route path={'/login/:type?'} element={<Login />} />
                            <Route path="/logout" element={<LogOut />} />
                            <Route path={'/'} exact element={<Main />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>

            <ToastContainer />
        </div>
    );
}

export default App;
