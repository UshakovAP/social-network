import React from 'react';

const BookMark = ({ status, ...rest }) => {
    return (
        <button type="button" {...rest}>
            <i className={'bi bi-bookmark' + (status ? '-heart-fill' : '')}></i>
        </button>
    );
};

export default BookMark;
