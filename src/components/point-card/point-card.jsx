import React from 'react';

import PointIcon from '../../assets/point.svg'

const PointCard = ({ point }) => {
  return (
    <div className={`p-6 bg-cloud rounded-2xl flex items-center space-x-2 text-white font-semibold text-base h-24`}>
      <div className='bg-white w-8 h-8 flex justify-center items-center p-1 rounded-lg'>
        <img className='w-5' src={PointIcon} alt="" />
      </div>
      <div className='flex items-center space-x-1'>
        <div>{point}</div>
        <div className='text-sm font-semibold'>points</div>
      </div>
    </div>
  );
};

export default PointCard;
