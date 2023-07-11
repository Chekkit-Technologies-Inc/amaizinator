import React from 'react';

const SelectBox = ({ name, value, options, onValueChange, placeholder }) => {
  return (
    <select
      className={`rounded-xl focus:outline-none my-2 p-4 w-full bg-transparent border focus:border-primary max-w-2xl flex items-center z-10`}
      spellCheck={false}
      placeholder={placeholder}
      name={name}
      onChange={onValueChange}
      value={value ? value : ''}
      required
    >
      {/* <option disabled>{placeholder ? placeholder : `Select option`}</option> */}
      {options &&
        options.length > 0 &&
        options.map((option, idx) => {
          return (
            <option key={idx} value={option}>
              {option}
            </option>
          );
        })}
    </select>
  );
};

export default SelectBox;
