import React, {useState, useEffect} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SelectBox from '../../../components/select-box'

import ThirdCrown from '../../../assets/crown-3.svg'
import ThirdCup from '../../../assets/cup-3.svg'
import ThirdWing from '../../../assets/wings-3.svg'
import SecondCrown from '../../../assets/crown-2.svg'
import SecondCup from '../../../assets/cup-2.svg'
import SecondWing from '../../../assets/wings-2.svg'
import FirstCrown from '../../../assets/crown-1.svg'
import FirstCup from '../../../assets/cup-1.svg'
import FirstWing from '../../../assets/wings-1.svg'

import useDocumentTitle from '../../../hooks/use-document-title';

import {getTodayDate, getWeeklyStartDate, getAllTimeStartDate} from '../../../util'

import {TriviaActions} from '../../../states/actions'

const Leaderboard = ({ className }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {leaderboard} = useSelector(state => state.trivia)
  const [filter,setFilter] = useState('Weekly')
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  })

  useDocumentTitle('Leaderboard')

  useEffect(() => {
    if (filter === 'Daily') {
      setDateRange({from: getTodayDate(), to: getTodayDate()})
    }
    if (filter === 'Weekly') {
      setDateRange({from: getWeeklyStartDate(), to: getTodayDate()})
    }
    if (filter === 'All Time') {
      setDateRange({from: getAllTimeStartDate(), to: getTodayDate()})
    }
  }, [filter])

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      dispatch(TriviaActions.fetchLeaderboard(dateRange.from, dateRange.to))
    }
    // eslint-disable-next-line
  }, [dateRange])

  useEffect(() => {
    console.log('leaderboard', leaderboard)
    // eslint-disable-next-line
  }, [leaderboard])


  return (
    <div className={`${className} flex-1 flex flex-col text-gray-800 space-y-6`}>
      <div className='font-semibold text-lg cursor-pointer px-4 pt-4' onClick={() => history.goBack()}>
        &larr;
      </div>

      <div className='flex items-center space-x-4 justify-between px-4'>
        <div className='font-bold text-lg'>Leaderboard</div>
        <div className='w-36 cursor-pointer'>
          <SelectBox
            className={`bg-yellow-100`}
            defaultValue={'Weekly'}
            onValueChange={e => setFilter(e.target.value)}
            value={filter}
            name={'filter'}
            options={['Daily','Weekly', 'All Time']}
          />
        </div>
      </div>

      <FadeIn className='p-4 py-8 grid grid-cols-3 items-end gap-6'>

        <div className='space-y-3 text-center flex flex-col items-center justify-center'>
          <div style={{opacity: .99}} className='relative'>
            <div className='bg-green_light text-white capitalize p-2 rounded-full w-16 h-16 flex justify-center items-center font-semibold text-2xl border-2 border-blue_second relative z-10'>
              <span>JA</span>
              <img className='absolute -top-7 -left-4' src={SecondCrown} alt="" />
              <img className='absolute -bottom-2' src={SecondCup} alt="" />
            </div>
            <img  className='absolute top-10' src={SecondWing} alt="" />
          </div>
          <div className='font-semibold text-green_dark'>Jack L. Gregory</div>
          <div className='text-gray-400 text-xs font-medium'>
            5000
          </div>
        </div>

        <div className='space-y-3 text-center flex flex-col items-center justify-center'>
          <div style={{opacity: .99}} className='relative'>
            <div className='bg-green_light text-white capitalize p-2 rounded-full w-24 h-24 flex justify-center items-center font-semibold text-3xl border-2 border-yellow_first relative z-10'>
              <span>JA</span>
              <img className='absolute -top-8 -left-4' src={FirstCrown} alt="" />
              <img className='absolute -bottom-2' src={FirstCup} alt="" />
            </div>
            <img style={{marginLeft: '6px'}}  className='absolute top-16' src={FirstWing} alt="" />
          </div>
          <div className='font-semibold text-green_dark'>Jack L. Gregory</div>
          <div className='text-gray-400 text-xs font-medium'>
            7000
          </div>
        </div>


        <div className='space-y-3 text-center flex flex-col items-center justify-center'>
          <div style={{opacity: .99}} className='relative'>
            <div className='bg-green_light text-white capitalize p-2 rounded-full w-16 h-16 flex justify-center items-center font-semibold text-2xl border-2 border-red_third relative z-10'>
              <span>JA</span>
              <img className='absolute -top-6 -left-2' src={ThirdCrown} alt="" />
              <img className='absolute -bottom-2' src={ThirdCup} alt="" />
            </div>
            <img style={{marginLeft: '2.7px'}} className='absolute top-10' src={ThirdWing} alt="" />
          </div>
          <div className='font-semibold text-green_dark'>Jack L. Gregory</div>
          <div className='text-gray-400 text-xs font-medium'>
            2000
          </div>
        </div>
      </FadeIn>


      <div className='space-y-4 p-4 pb-12 bg-green_dark flex-1 rounded-t-3xl'>

        <div className='flex items-center space-x-4 justify-between bg-white rounded-2xl p-3'>
          <div className='flex items-center space-x-4'>
            <div className='bg-green_lightx capitalize p-2 rounded-full w-6 h-6 flex justify-center items-center'>4</div>
            <div className='bg-green_light text-white hover:text-white capitalize p-2 rounded-lg w-10 h-10 flex justify-center items-center font-semibold'>JA</div>
            <div className='font-medium text-green_dark'>Jack L. Gregory</div>
          </div>
          <div className='text-gray-400 text-xs font-medium'>
            5000
          </div>
        </div>

        <div className='flex items-center space-x-4 justify-between bg-white rounded-2xl p-3'>
          <div className='flex items-center space-x-4'>
            <div className='bg-green_lightx capitalize p-2 rounded-full w-6 h-6 flex justify-center items-center'>5</div>
            <div className='bg-green_light text-white hover:text-white capitalize p-2 rounded-lg w-10 h-10 flex justify-center items-center font-semibold'>JA</div>
            <div className='font-medium text-green_dark'>Jack L. Gregory</div>
          </div>
          <div className='text-gray-400 text-xs font-medium'>
            5000
          </div>
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;
