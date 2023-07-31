import React, {useEffect, useState} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Countdown from "react-countdown";

import ChatIcon from '../../../assets/chat.svg'
import {ReactComponent as PointIcon} from '../../../assets/point.svg'
import Bambi from '../../../assets/bambi.svg'

import useDocumentTitle from '../../../hooks/use-document-title';

import {TriviaActions} from '../../../states/actions'

import Button from '../../../components/button'

const renderer = ({ minutes, seconds }) => {
  return (
    <span>
      {minutes}:{seconds} {minutes > 0 ? 'mins' : 'secs'}
    </span>
  );
};

const TriviaHome = ({ className }) => {
  const {slug} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const {triviaList} = useSelector(state => state.trivia)
  const [trivia, setTrivia] = useState()
  const [time, setTime] = useState()
  useDocumentTitle('Trivia')

  useEffect(() => {
    if (!triviaList) {
      dispatch(TriviaActions.fetchTrivia())
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (triviaList) {
      // eslint-disable-next-line
      let t = triviaList.find(d => d.slug == slug);
      if (t) setTrivia(t);
    }
    // eslint-disable-next-line
  }, [slug, triviaList])

  useEffect(() => {
    if (trivia?.question?.length > 0) {
      setTime(Date.now() + 5000 * trivia?.question?.length)
    }
    // eslint-disable-next-line
  }, [trivia])

  return (
    <div className={`${className} flex-1 flex flex-col text-white  p-4`}>
      <div className='font-semibold text-lg cursor-pointer' onClick={() => history.goBack()}>
        &larr;
      </div>

      <div  className='flex flex-col flex-1 h-full'>
        {/* <div className='w-24 h-24 flex justify-center items-center mx-auto relative top-8 text-2xl font-bold'>
          <BoxQuestion />

        </div> */}
        <div className='w-24 h-24 flex justify-center items-center mx-auto relative top-8 text-2xl font-bold'>
          <img className='h-24 w-24 mx-auto object-cover object-top  rounded-t-2xl rounded-b-md' src={trivia?.photo} alt="" onError={e => {
            e.target.onerror = null;
            e.target.src = Bambi;
          }} />
        </div>
        <div style={{minHeight:'500px'}} className='bg-white flex-1 rounded-2xl text-gray-800 p-6 z-20 flex flex-col space-y-4 justify-between'>
          <FadeIn className='space-y-6'>
            <FadeIn className='flex items-start space-x-4 justify-between'>
              <div>
                <div className='font-bold text-xs text-gray-400'>Trivia Title</div>
                <div className='font-semibold'>{trivia?.title}</div>
              </div>
              <div>
                <div className='font-bold text-xs text-gray-400'>Time</div>
                <div className='font-semibold'>
                  {time && <Countdown autoStart={false} date={time} renderer={renderer} />}
                </div>
              </div>
            </FadeIn>

            <div className='bg-green_lightx rounded-xl p-4 flex gap-4 overflow-auto no-scrollbar'>
              <div className='flex-1 flex justify-center items-center space-x-2'>
                <div className='bg-white w-6 h-6 flex justify-center items-center rounded-lg'>
                  <PointIcon />
                </div>
                <div className='flex items-center space-x-1'>
                  <b>{trivia?.trivia_points}</b>
                  <span>point{trivia?.trivia_points > 1 ? 's' : ''}</span>
                </div>
              </div>

              <div className='border-r'></div>

              <div className='flex-1 flex justify-center items-center space-x-2'>
                <div className='bg-white w-6 h-6 flex justify-center items-center rounded-lg'>
                  <img className='w-3' src={ChatIcon} alt="" />
                </div>
                <div className='flex items-center space-x-1'>
                  <b>{trivia?.question?.length}</b>
                  <span>question{trivia?.question?.length > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            <div>
              <div className='font-bold text-xs text-gray-400'>Description</div>
              <div className='text-xs'>{trivia?.content}</div>
            </div>
          </FadeIn>
          <FadeIn>
            {!trivia?.isAlreadyTaken  ?<Button onClick={() => history.push(`/app/trivia-player/${slug}`)} className={'mb-8'} text='Play Trivia' /> : (
              <>
                <div className={'mb-8 text-center text-red-500 bg-red-50 p-4 font-semibold rounded-lg'}>Already played trivia</div>
                <Button className={'capitalize -mt-4'} onClick={() => history.push('/app/dashboard')} text={'Go to Dashboard'} />
              </>
            )}
          </FadeIn>
        </div>
      </div>

    </div>
  );
};

export default TriviaHome;
