import React from 'react';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'

import {ReactComponent as CalIcon} from '../../assets/calendar.svg'

const SelectBox = ({ name, value, options, onValueChange, placeholder, className }) => {
  return (
    <div className={`rounded-3xl focus:outline-none ${name === 'filter' ? 'p-2' : 'my-2 p-4'}  w-full max-w-2xl flex items-center space-x-2 z-10 ${className}`}>
      {name === 'filter' && <CalIcon />}
      <select
      className='flex-1 focus:outline-none bg-transparent'
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
              <option className={idx === 0 ? 'text-gray-100' : ''} key={idx} value={option}>
                {option}
              </option>
            );
          })}
      </select>
      <MdOutlineKeyboardArrowDown size={20} className={`opacity-90 select-none flex-shrink-0 text-base text-green_light`} />
    </div>
  );
};

export default SelectBox;
