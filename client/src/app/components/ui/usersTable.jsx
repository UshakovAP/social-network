import React from 'react';
import BookMark from '../common/bookmark';
import Qualities from './qualities';
import Table from '../common/table';
import { Link } from 'react-router-dom';
import Profession from './profession';

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete,
    ...rest
}) => {
    const columns = {
        name: {
            path: 'name',
            name: 'Имя',
            component: user => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            ),
        },
        qualities: {
            name: 'Качества',
            component: user => <Qualities qualities={user.qualities} />,
        },
        professions: {
            name: 'Профессия',
            component: user => <Profession id={user.profession} />,
        },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Встретился, раз',
        },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: user => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            ),
        },
        // delete: {
        //     component: user => (
        //         <button
        //             className="btn btn-danger"
        //             type="button"
        //             onClick={() => onDelete(user._id)}
        //         >
        //             Удалить
        //         </button>
        //     ),
        // },
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

export default UsersTable;
