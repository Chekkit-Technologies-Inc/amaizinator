import React, {useEffect, useState} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { shuffle } from 'lodash';
import { useInView } from 'react-intersection-observer';
// import { useState} from 'react';
// import Confetti from 'react-confetti'

import { UserActions, TriviaActions } from '../../../states/actions';

import {ReactComponent as PointIcon} from '../../../assets/point.svg'
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
  const {triviaList, games} = useSelector(state => state.trivia)
  const history = useHistory()
  const dispatch = useDispatch()
  // const [showConfetti, setShowConfetti] = useState(false)
  useDocumentTitle('Dashboard')
  const [isInView, setIsInView] = useState(false);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const [gamesAndTrivias, setGamesAndTrivias] = useState();

  useEffect(() => {
    if (triviaList && games && (triviaList.length > 0 || games.length > 0)) {
      setGamesAndTrivias(shuffle([...games.filter(d => !d?.title?.toLowerCase()?.includes('tic')).filter(d => !d?.title?.toLowerCase()?.includes('clumsy')), ...triviaList]).slice(0, 6))
    }
  }, [triviaList, games])

  const logout = () => {
    if (window.confirm('Logout ?')) {
      dispatch(UserActions.logout()).then(_ => {
        history.push('/')
      })
    }
  };

  useEffect(() => {
    if (!triviaList) {
      dispatch(TriviaActions.fetchTrivia())
    }
    if (!games) {
      dispatch(TriviaActions.fetchGames())
    }
    dispatch(UserActions.fetchUserDetials())
    // eslint-disable-next-line
  }, [])

  // useEffect(() => {
  //   setShowConfetti(true)
  //   // eslint-disable-next-line
  // }, [])

  // useEffect(() => {
  //   if (!showConfetti) {
  //     setTimeout(() => {
  //       setShowConfetti(true)
  //     }, 20000);
  //   }
  //   // eslint-disable-next-line
  // }, [showConfetti])

  // useEffect(() => {
  //   if (showConfetti) {
  //     setTimeout(() => {
  //       setShowConfetti(false)
  //     }, 5000);
  //   }
  //   // eslint-disable-next-line
  // }, [showConfetti])

  useEffect(() => {
    if (inView) {
      if (!isInView) {
        setIsInView(true);
      }
    } else {
      if (isInView) {
        setIsInView(false);
      }
    }
    // eslint-disable-next-line
  }, [inView]);

  const handleScrollClick = () => {
    let s = null;
    if (!isInView) {
      s = `#st${4}`;
    } else {
      s = `#st${0}`;
    }
    setTimeout(() => {
      let el = document.querySelector(s);
      if (el) {
        scrollTo(el);
        // el.scrollIntoView();
      }
    }, 0);
  };

  const scrollTo = el => {
    if (!isInView) {
      setIsInView(true);
    } else {
      setIsInView(false);
    }
    const elLeft = el.offsetLeft + el.offsetWidth;
    const elParentLeft = el.parentNode.offsetLeft + el.parentNode.offsetWidth;

    // check if element not in view
    if (elLeft >= elParentLeft + el.parentNode.scrollLeft) {
      el.parentNode.scrollLeft = elLeft - elParentLeft;
    } else if (elLeft <= el.parentNode.offsetLeft + el.parentNode.scrollLeft) {
      el.parentNode.scrollLeft = el.offsetLeft - el.parentNode.offsetLeft;
    }
  };

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
              <PointIcon className='' alt="" />
            </div>
            <b className='text-base'>{user?.points ? user?.points : 0}</b>
            <div className='text-sm font-medium'>Point{user?.points > 1 ? 's' : ''}</div>
          </div>
          <Link to='/app/my-account' className='bg-green_light text-white hover:text-white no-underline hover:no-underline capitalize p-2 rounded-lg w-10 h-10 flex justify-center items-center font-semibold cursor-pointer'>{getInitials(`${user?.first_name ? user?.first_name :
          ''} ${user?.last_name ? user?.last_name : ''}`)}</Link>
        </div>
      </FadeIn>
      <div className='space-y-3'>
        <div className='font-semibold text-base px-4'>Quick Links</div>
        <div className='overflow-hidden relative'>
          <div className={`absolute right-0 flex flex-col justify-center h-full p-4 z-50`}>
            {isInView ? (
              <div
                onClick={handleScrollClick}
                className={`bg-green_lightx text-blueGray-100 shadow flex justify-center items-center rounded-full bg-opacity-50 w-8 h-8 cursor-pointer hover:shadow-lg hover:bg-opacity-75 animate__animated animate__headShake animate__infinite animate__slower animate__delay-2s`}
              >
                <div style={{position: 'relative', top: '2px'}}>&larr;</div>
              </div>
            ) : (
              <div
                onClick={handleScrollClick}
                className={`bg-green_lightx text-green_light shadow flex justify-center items-center rounded-full bg-opacity-50 w-8 h-8 cursor-pointer hover:shadow-lg hover:bg-opacity-75 animate__animated animate__headShake animate__infinite animate__slower animate__delay-2s`}
              >
                <div style={{position: 'relative', top: '2px'}}>&rarr;</div>
              </div>
            )}
          </div>
          <div style={{scrollBehavior: 'smooth'}} className='flex items-center gap-4 pr-4 overflow-auto py-3 no-scrollbar bg-black bg-opacity-5'>
            <div id='st0'></div>
            <Link to='/app/prizes' className='inline-flex flex-col justify-center items-center font-semibold cursor-pointer p-4 rounded-2xl bg-green-50 hover:opacity-80 text-green_light hover:text-green_light no-underline hover:no-underline capitalize w-28 h-28 text-base space-y-2 flex-shrink-0 text-center curly relative'>
              {/* {showConfetti && <Confetti numberOfPieces={500} wind={0.1} />} */}
              <img className='' src={PrizeIcon} alt="" />
              <div className='flex-shrink-0'>See Prizes</div>
            </Link>
            <Link to='/app/my-wins' className='inline-flex flex-col justify-center items-center font-semibold cursor-pointer p-4 rounded-2xl bg-yellow-50 hover:opacity-80 text-yellow_dark hover:text-yellow_dark no-underline hover:no-underline capitalize w-28 h-28 text-base space-y-2 flex-shrink-0 text-center curly'>
              <img className='' src={WinIcon} alt="" />
              <div className='flex-shrink-0'>My Wins</div>
            </Link>
            <Link to='/app/scan-tracker' className='inline-flex flex-col justify-center items-center font-semibold cursor-pointer p-4 rounded-2xl bg-pink_light hover:opacity-80 text-pink_dark hover:text-pink_dark no-underline hover:no-underline capitalize w-28 h-28 text-base space-y-2 flex-shrink-0 text-center curly'>
              <img className='' src={ScanIcon} alt="" />
              <div style={{fontSize: '14px'}} className='flex-shrink-0'>Scan Receipt</div>
            </Link>
            <Link to='/app/leaderboard' className='inline-flex flex-col justify-center items-center font-semibold cursor-pointer p-4 rounded-2xl bg-cyan_light hover:opacity-80 text-cyan_dark hover:text-cyan_dark no-underline hover:no-underline capitalize w-28 h-28 text-base space-y-2 flex-shrink-0 text-center curly'>
              <img className='' src={LeadewrboardIcon} alt="" />
              <div className='flex-shrink-0'>Leaderboard</div>
            </Link>
            <div id='st4' ref={ref} className='inline-flex flex-col justify-center items-center font-semibold cursor-pointer p-4 rounded-2xl no-underline hover:no-underline capitalize w-12 h-12 text-base space-y-2 flex-shrink-0 text-center curly' ></div>
          </div>
        </div>

      </div>

      <div className='space-y-3 p-4 pt-0'>
        <div className='flex items-center space-x-4 justify-between'>
          <div className='font-semibold text-base'>Available Trivia & Games</div>
          <Link to='/app/all-games' className='font-medium text-sm text-yellow_dark hover:text-yellow_dark no-underline hover:no-underline capitalize'>View All</Link>
        </div>
        <FadeIn className='grid grid-cols-2 gap-4'>
          {gamesAndTrivias ? gamesAndTrivias.length > 0 ? gamesAndTrivias.map((d, idx) => {
            return (
              <React.Fragment key={idx}>
                {d?.isGame ? (
                  <Link to={`/app/game-home/${d?.id}`} key={idx} className='flex flex-col justify-center text-left cursor-pointer p-4 rounded-2xl bg-green-50  no-underline hover:no-underline capitalize text-base space-y-2 flex-shrink-0 -space-y-2'>
                    <div className='h-28 w-28 mx-auto rounded-t-2xl rounded-b-sm'>
                      <img className='h-full w-full mx-auto object-cover object-top  rounded-t-2xl rounded-b-sm' src={d?.photo} onError={e => {
                        e.target.onerror = null;
                        e.target.src = Bambi;
                      }} alt="" />
                    </div>
                    <div className='flex-shrink-0 w-full space-y-1 bg-green_light rounded-2xl p-3 text-white hover:text-white'>
                      <div className='font-semibold text-xs line-clamp-1'>{d.title}</div>
                      <div style={{fontSize: '10px'}} className='text-xs line-clamp-1'>{`Game ${d?.points ? `• ${d?.points} point${d?.points > 1 ? 's' : ''}` : ''}`}</div>
                    </div>
                  </Link>
                ) : (
                  <Link to={`/app/trivia-home/${d?.slug}`} key={idx} className='flex flex-col justify-center text-left cursor-pointer p-4 rounded-2xl bg-green-50  no-underline hover:no-underline capitalize text-base space-y-2 flex-shrink-0 -space-y-2'>
                    <div className='h-28 w-28 mx-auto rounded-t-2xl rounded-b-sm'>
                      <img className='h-full w-full mx-auto object-cover object-top  rounded-t-2xl rounded-b-sm' src={d?.photo} onError={e => {
                        e.target.onerror = null;
                        e.target.src = Bambi;
                      }} alt="" />
                    </div>
                    <div className='flex-shrink-0 w-full space-y-1 bg-green_light rounded-2xl p-3 text-white hover:text-white'>
                      <div className='font-semibold text-xs line-clamp-1'>{d.title}</div>
                      <div style={{fontSize: '10px'}} className='text-xs line-clamp-1'>Trivia • {d?.trivia_points} point{d?.trivia_points > 1 ? 's' : ''}</div>
                    </div>
                  </Link>
                )}
              </React.Fragment>
            )
          }) : (
            <div>No Games</div>
          ) : <div>Loading...</div>}
        </FadeIn>
      </div>
    </div>
  );
};

export default Dashboard;
