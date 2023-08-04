import React, {useState, useEffect} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import Bambi from '../../../assets/bambi.svg'
import { useSelector, useDispatch } from 'react-redux';
import {shuffle} from 'lodash'

import {IoClose} from 'react-icons/io5'

import InputBox from '../../../components/input-box/input-box';

import useDocumentTitle from '../../../hooks/use-document-title';

import { UserActions, TriviaActions } from '../../../states/actions';

const AllGames = ({ className }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [phrase, setPhrase] = useState('')
  const {triviaList, games} = useSelector(state => state.trivia)
  useDocumentTitle('All Trivia & Games')
  const [gamesAndTrivias, setGamesAndTrivias] = useState();

  useEffect(() => {
    if (triviaList && games && (triviaList.length > 0 || games.length > 0)) {
      setGamesAndTrivias(shuffle([...games, ...triviaList]))
    }
  }, [triviaList, games])

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

  return (
    <div className={`${className} flex-1 flex flex-col text-white space-y-6 p-4 pt-6 pb-12`}>
      <div className='font-semibold text-lg cursor-pointer bg-white bg-opacity-10 w-8 h-8 rounded-lg flex justify-center items-center' onClick={() => history.push('/app/dashboard')}>
        <IoClose size={24} />
      </div>

      <div className='space-y-6'>

        <div className='font-semibold text-lg'>All Trivia & Games</div>

        <InputBox
          className={`bg-white text-gray-800`}
          placeholder={'Search Here'}
          inputType={`search`}
          onValueChange={(e) => setPhrase(e.target.value)}
          value={phrase}
          name={`search`}
        />

        <FadeIn className='grid grid-cols-2 gap-4'>
          {gamesAndTrivias ? gamesAndTrivias.length > 0 ? gamesAndTrivias?.filter(d => d?.title?.toLowerCase()?.includes(phrase?.toLowerCase()) || d?.dataType?.toLowerCase()?.includes(phrase?.toLowerCase())).map((d, idx) => {
            return (
              <React.Fragment key={idx}>
                {d?.isGame ? (
                  <Link key={idx}  to={`/app/game-home/${d?.id}`} className={`flex flex-col justify-center text-left cursor-pointer p-4 rounded-2xl bg-green-50  no-underline hover:no-underline capitalize text-base space-y-2 flex-shrink-0 relative`}>

                    <div className='flex justify-center'>
                      <div className='text-white bg-yellow-400 p-1 relative rounded-md font-semibold text-xs'>Game</div>
                    </div>

                    <div className='-space-y-3'>
                      <div className='h-28 w-28 mx-auto rounded-t-2xl rounded-b-sm'>
                        <img className='h-full w-full mx-auto object-cover object-top  rounded-t-2xl rounded-b-sm' src={d?.photo} onError={e => {
                          e.target.onerror = null;
                          e.target.src = Bambi;
                        }} alt="" />
                      </div>
                      <div className='flex-shrink-0 w-full space-y-1 bg-green_light rounded-2xl p-3 text-white hover:text-white relative'>
                        <div className='font-semibold text-xs line-clamp-1'>{d.title}</div>
                        <div style={{fontSize: '10px'}} className='text-xs line-clamp-1'>{`Game ${d?.points ? `• ${d?.points} point${d?.points > 1 ? 's' : ''}` : ''}`}</div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link key={idx} to={`/app/trivia-home/${d?.slug}`} className={`flex flex-col justify-center text-left cursor-pointer p-4 rounded-2xl bg-green-50  no-underline hover:no-underline capitalize text-base space-y-2 flex-shrink-0 relative`}>
                    <div className='flex justify-center'>
                      <div className='text-white bg-blue-400 p-1 rounded-md font-semibold text-xs'>Trivia</div>
                    </div>
                    <div className='-space-y-3'>
                      <div className='h-28 w-28 mx-auto rounded-t-2xl rounded-b-sm'>
                        <img className='h-full w-full mx-auto object-cover object-top  rounded-t-2xl rounded-b-sm' src={d?.photo} onError={e => {
                          e.target.onerror = null;
                          e.target.src = Bambi;
                        }} alt="" />
                      </div>
                      <div className='flex-shrink-0 w-full space-y-1 bg-green_light rounded-2xl p-3 text-white hover:text-white relative'>
                        <div className='font-semibold text-xs line-clamp-1'>{d.title}</div>
                        <div style={{fontSize: '10px'}} className='text-xs line-clamp-1'>Trivia • {d?.trivia_points} point{d?.trivia_points > 1 ? 's' : ''}</div>
                      </div>
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

export default AllGames;
