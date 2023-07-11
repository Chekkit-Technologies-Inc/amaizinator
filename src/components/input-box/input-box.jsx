import React from 'react';
import PhoneInput from 'react-phone-number-input/mobile';
import { useDispatch } from 'react-redux';

import { UserActions } from '../../states/actions';

const InputBox = ({ onValueChange, value, inputType, placeholder, name }) => {
  const dispatch = useDispatch();

  const onCodeChange = code => {
    dispatch(UserActions.updateUser({ code }));
  };

  return (
    <>
      {inputType === 'tel' && (
        <div className={`border border-primary pr-4 my-2 rounded-full max-w-2xl w-auto flex items-center z-10`}>
          <PhoneInput
            className='rounded-full focus:outline-none mr-2 ml-4 my-4 flex-1 bg-transparent phone-input min-w-0'
            defaultCountry='NG'
            onCountryChange={code => onCodeChange(code)}
            name={name}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onValueChange}
            spellCheck={false}
            required={true}
          />
        </div>
      )}
      {inputType !== 'tel' && (
        <div className={`border pr-4 my-2 rounded-xl max-w-2xl w-full flex items-center z-10`}>
          <input
            name={name}
            value={value}
            type={inputType}
            onChange={onValueChange}
            className={`h-full focus:outline-none mr-2 ml-4 my-4 w-full bg-transparent`}
            placeholder={placeholder}
            required={true}
            spellCheck={false}
          />
        </div>
      )}
    </>
  );
};

export default InputBox;
