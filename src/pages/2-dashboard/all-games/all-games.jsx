import React, {useState, useEffect} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import Bambi from '../../../assets/bambi.svg'
import { useSelector, useDispatch } from 'react-redux';

import {IoClose} from 'react-icons/io5'

import InputBox from '../../../components/input-box/input-box';

import useDocumentTitle from '../../../hooks/use-document-title';

import { UserActions, TriviaActions } from '../../../states/actions';

const AllGames = ({ className }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [phrase, setPhrase] = useState('')
  const {triviaList, games} = useSelector(state => state.trivia)
  useDocumentTitle('All Games')

  useEffect(() => {
    dispatch(TriviaActions.fetchTrivia())
    dispatch(UserActions.fetchUserDetials())
    // eslint-disable-next-line
  }, [])

  return (
    <div className={`${className} flex-1 flex flex-col text-white space-y-6 p-4 pt-6 pb-12`}>
      <div className='font-semibold text-lg cursor-pointer bg-white bg-opacity-10 w-8 h-8 rounded-lg flex justify-center items-center' onClick={() => history.push('/app/dashboard')}>
        <IoClose size={24} />
      </div>

      <div className='space-y-6'>

        <div className='font-semibold text-lg'>All Games</div>

        <InputBox
          className={`bg-white text-gray-800`}
          placeholder={'Search Here'}
          inputType={`search`}
          onValueChange={(e) => setPhrase(e.target.value)}
          value={phrase}
          name={`search`}
        />

        <FadeIn className='grid grid-cols-2 gap-4'>
          {triviaList ? (triviaList.length > 0 || games.length > 0) ? [...games, ...triviaList]?.filter(d => d?.title?.toLowerCase()?.includes(phrase?.toLowerCase()) || d?.dataType?.toLowerCase()?.includes(phrase?.toLowerCase())).map((d, idx) => {
            return (
              <>
                {d?.isGame ? (
                  <a href={d.url} target='_self' rel="noreferrer" key={idx} className='flex flex-col justify-center text-left cursor-pointer p-4 rounded-2xl bg-green-50  no-underline hover:no-underline capitalize text-base space-y-2 flex-shrink-0 -space-y-2'>
                    <img className='h-28 w-28 mx-auto object-cover object-top  rounded-t-2xl rounded-b-md' src={d?.photo} onError={e => {
                      e.target.onerror = null;
                      e.target.src = Bambi;
                    }} alt="" />
                    <div className='flex-shrink-0 w-full space-y-1 bg-green_light rounded-2xl p-3 text-white hover:text-white'>
                      <div className='font-semibold text-xs line-clamp-1'>{d.title}</div>
                      <div style={{fontSize: '10px'}} className='text-xs line-clamp-1'>Game</div>
                    </div>
                  </a>
                ) : (
                  <Link to={`/app/trivia-home/${d?.slug}`} key={idx} className='flex flex-col justify-center text-left cursor-pointer p-4 rounded-2xl bg-green-50  no-underline hover:no-underline capitalize text-base space-y-2 flex-shrink-0 -space-y-2'>
                    <img className='h-28 w-28 mx-auto object-cover object-top  rounded-t-2xl rounded-b-md' src={d?.photo} onError={e => {
                      e.target.onerror = null;
                      e.target.src = Bambi;
                    }} alt="" />
                    <div className='flex-shrink-0 w-full space-y-1 bg-green_light rounded-2xl p-3 text-white hover:text-white'>
                      <div className='font-semibold text-xs line-clamp-1'>{d.title}</div>
                      <div style={{fontSize: '10px'}} className='text-xs line-clamp-1'>Trivia • {d?.reward?.reward_value} point{d?.reward?.reward_value > 1 ? 's' : ''}</div>
                    </div>
                  </Link>
                )}
              </>
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
