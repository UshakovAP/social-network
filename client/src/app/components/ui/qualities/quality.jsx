import React from 'react';
import { useQualities } from '../../../hooks/useQualities';

const Quality = ({ id }) => {
    const { getQuality } = useQualities();
    const { _id, color, name } = getQuality(id);

    return (
        <span className={'badge m-1 bg-' + color} key={_id}>
            {name}
        </span>
    );
};

export default Quality;
