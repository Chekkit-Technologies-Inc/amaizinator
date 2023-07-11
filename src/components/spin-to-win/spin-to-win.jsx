import React from 'react';
import { Wheel } from 'react-custom-roulette';

import { ReactComponent as Center } from '../../assets/center-svg.svg';

const SpinToWin = ({ data, spinning, onSpinStop, prizeNumber }) => {
  return (
    <div className='inline-flex flex-col justify-center items-center relative overflow-hidden'>
      <Wheel
        prizeNumber={prizeNumber}
        mustStartSpinning={spinning}
        data={data}
        onStopSpinning={onSpinStop}
        radiusLineWidth={6}
        outerBorderWidth={6}
        outerBorderColor={'#fff'}
        radiusLineColor={'#fff'}
        innerBorderWidth={6}
        innerBorderColor={'#fff'}
        innerRadius={10}
        fontSize={15}
      />
      <div style={{ backgroundColor: '#46F7AD' }} className='absolute cursor-pointer flex justify-center items-center p-4 rounded-full'>
        <Center className='w-5 h-5 sm:w-6 sm:h-6' />
      </div>
    </div>
  );
};

const MemoizedSpinToWin = React.memo(SpinToWin);

export default MemoizedSpinToWin;
