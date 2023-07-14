import React, {useState, useEffect} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SelectBox from '../../../components/select-box'
import PointCard from '../../../components/point-card/point-card';

import PointIcon from '../../../assets/point.svg'
import Bambi from '../../../assets/bambi.svg'

import useDocumentTitle from '../../../hooks/use-document-title';

import {getTodayDate, getWeeklyStartDate, getAllTimeStartDate} from '../../../util'

import {TriviaActions} from '../../../states/actions'

const MyWins = ({ className }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {winnings} = useSelector(state => state.trivia)
  const [filter,setFilter] = useState('Weekly')
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  })

  useDocumentTitle('My Wins')

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
      dispatch(TriviaActions.fetchWinnings(dateRange.from, dateRange.to))
    }
    // eslint-disable-next-line
  }, [dateRange])

  useEffect(() => {
    console.log('winnings', winnings)
    // eslint-disable-next-line
  }, [winnings])

  return (
    <FadeIn className={`${className} flex-1 flex flex-col text-gray-800 space-y-6 p-4 pb-12`}>
      <div className='font-semibold text-lg cursor-pointer' onClick={() => history.goBack()}>
        &larr;
      </div>
      <FadeIn className='space-y-1'>
        <div className='flex items-center space-x-4 justify-between'>
          <div className='font-bold text-lg'>My Wins</div>
          <div className='w-36 cursor-pointer'>
            <SelectBox
              className={`bg-yellow-100`}
              defaultValue={'Weekly'}
              onValueChange={e => setFilter(e.target.value)}
              value={filter}
              name={'filter'}
              options={['Daily', 'Weekly', 'All Time']}
            />
          </div>
        </div>
        <div className='text-xs text-gray-700'>You would see a log of your wins here</div>
      </FadeIn>
      <PointCard point={53900} />
      <div className='space-y-4'>
        <div className='flex items-center space-x-4 justify-between bg-green_lightx rounded-2xl p-3'>
          <div className='flex items-center space-x-4'>
            <img className='h-12' src={Bambi} alt="" />
            <div className='space-y-2'>
              <div className='font-semibold'>Bambi & Friends</div>
              <div style={{fontSize: '10px'}} className='text-xs text-gray-400 font-medium'>1 May 2020, 11:30 am</div>
            </div>
          </div>
          <div className='flex items-center space-x-1 bg-white rounded-2xl p-2 text-xs font-semibold text-yellow_dark'>
          <img className='w-4' src={PointIcon} alt="" />
            <div>+ 500</div>
          </div>
        </div>
        <div className='flex items-center space-x-4 justify-between bg-green_lightx rounded-2xl p-3'>
          <div className='flex items-center space-x-4'>
            <img className='h-12' src={Bambi} alt="" />
            <div className='space-y-2'>
              <div className='font-semibold'>Bambi & Friends</div>
              <div style={{fontSize: '10px'}} className='text-xs text-gray-400 font-medium'>1 May 2020, 11:30 am</div>
            </div>
          </div>
          <div className='flex items-center space-x-1 bg-white rounded-2xl p-2 text-xs font-semibold text-yellow_dark'>
          <img className='w-4' src={PointIcon} alt="" />
            <div>+ 500</div>
          </div>
        </div>

      </div>
    </FadeIn>
  );
};

export default MyWins;
