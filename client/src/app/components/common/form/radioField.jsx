import React from 'react';

const RadioField = ({ options, name, label, value, onChange }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <div>
                {options.map(option => (
                    <div
                        className="form-check form-check-inline"
                        key={option.name + '_' + option.value}
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name={name}
                            id={option.name + '_' + option.value}
                            value={option.value}
                            onChange={handleChange}
                            checked={option.value === value}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={option.name + '_' + option.value}
                        >
                            {option.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioField;
