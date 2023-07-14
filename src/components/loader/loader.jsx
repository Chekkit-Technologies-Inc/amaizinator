import React from 'react';
import { CgSpinner } from 'react-icons/cg';

const Loader = ({className}) => {
  return (
    <div className={`absolute top-0 bottom-0 left-0 right-0 z-20 flex justify-center items-center`}>
      <CgSpinner className={`animate-spin text-yellow_dark ${className}`} size={64} />
    </div>
  );
};

export default Loader;
