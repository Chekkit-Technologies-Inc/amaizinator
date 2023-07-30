import React, {useState, useEffect} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';

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
      <PointCard point={winnings?.total_points?.points} />
      <div className='space-y-4'>
        {winnings?.winngs ? winnings?.winngs?.length > 0 ? winnings?.winngs?.map((d, idx) => {
          return (
            <div key={idx} className='flex items-center space-x-4 bg-green_lightx rounded-2xl p-3'>
              <div className='flex items-center space-x-4 flex-1'>
                <div className='h-14 w-14 rounded-2xl bg-green_lightx'>
                  <img className='h-14 w-14 object-cover object-top rounded-2xl' src={d?.game?.photo ? d?.game?.photo ? d?.game?.photo : d?.game?.photo === null ? Bambi : d?.game?.photo : d?.survey?.photo ? d?.survey?.photo : d?.survey?.photo === null ? Bambi : d?.survey?.photo} onError={e => {
                    e.target.onerror = null;
                    e.target.src = Bambi;
                  }} alt="" />
                </div>
                <div className='space-y-2 flex-1'>
                  <div className='font-semibold line-clamp-1'>{d?.game ? d?.game?.title : d?.survey?.title}</div>
                  <div style={{fontSize: '10px'}} className='text-xs text-gray-400 font-medium'>{d?.created_at ? format(parseISO(d?.created_at), 'dd-MM-yyyy, HH:mm a ') : ''}</div>
                </div>
              </div>
              <div className='flex items-center space-x-1 bg-white rounded-2xl p-2 text-xs font-semibold text-yellow_dark'>
              <img className='w-4' src={PointIcon} alt="" />
                <div>+ {d?.reward_value}</div>
              </div>
            </div>
          )
        }) : (
          <div>No winnings</div>
        ) : <div>Loading...</div>}
      </div>
    </FadeIn>
  );
};

export default MyWins;
