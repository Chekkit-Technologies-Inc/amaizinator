import React from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Carousel } from 'rsuite';

import Button from '../../../components/button/button';
import {ReactComponent as DailyReward} from '../../../assets/daily-reward.svg'
import {ReactComponent as WeeklyReward} from '../../../assets/weekly-reward.svg'
import OverallReward from '../../../assets/overall-reward.svg'
import {ReactComponent as RewardAirtime} from '../../../assets/reward-airtime.svg'
import RewardGiftbag from '../../../assets/reward-gift-bag.svg'
import RewardPS5 from '../../../assets/reward-ps5.svg'
import RewardIpad from '../../../assets/reward-ipad.svg'
import RewardScholarship from '../../../assets/reward-scholarship.svg'
import RewardBycicle from '../../../assets/reward-bycicle.svg'

import useDocumentTitle from '../../../hooks/use-document-title';


const Prizes = ({ className }) => {
  const history = useHistory()
  useDocumentTitle('Prizes')

  return (
    <div className={`${className} flex-1 p-4 flex flex-col text-white`}>
      <div className='font-semibold text-lg cursor-pointer' onClick={() => history.goBack()}>
        &larr;
      </div>
      <FadeIn className='my-2 font-semibold text-xl curly'>Here are the prizes to be won</FadeIn>
      <FadeIn className='pb-32 space-y-6'>

        <div className='-space-y-8'>

          <div className='h-52'>
            <DailyReward alt='' className='w-full' />
          </div>
          <div className='bg-yellow-100 rounded-3xl border-b-4 border-yellow-300 p-4 text-center flex flex-col w-72 mx-auto py-8 space-y-4'>
            <div className='mx-auto pt-4'>
              <RewardAirtime alt='' />
            </div>
            <div className='text-green_dark font-semibold text-xl'>₦100 Airtime</div>
            <div className='text-gray-800 font-medium'><b>1,250</b> winners of this airtime across the next <b>20 days</b>, Only Top ranking <b>62</b> users will be rewarded and disbursement is after <b>11 PM</b> every winning weekday.</div>
          </div>
        </div>

        <div className='-space-y-8'>
          <div className='h-52'>
            <WeeklyReward alt='' className='w-full' />
          </div>
          <div className='bg-yellow-100 rounded-3xl border-b-4 border-yellow-300 p-4 text-center flex flex-col w-72  mx-auto py-8 space-y-4'>
            <div className='mx-auto w-3/4 h-36 pt-2'>
              <img src={RewardGiftbag} alt='' />
            </div>
            <div className='text-green_dark font-semibold text-xl'>₦5,000 Gift pack</div>
            <div className='text-gray-800 font-medium'><b>100</b> winners of this gift pack for <b>4</b> weekends. Only Top ranking <b>25</b> users will be rewarded every weekend and disbursement is after <b>11 PM</b> every Saturday Night.</div>
          </div>
        </div>

        <div className='-space-y-8'>
          <div className='h-52'>
            <img src={OverallReward} alt='' className='w-full' />
          </div>
          <div className='bg-yellow-100 rounded-3xl border-b-4 border-yellow-300 p-4 text-center flex flex-col w-72 mx-auto py-8 space-y-4'>

            <Carousel as={'div'} autoplay className="custom-slider">
              <div>
                <div className='text-gray-800 font-medium'>Top Ranking <b>20</b> overall winners will be selected at the end of the campaign for the grand finale and rewarded with:</div>
                <div className='mx-auto w-3/4 h-36 my-3'>
                  <img src={RewardPS5} alt='' />
                </div>
                <div className='text-green_dark font-semibold text-lg'>PS5 - 2 winners</div>
                <div className='text-gray-800 font-medium text-xs'>First Top <b>2</b> Ranks</div>
              </div>
              <div>
                <div className='text-gray-800 font-medium'>Top Ranking <b>20</b> overall winners will be selected at the end of the campaign for the grand finale and rewarded with:</div>
                <div className='mx-auto w-3/4 h-36 my-3'>
                  <img src={RewardIpad} alt='' />
                </div>
                <div className='text-green_dark font-semibold text-lg'>iPad - 2 winners</div>
                <div className='text-gray-800 font-medium text-xs'>Next Top <b>2</b> Ranks</div>
              </div>
              <div>
                <div className='text-gray-800 font-medium'>Top Ranking <b>20</b> overall winners will be selected at the end of the campaign for the grand finale and rewarded with:</div>
                <div className='mx-auto w-3/4 h-36 my-3'>
                  <img src={RewardScholarship} alt='' />
                </div>
                <div className='text-green_dark font-semibold text-lg'>Scholarships worth N250k - 9 winners</div>
                <div className='text-gray-800 font-medium text-xs'>Next Top <b>9</b> Ranks</div>
              </div>
              <div>
                <div className='text-gray-800 font-medium'>Top Ranking <b>20</b> overall winners will be selected at the end of the campaign for the grand finale and rewarded with:</div>
                <div className='mx-auto w-3/4 h-36 my-3'>
                  <img src={RewardBycicle} alt='' />
                </div>
                <div className='text-green_dark font-semibold text-lg'>Scooters/Bicycle - 7 winners</div>
                <div className='text-gray-800 font-medium text-xs'>Next Top <b>7</b> Ranks</div>
              </div>
            </Carousel>
          </div>
        </div>


      </FadeIn>
      <div className='w-80 mx-auto fixed bottom-0 right-0 left-0 p-6'><Button onClick={() => history.push('/app/login')} className={'text-xl font-semibold'} text={'Yay! let’s go'} /></div>
    </div>
  );
};

export default Prizes;
