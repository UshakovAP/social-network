import React, { useEffect, useState } from 'react';
import { paginate } from '../../../utils/paginate';
import Pagination from '../../common/pagination';
import GroupList from '../../common/groupList';
import SearchStatus from '../../ui/searchStatus';
import UserTable from '../../ui/usersTable';
import _ from 'lodash';
import { useUser } from '../../../hooks/useUsers';
import { useProfessions } from '../../../hooks/useProfessions';
import { useAuth } from '../../../hooks/useAuth';

const UsersListPage = () => {
    const { users } = useUser();
    const { currentUser } = useAuth();
    const { isLoading: professionsLoading, professions } = useProfessions();
    const { getProfession } = useProfessions();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
    const [usersCopy, setUsersCopy] = useState(users);
    const pageSize = 8;

    const getProfessionName = professionId => {
        const prof = getProfession(professionId);
        return prof.name;
    };

    const handleDelete = userId => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };

    const handleToggleBookMark = id => {
        const newArray = usersCopy.map(user => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        setUsersCopy(newArray);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handleProfessionSelect = item => {
        if (searchQuery !== '') setSearchQuery('');
        setSelectedProf(item);
    };

    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined);
        setSearchQuery(target.value);
    };

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    const handleSort = item => {
        setSortBy(item);
    };

    if (usersCopy) {
        function filterUsers(data) {
            const filteredUsers = searchQuery
                ? data.filter(
                      user =>
                          user.name
                              .toLowerCase()
                              .indexOf(searchQuery.toLowerCase()) !== -1
                  )
                : selectedProf
                ? data.filter(
                      user =>
                          JSON.stringify(getProfessionName(user.profession)) ===
                          JSON.stringify(selectedProf.name)
                  )
                : data;
            return filteredUsers.filter(u => u._id !== currentUser._id);
        }

        const filteredUsers = filterUsers(usersCopy);

        const count = filteredUsers.length;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input
                        type="text"
                        name="searchQuery"
                        placeholder="Поиск по имени..."
                        value={searchQuery}
                        onChange={handleSearchQuery}
                    />
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return 'Загрузка...';
};

export default UsersListPage;
