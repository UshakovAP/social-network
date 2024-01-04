import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div className="dropdown me-5" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    className="img-responsive rounded-circle"
                    src={currentUser.image}
                    height="40"
                    alt=""
                />
            </div>
            <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
                <Link
                    className="dropdown-item"
                    to={`/users/${currentUser._id}`}
                >
                    Профиль
                </Link>
                <Link className="dropdown-item" to="/logout">
                    Выход
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
