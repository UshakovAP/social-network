import React from 'react';
import { useProfessions } from '../../hooks/useProfessions';

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();
    const prof = getProfession(id);

    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return 'Загрузка...';
};

export default Profession;
