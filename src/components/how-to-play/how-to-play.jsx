import React, {useEffect, useRef, useState} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import {MdClose} from 'react-icons/md'
import {BsArrowRightShort, BsArrowLeftShort} from 'react-icons/bs'
import Slider from "react-slick";

import {ReactComponent as Trivia} from '../../assets/lion-king.svg'
import {ReactComponent as Games} from '../../assets/astro-kids.svg'
import Receipt from '../../assets/receipt2.svg'
import Rewards from '../../assets/rewards.svg'

const settings = {
  dots: true,
  arrows: false,
  infinite: false
};

const HowToPlay = ({ className, setOpen }) => {
  const slider = useRef();
  const [index, setIndex] = useState(0)

  useEffect(() => {
    console.log('slider', slider)
  }, [slider])

  return (
    <div style={{zIndex: 50000}} className={`bg-green_dark overflow-auto fixed top-0 right-0 left-0 bottom-0 text-white flex flex-col gap-4 ${className}`}>
      <FadeIn className='my-6 font-semibold text-2xl text-center curly'>How To Earn Points</FadeIn>
      <MdClose onClick={() => setOpen(false)} className='fixed right-4 top-4 text-white cursor-pointer' size={20} />
      <div className='fixed right-4 bottom-6 z-30' onClick={() => {
        if (index === 3) {
          setOpen(false)
        } else {
          slider.current.slickGoTo(index + 1)
        }
      }}>
        <BsArrowRightShort className='bg-white  cursor-pointer text-green_dark h-10 w-10 p-2 rounded-full' size={26} />
      </div>
      {index > 0 && <div className='fixed left-4 bottom-6' onClick={() => slider.current.slickGoTo(index - 1)}>
        <BsArrowLeftShort className='bg-white  cursor-pointer text-green_dark h-10 w-10 p-2 rounded-full' size={26} />
      </div>}
      <div className='p-6 flex-1 flex flex-col justify-end items-center'>
        <div className='max-w-md w-full h-full py-6'>
          <Slider afterChange={i => setIndex(i)} ref={slider} className="h-full flex items-end pb-32" {...settings}>
            <FadeIn className="h-99 flex-1 flex flex-col justify-center items-center gap-6">
              <div className='w-60 h-60'>
                <Trivia className='w-full h-full object-cover' />
              </div>
              <div className='font-bold text-3xl text-center'>Take Trivias</div>
              <p className='text-xl text-center'>Take tirvias to accumulate points.</p>
            </FadeIn>
            <FadeIn className="h-99 flex-1 flex flex-col justify-center items-center gap-6">
              <div className='w-60 h-60'>
                <Games className='w-full h-full object-cover' />
              </div>
              <h4 className='font-bold text-3xl text-center'>Play Games</h4>
              <p className='text-xl text-center'>Play games to accumulate points.</p>
            </FadeIn>
            <FadeIn className="h-99 flex-1 flex flex-col justify-center items-center gap-6">
              <div className='w-60 h-60 rounded-2xl overflow-hidden'>
                <img src={Receipt} alt='' className='w-full h-full object-cover' />
              </div>
              <h4 className='font-bold text-3xl text-center'>Scan Receipts</h4>
              <p className='text-xl text-center'>Scan receipts containing Amaizing Day products and date to accumulate points.</p>
            </FadeIn>
            <FadeIn className="h-99 flex-1 flex flex-col justify-center items-center gap-6">
              <div className='w-60 h-60 rounded-2xl overflow-hidden'>
                <img src={Rewards} alt='' className='w-full h-full object-fit' />
              </div>
              <h4 className='font-bold text-3xl text-center'>Win Rewards</h4>
              <p className='text-xl text-center'>Rise on the leaderboard to win daily, weekly and overall prizes.</p>
            </FadeIn>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
