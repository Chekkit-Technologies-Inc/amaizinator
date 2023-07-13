import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CgSpinner } from 'react-icons/cg';
import styles from '../../Interaction.module.css';

const Button = ({ text, className, onClick, type, disabled, variant }) => {
  const [clicked, setClicked] = useState(false);
  const response = useSelector(state => state.response);

  useEffect(() => {
    if (!response.loading && clicked) {
      setClicked(false);
    } // eslint-disable-next-line
  }, [response]);

  const handleClick = () => {
    setClicked(true);
    if (onClick) {
      onClick();
    }
  };

  return (

      <button
        disabled={disabled}
        type={type}
        onClick={handleClick}
        className={`${styles.button_cover} w-full p-1 text-lg rounded-xl text-white curly ${className && className} ${disabled ? 'pointer-events-none opacity-80' : ''}`}
      >
        <div className={`${!disabled ? styles.button : ''} px-4 py-3`}>
        {!response.loading && <div className={`px-2 font-semibold text-center`}>{text}</div>}
        {response.loading && !clicked && <div className={`px-2 font-semibold text-center opacity-50 pointer-events-none`}>{text}</div>}
        {response.loading && clicked && (
          <div className='flex justify-center'>
            <CgSpinner className={`font-semibold animate-spin`} size={20} />
          </div>
        )}
        </div>
      </button>

  );
};

export default Button;
