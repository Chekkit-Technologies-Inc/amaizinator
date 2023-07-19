import React, {useState, useEffect} from 'react';

import {BsTelephoneFill, BsEyeFill, BsEyeSlashFill} from 'react-icons/bs'
import {HiLockClosed, HiUser} from 'react-icons/hi'
import { FiSearch } from 'react-icons/fi';
import {ReactComponent as CalIcon} from '../../assets/calendar-nocolor.svg'


const InputBox = ({ onValueChange, value, inputType, placeholder, name, className, readOnly }) => {
  const [typex, setTypex] = useState('');

  useEffect(() => {
    setTypex(inputType);
  }, [inputType]);

  // const onCodeChange = code => {
  //   dispatch(UserActions.updateUser({ code }));
  // };

  return (
    <>
        <div className={`px-4 my-2 ${inputType === 'search' ? 'rounded-xl' : 'rounded-3xl'} max-w-2xl w-full flex items-center z-10 ${className} overflow-hidden font-semibold`}>
        {(name === 'name' || name === 'full_name') && (
          <HiUser
            className={`opacity-90 select-none flex-shrink-0 text-sm text-gray-400`}
          />
        )}
        {typex === 'search' && <FiSearch className={`opacity-90 select-none flex-shrink-0 text-sm text-gray-400`} />}
        {typex === 'phone_number' && (
          <BsTelephoneFill
            className={`opacity-90 select-none flex-shrink-0 text-xs text-gray-400`}
          />
        )}
        {typex === 'date' && (
          <CalIcon
            className={`opacity-90 select-none flex-shrink-0 text-xs text-gray-400`}
          />
        )}
        {(typex === 'password' || typex === 'textx') && (
          <HiLockClosed
            className={`opacity-90 select-none flex-shrink-0 text-xs text-gray-400`}
          />
        )}
          <input
            name={name}
            value={value}
            type={inputType === 'phone_number' ? 'number' : typex === 'textx' ? 'text' : inputType}
            onChange={onValueChange}
            className={`h-full focus:outline-none mr-2 ml-4 my-4 w-full bg-transparent`}
            placeholder={placeholder}
            required={true}
            spellCheck={false}
            readOnly={readOnly}
          />
          {typex === 'password' && (
              <BsEyeSlashFill
                onClick={() => setTypex('textx')}
                className={`cursor-pointer opacity-90 select-none flex-shrink-0 text-sm text-gray-400`}
              />
            )}
            {typex === 'textx' && (
              <BsEyeFill
                onClick={() => setTypex('password')}
                className={`cursor-pointer opacity-90 select-none flex-shrink-0 text-sm text-gray-400`}
              />
            )}
        </div>
    </>
  );
};

export default InputBox;
