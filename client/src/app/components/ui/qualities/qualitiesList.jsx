import React from 'react';
import Quality from './quality';
import { useQualities } from '../../../hooks/useQualities';

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (isLoading) return 'Загрузка...';

    return (
        <>
            <div className="d-flex flex-column">
                {qualities.map(quality => (
                    <Quality key={quality} id={quality} />
                ))}
            </div>
        </>
    );
};

export default QualitiesList;
