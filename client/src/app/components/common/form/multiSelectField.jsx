import React from 'react';
import Select from 'react-select';

const MultiSelectField = ({ options, defaultValue, onChange, name, label }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === 'object'
            ? Object.keys(options).map(optionName => ({
                  label: options[optionName].name,
                  value: options[optionName]._id,
              }))
            : options;

    const handleChange = value => {
        onChange({ name: name, value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                className="basic-multi-select"
                classNamePrefix="select"
                isMulti
                closeMenuOnSelect={false}
                name={name}
                options={optionsArray}
                defaultValue={defaultValue}
                onChange={handleChange}
            />
        </div>
    );
};

export default MultiSelectField;
