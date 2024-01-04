import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const UserCard = ({ user }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();

    const handleClick = () => {
        navigate(location.pathname + '/edit');
    };

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

    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUser._id === user._id && (
                    <button
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleClick}
                    >
                        <i className="bi bi-gear"></i>
                    </button>
                )}

                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={user.image}
                        className="rounded-circle"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">
                            {user.profession.name}
                        </p>
                        <div className="text-muted">
                            <i
                                className="bi bi-caret-down-fill text-primary"
                                role="button"
                            ></i>
                            <i
                                className="bi bi-caret-up text-secondary"
                                role="button"
                            ></i>
                            <span className="ms-2">{user.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
