import React, {useState, useEffect} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {ReactComponent as Logo} from '../../../assets/logo.svg'

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

import {getTodayDate, getWeeklyStartDate, getAllTimeStartDate, getInitials} from '../../../util'

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

      {leaderboard && <FadeIn className='p-4 py-8 grid grid-cols-3 items-end gap-6'>

        <div className='space-y-3 text-center flex flex-col items-center justify-center'>
          <div style={{opacity: .99}} className='relative'>
            <div className='bg-green_light text-white capitalize p-2 rounded-full w-16 h-16 flex justify-center items-center font-semibold text-2xl border-2 border-blue_second relative z-10'>
              <span>{getInitials(`${leaderboard[1]?.user?.first_name ? leaderboard[1]?.user?.first_name :
          ''} ${leaderboard[1]?.user?.last_name ? leaderboard[1]?.user?.last_name : ''}`)}</span>
              <img className='absolute -top-7 -left-4' src={SecondCrown} alt="" />
              <img className='absolute -bottom-2' src={SecondCup} alt="" />
            </div>
            <img  className='absolute top-10' src={SecondWing} alt="" />
          </div>
          <div className='font-semibold text-green_dark'>{`${leaderboard[1]?.user?.first_name ? leaderboard[1]?.user?.first_name :
          ''} ${leaderboard[1]?.user?.last_name ? leaderboard[1]?.user?.last_name : ''}`}</div>
          <div className='text-gray-400 text-xs font-medium'>
            {leaderboard[1]?.points}
          </div>
        </div>

        <div className='space-y-3 text-center flex flex-col items-center justify-center'>
          <div style={{opacity: .99}} className='relative'>
            <div className='bg-green_light text-white capitalize p-2 rounded-full w-24 h-24 flex justify-center items-center font-semibold text-3xl border-2 border-yellow_first relative z-10'>
              <span>{getInitials(`${leaderboard[0]?.user?.first_name ? leaderboard[0]?.user?.first_name :
          ''} ${leaderboard[0]?.user?.last_name ? leaderboard[0]?.user?.last_name : ''}`)}</span>
              <img className='absolute -top-8 -left-4' src={FirstCrown} alt="" />
              <img className='absolute -bottom-2' src={FirstCup} alt="" />
            </div>
            <img style={{marginLeft: '6px'}}  className='absolute top-16' src={FirstWing} alt="" />
          </div>
          <div className='font-semibold text-green_dark'>{`${leaderboard[0]?.user?.first_name ? leaderboard[0]?.user?.first_name :
          ''} ${leaderboard[0]?.user?.last_name ? leaderboard[0]?.user?.last_name : ''}`}</div>
          <div className='text-gray-400 text-xs font-medium'>
            {leaderboard[0]?.points}
          </div>
        </div>


        <div className='space-y-3 text-center flex flex-col items-center justify-center'>
          <div style={{opacity: .99}} className='relative'>
            <div className='bg-green_light text-white capitalize p-2 rounded-full w-16 h-16 flex justify-center items-center font-semibold text-2xl border-2 border-red_third relative z-10'>
              <span>{getInitials(`${leaderboard[2]?.user?.first_name ? leaderboard[2]?.user?.first_name :
          ''} ${leaderboard[2]?.user?.last_name ? leaderboard[2]?.user?.last_name : ''}`)}</span>
              <img className='absolute -top-6 -left-2' src={ThirdCrown} alt="" />
              <img className='absolute -bottom-2' src={ThirdCup} alt="" />
            </div>
            <img style={{marginLeft: '2.7px'}} className='absolute top-10' src={ThirdWing} alt="" />
          </div>
          <div className='font-semibold text-green_dark'>{`${leaderboard[2]?.user?.first_name ? leaderboard[2]?.user?.first_name :
          ''} ${leaderboard[2]?.user?.last_name ? leaderboard[2]?.user?.last_name : ''}`}</div>
          <div className='text-gray-400 text-xs font-medium'>
            {leaderboard[2]?.points}
          </div>
        </div>
      </FadeIn>}


      <div className='flex flex-col justify-between space-y-4 p-4 pb-0 bg-green_dark flex-1 rounded-t-3xl'>

      <div className='space-y-4'>
        {leaderboard ? leaderboard?.length > 0 ? leaderboard?.slice(3, leaderboard.length + 1)?.map((d, idx) => {
              return (
                <div key={idx} className='flex items-center space-x-4 justify-between bg-white rounded-2xl p-3'>
                  <div className='flex items-center space-x-4'>
                    <div className='bg-green_lightx capitalize p-2 rounded-full w-6 h-6 flex justify-center items-center'>{idx + 4}</div>
                    <div className='bg-green_light text-white hover:text-white capitalize p-2 rounded-lg w-10 h-10 flex justify-center items-center font-semibold'>{getInitials(`${d?.user?.first_name ? d?.user?.first_name :
            ''} ${d?.user?.last_name ? d?.user?.last_name : ''}`)}</div>
                    <div className='font-medium text-green_dark'>{`${d?.user?.first_name ? d?.user?.first_name :
            ''} ${d?.user?.last_name ? d?.user?.last_name : ''}`}</div>
                  </div>
                  <div className='text-gray-400 text-xs font-medium'>
                    {d?.points}
                  </div>
                </div>
              )
            }) : (
              <div></div>
            ) : <div></div>}
      </div>
      <div className='flex justify-center p-1 pb-4'>
        <div className='flex items-center space-x-1  justify-center'>
          <span className='text-gray-300 text-xs font-bold'>Powered by</span>
          <Logo className='text-black h-4 w-14'  />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Leaderboard;
