import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FadeIn from 'react-fade-in/lib/FadeIn';
import NinjaOne from '../../../assets/ninja-1.svg'
import NinjaTwo from '../../../assets/ninja-2.svg'
import NinjaThree from '../../../assets/ninja-3.svg'
import NinjaFour from '../../../assets/ninja-4.svg'
import NinjaFive from '../../../assets/ninja-5.svg'
import CaptainBones from '../../../assets/captain-bones.svg'
import CurlyArrow from '../../../assets/curly-arrow.svg'

import Button from '../../../components/button/button';

const Welcome = ({ className }) => {
  const history = useHistory()

  return (
    <div className={`${className} flex-1 p-4 flex flex-col justify-end`}>
      <FadeIn className='grid grid-cols-5 gap-1 relative top-10'>
        <img className='relative top-6 w-32' src={NinjaOne} alt="" />
        <img className='relative w-32' src={NinjaTwo} alt="" />
        <img className='relative w-32' src={NinjaThree} alt="" />
        <img className='relative w-32' src={NinjaFour} alt="" />
        <img className='relative top-2 w-32' src={NinjaFive} alt="" />
      </FadeIn>
      <div className='bg-yellow-100 rounded-3xl border-b-4 border-yellow-300 p-4 pt-0 text-center flex flex-col'>
        <FadeIn className='mt-12 curly font-semibold text-gray-800'>
          <div className='text-base'>Welcome, Amaizinator!</div>
          <div className='leading-6 tracking-wide text-sm'>
Join Captain Amaizing, a smart, fun-loving character who is passionate about health and inspiring kids like you to become Amaizing! With the Power of 4 in the Amaizing Day Cereal as his superpower, Captain Amaizing is here to guide you on an exciting journey.</div>
          <div className='leading-6 tracking-wide pt-2 text-sm'>
          Amaizinators, like yourself, are fortified, nurtured, and empowered with the "Power of 4": dietary fiber, vitamin A, calcium, and protein. These essential nutrients are carefully packed into every serving of the Amaizing Day Cereal, keeping you Amaizing Always!
          </div>
        </FadeIn>

        <div className='h-90 sm:h-72 opacity-100 flex flex-col justify-end relative'>

          <img className='w-32 absolute top-4' src={CaptainBones} alt="" />
          <img className='w-20 absolute top-0 right-12' src={CurlyArrow} alt="" />

          <div style={{background: 'rgba(140, 197, 63, 0.8)', fontSize: '16px'}} className='rounded-3xl p-4 text-white font-semibold leading-6 tracking-wide curly bg-opacity-50 z-10 h-60 sm:h-auto overflow-auto text-sm'>
            <div>Are you ready to unlock your inner superhero and join Captain Amaizing in his mission? Together, we will embark on thrilling adventures that will make you even more Amaizing!</div>
            <div>
            Click the button below to get started and let the excitement begin!
            </div>
          </div>

        </div>
        <Button onClick={() => history.push('/app/prizes')} className={'mt-6 text-xl font-semibold sm:w-80 mx-auto'} text={'Start My Amazing Journey'} />
      </div>
    </div>
  );
};

export default Welcome;
