import React, {useEffect, useState, useLayoutEffect} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import { useSelector } from 'react-redux';

import useDocumentTitle from '../../../hooks/use-document-title';

import Button from '../../../components/button'

import Bambi from '../../../assets/bambi.svg'

const GameHome = ({ className }) => {
  const {id} = useParams()
  const history = useHistory()
  const user = useSelector(state => state.user)
  const {games} = useSelector(state => state.trivia)
  const [game, setGame] = useState()
  useDocumentTitle('Game')

  useLayoutEffect(() => {
    if (!user?.token) {
      history.push('/app/login');
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (games) {
      // eslint-disable-next-line
      let g = games.find(d => d.id == id);
      if (g) setGame(g);
    }
    // eslint-disable-next-line
  }, [id, games])

  return (
    <div className={`${className} flex-1 flex flex-col text-white  p-4`}>
      <div className='font-semibold text-lg cursor-pointer' onClick={() => history.goBack()}>
        &larr;
      </div>

      <div  className='flex flex-col flex-1 h-full'>
        <div className='w-24 h-24 flex justify-center items-center mx-auto relative top-8 text-2xl font-bold'>
          <img className='h-24 w-24 mx-auto object-cover object-top  rounded-t-2xl rounded-b-md' src={game?.photo} alt="" onError={e => {
            e.target.onerror = null;
            e.target.src = Bambi;
          }} />
        </div>
        <div style={{minHeight:'500px'}} className='bg-white flex-1 rounded-2xl text-gray-800 p-6 z-20 flex flex-col space-y-4 justify-between'>

          <FadeIn className='space-y-6'>

            <FadeIn className='flex items-start space-x-4 justify-between'>
              <div>
                <div className='font-bold text-xs text-gray-400'>Game Title</div>
                <div className='font-semibold'>{game?.title}</div>
              </div>
              <div>
                <div className='font-bold text-xs text-gray-400'>Points</div>
                <div className='flex items-center space-x-1 font-semibold'>
                  {game?.points}
                </div>
              </div>
            </FadeIn>

            <div>
              <div className='font-bold text-xs text-gray-400'>Instructions</div>
              <div className='text-xs'>{game?.description}</div>
            </div>

          </FadeIn>


          <FadeIn>
            <Button onClick={() => {
              if (game?.url) {
                window.open(game?.url + `/?${user?.id}&${game?.id}`, '_self')
              }
            }} className={'mb-8'} text='Play Game' />
          </FadeIn>

        </div>
      </div>

    </div>
  );
};

export default GameHome;
