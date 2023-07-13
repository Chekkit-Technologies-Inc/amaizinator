import React from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import Button from '../../../components/button/button';
import DailyReward from '../../../assets/daily-reward.svg'
import WeeklyReward from '../../../assets/weekly-reward.svg'
import OverallReward from '../../../assets/overall-reward.svg'
import RewardAirtime from '../../../assets/reward-airtime.svg'
import RewardGiftbag from '../../../assets/reward-gift-bag.svg'
import RewardPS5 from '../../../assets/reward-ps5.svg'


const Prizes = ({ className }) => {
  const history = useHistory()

  return (
    <div className={`${className} flex-1 p-4 flex flex-col text-white`}>
      <div className='font-semibold text-lg cursor-pointer' onClick={() => history.goBack()}>
        &larr;
      </div>
      <FadeIn className='my-2 font-semibold text-xl curly'>Here are the prizes to be won</FadeIn>
      <FadeIn className='pb-32'>

        <div>
          <img src={DailyReward} alt='' className='w-full relative top-8' />
          <div className='bg-yellow-100 rounded-3xl border-b-4 border-yellow-300 p-4 text-center flex flex-col w-72 mx-auto py-8 space-y-4'>
            <img src={RewardAirtime} alt='' className='mx-auto w-3/4' />
            <div className='text-green_dark font-semibold text-xl'>₦100 Airtime</div>
            <div className='text-gray-800 font-medium'><b>1,250</b> winners of this airtime across the next <b>20 days</b>, To win, be part of the people with top points.</div>
          </div>
        </div>

        <div>
          <img src={WeeklyReward} alt='' className='w-full relative top-8' />
          <div className='bg-yellow-100 rounded-3xl border-b-4 border-yellow-300 p-4 text-center flex flex-col w-72  mx-auto py-8 space-y-4'>
            <img src={RewardGiftbag} alt='' className='mx-auto w-3/4' />
            <div className='text-green_dark font-semibold text-xl'>₦5,000 Gift pack</div>
            <div className='text-gray-800 font-medium'><b>100</b> winners of this gift pack for <b>4 weekends</b>.
To win, be part of the people with top points.</div>
          </div>
        </div>

        <div>
          <img src={OverallReward} alt='' className='w-full relative top-8' />
          <div className='bg-yellow-100 rounded-3xl border-b-4 border-yellow-300 p-4 text-center flex flex-col w-72 mx-auto py-8 space-y-4'>
            <img src={RewardPS5} alt='' className='mx-auto w-3/4' />
            <div className='text-green_dark font-semibold text-xl'>PS5 - 2 winners</div>
            <div className='text-gray-800 font-medium'><b>20</b> overall winners will be selected at the end of the campaign for the grand finale and rewarded with:</div>
          </div>
        </div>


      </FadeIn>
      <div className='w-80 mx-auto fixed bottom-0 right-0 left-0 p-6'><Button onClick={() => history.push('/app/register')} className={'text-xl font-semibold'} text={'Yay! let’s go'} /></div>
    </div>
  );
};

export default Prizes;
