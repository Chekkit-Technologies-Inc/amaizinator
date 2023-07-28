import React, {useEffect} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import { useSelector } from 'react-redux';
import { RWebShare } from 'react-web-share';

import Button from '../../../components/button/button';
import {ReactComponent as Congratulations} from '../../../assets/congratulations.svg'
import {ReactComponent as ShareIcon} from '../../../assets/share.svg'

import useDocumentTitle from '../../../hooks/use-document-title';


const GameResult = ({ className }) => {
  const {points, user_id} = useParams()
  const history = useHistory()
  const user = useSelector(state => state.user)
  useDocumentTitle('Result')

  useEffect(() => {
    console.log('user_id', user_id)
    console.log('points', points)
  }, [user_id, points])

  return (
    <FadeIn className={`${className} flex-1 p-4 flex flex-col justify-center text-gray-800`}>

      <div className='-space-y-8'>
          <div className='h-52 z-50'>
            <Congratulations alt='' className='w-full' />
          </div>
          <div style={{height: '400px'}} className='bg-yellow-100 rounded-3xl border-b-4 border-yellow-300 p-4 text-center flex flex-col w-72 mx-auto py-8 pt-14 space-y-4 justify-between'>
            <div className='space-y-4'>
              <div className='font-semibold text-3xl'>Good job, {user?.first_name}!</div>
              <div className='text-gray-800 font-medium'>You just won <b>{points}</b> points. Keep playing more games and submitting receipts with Amaizing Day Cereal to rack up more points</div>
            </div>
            <div className='space-y-6'>
              <Button onClick={() => history.push('/app/leaderboard')} text={'Goto Leaderboard'} />
                <RWebShare
                  data={{
                    text: `${user?.first_name} just won ${points} points. Play more games and submit receipts with Amaizing Day Cereal to rack up more points`,
                    url: window.location.href,
                    title: `Congratulations ${user?.first_name}!`,
                  }}
                >
                  <div className='flex items-center justify-center space-x-2 cursor-pointer'>
                    <ShareIcon />
                    <div className='text-green_light text-xl font-semibold'>share to friends</div>
                  </div>
                </RWebShare>
            </div>
          </div>
      </div>
    </FadeIn>
  );
};

export default GameResult;
