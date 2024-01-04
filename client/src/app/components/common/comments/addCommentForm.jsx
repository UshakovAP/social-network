import React, { useState } from 'react';
import TextAreaField from '../form/textAreaField';
import { validator } from '../../../utils/validator';

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = target => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const validatorConfig = {
        content: {
            isRequired: {
                message: 'Сообщение не может быть пустым!',
            },
        },
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const clearForm = () => {
        setData({});
        setErrors({});
    };

    const handleSubmit = e => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    return (
        <div>
            <h2>Новый комментарий</h2>
            <form onSubmit={handleSubmit}>
                <TextAreaField
                    label="Сообщение"
                    name="content"
                    error={errors.content}
                    value={data.content || ''}
                    onChange={handleChange}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};

export default AddCommentForm;
