import React, {useEffect} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';

import { UserActions, TriviaActions } from '../../../states/actions';

import PointIcon from '../../../assets/point.svg'
import PrizeIcon from '../../../assets/prizes.svg'
import WinIcon from '../../../assets/wins.svg'
import ScanIcon from '../../../assets/scan.svg'
import LeadewrboardIcon from '../../../assets/leaderboard.svg'
import Bambi from '../../../assets/bambi.svg'

import {ReactComponent as Logout} from '../../../assets/logout.svg'

import {getInitials} from '../../../util'

import useDocumentTitle from '../../../hooks/use-document-title';

const Dashboard = ({ className }) => {
  const user = useSelector(state => state.user)
  const {triviaList} = useSelector(state => state.trivia)
  const history = useHistory()
  const dispatch = useDispatch()
  useDocumentTitle('Dashboard')

  const logout = () => {
    dispatch(UserActions.logout()).then(_ => {
      history.push('/')
    })
  }

  useEffect(() => {
    dispatch(TriviaActions.fetchTrivia())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    console.log('triviaList', triviaList)
    // eslint-disable-next-line
  }, [triviaList])

  return (
    <div className={`${className} flex-1 flex flex-col text-white space-y-6 pt-6 pb-12`}>
      <FadeIn className='px-4 space-y-4'>
        <FadeIn className='flex items-center space-x-4 justify-between'>
          <div>
            <div className='text-lg'>Hello, <b>{user?.first_name}</b></div>
            <div>Let’s start your Amaizinator adventure</div>
          </div>
          <div className='font-semibold text-lg cursor-pointer bg-white bg-opacity-10 w-8 h-8 rounded-lg flex justify-center items-center' onClick={logout}>
            <Logout size={24} />
          </div>
        </FadeIn>
        <div className='flex items-center space-x-4 justify-between'>
          <div className='flex items-center space-x-2 bg-green_light rounded-3xl p-2'>
            <div className='bg-white rounded-full p-1'>
              <img className='' src={PointIcon} alt="" />
            </div>
            <b className='text-base'>{user?.loyalty_point}</b>
            <div className='text-sm font-medium'>Point{user?.loyalty_point > 1 ? 's' : ''}</div>
          </div>
          <Link to='/app/my-account' className='bg-green_light text-white hover:text-white no-underline hover:no-underline capitalize p-2 rounded-lg w-10 h-10 flex justify-center items-center font-semibold cursor-pointer'>{getInitials(`${user?.first_name} ${user?.last_name}`)}</Link>
        </div>
      </FadeIn>
      <div className='space-y-3'>
        <div className='font-semibold text-base px-4'>Quick Links</div>
        <FadeIn className='flex items-center gap-4 px-4 overflow-auto'>

          <Link to='/app/prizes' className='inline-flex flex-col justify-center items-center font-semibold cursor-pointer p-4 rounded-2xl bg-green-50 hover:opacity-80 text-green_light hover:text-green_light no-underline hover:no-underline capitalize w-28 h-28 text-base space-y-2 flex-shrink-0 text-center curly'>
            <img className='' src={PrizeIcon} alt="" />
            <div className='flex-shrink-0'>See Prizes</div>
          </Link>

          <Link to='/app/my-wins' className='inline-flex flex-col justify-center items-center font-semibold cursor-pointer p-4 rounded-2xl bg-yellow-50 hover:opacity-80 text-yellow_dark hover:text-yellow_dark no-underline hover:no-underline capitalize w-28 h-28 text-base space-y-2 flex-shrink-0 text-center curly'>
            <img className='' src={WinIcon} alt="" />
            <div className='flex-shrink-0'>My Wins</div>
          </Link>

          <Link to='/app/scan-tracker' className='inline-flex flex-col justify-center items-center font-semibold cursor-pointer p-4 rounded-2xl bg-pink_light hover:opacity-80 text-pink_dark hover:text-pink_dark no-underline hover:no-underline capitalize w-28 h-28 text-base space-y-2 flex-shrink-0 text-center curly'>
            <img className='' src={ScanIcon} alt="" />
            <div className='flex-shrink-0'>Scan Here</div>
          </Link>

          <Link to='/app/leaderboard' className='inline-flex flex-col justify-center items-center font-semibold cursor-pointer p-4 rounded-2xl bg-cyan_light hover:opacity-80 text-cyan_dark hover:text-cyan_dark no-underline hover:no-underline capitalize w-28 h-28 text-base space-y-2 flex-shrink-0 text-center curly'>
            <img className='' src={LeadewrboardIcon} alt="" />
            <div className='flex-shrink-0'>Leaderboard</div>
          </Link>

        </FadeIn>
      </div>

      <div className='space-y-3 p-4 pt-0'>
        <div className='flex items-center space-x-4 justify-between'>
          <div className='font-semibold text-base'>Available Games</div>
          <Link to='/app/all-games' className='font-medium text-sm text-yellow_dark hover:text-yellow_dark no-underline hover:no-underline capitalize'>View All Games</Link>
        </div>
        <FadeIn className='grid grid-cols-2 gap-4'>

          <div className='flex flex-col justify-center text-left cursor-pointer p-4 rounded-2xl bg-green-50  no-underline hover:no-underline capitalize text-base space-y-2 flex-shrink-0 -space-y-2'>
            <img className='h-24' src={Bambi} alt="" />
            <div className='flex-shrink-0 w-full space-y-1 bg-green_light rounded-2xl p-3 text-white hover:text-white'>
              <div className='font-semibold text-xs'>Bambi & Friends</div>
              <div style={{fontSize: '10px'}} className='text-xs'>Trivia • 12 points</div>
            </div>
          </div>

          <div className='flex flex-col justify-center text-left cursor-pointer p-4 rounded-2xl bg-green-50  no-underline hover:no-underline capitalize text-base space-y-2 flex-shrink-0 -space-y-2'>
            <img className='h-24' src={Bambi} alt="" />
            <div className='flex-shrink-0 w-full space-y-1 bg-green_light rounded-2xl p-3 text-white hover:text-white'>
              <div className='font-semibold text-xs'>Bambi & Friends</div>
              <div style={{fontSize: '10px'}} className='text-xs'>Trivia • 12 points</div>
            </div>
          </div>

          <div className='flex flex-col justify-center text-left cursor-pointer p-4 rounded-2xl bg-green-50  no-underline hover:no-underline capitalize text-base space-y-2 flex-shrink-0 -space-y-2'>
            <img className='h-24' src={Bambi} alt="" />
            <div className='flex-shrink-0 w-full space-y-1 bg-green_light rounded-2xl p-3 text-white hover:text-white'>
              <div className='font-semibold text-xs'>Bambi & Friends</div>
              <div style={{fontSize: '10px'}} className='text-xs'>Trivia • 12 points</div>
            </div>
          </div>

          <div className='flex flex-col justify-center text-left cursor-pointer p-4 rounded-2xl bg-green-50  no-underline hover:no-underline capitalize text-base space-y-2 flex-shrink-0 -space-y-2'>
            <img className='h-24' src={Bambi} alt="" />
            <div className='flex-shrink-0 w-full space-y-1 bg-green_light rounded-2xl p-3 text-white hover:text-white'>
              <div className='font-semibold text-xs'>Bambi & Friends</div>
              <div style={{fontSize: '10px'}} className='text-xs'>Trivia • 12 points</div>
            </div>
          </div>

          <div className='flex flex-col justify-center text-left cursor-pointer p-4 rounded-2xl bg-green-50  no-underline hover:no-underline capitalize text-base space-y-2 flex-shrink-0 -space-y-2'>
            <img className='h-24' src={Bambi} alt="" />
            <div className='flex-shrink-0 w-full space-y-1 bg-green_light rounded-2xl p-3 text-white hover:text-white'>
              <div className='font-semibold text-xs'>Bambi & Friends</div>
              <div style={{fontSize: '10px'}} className='text-xs'>Trivia • 12 points</div>
            </div>
          </div>

          <div className='flex flex-col justify-center text-left cursor-pointer p-4 rounded-2xl bg-green-50  no-underline hover:no-underline capitalize text-base space-y-2 flex-shrink-0 -space-y-2'>
            <img className='h-24' src={Bambi} alt="" />
            <div className='flex-shrink-0 w-full space-y-1 bg-green_light rounded-2xl p-3 text-white hover:text-white'>
              <div className='font-semibold text-xs'>Bambi & Friends</div>
              <div style={{fontSize: '10px'}} className='text-xs'>Trivia • 12 points</div>
            </div>
          </div>





        </FadeIn>
      </div>
    </div>
  );
};

export default Dashboard;
