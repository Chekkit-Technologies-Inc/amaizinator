import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from 'react-redux';
import { shuffle } from 'lodash'
import ItemGameTrivia from '../../../components/items/item-game-trivia';

import { IoClose } from 'react-icons/io5'

import InputBox from '../../../components/input-box/input-box';

import useDocumentTitle from '../../../hooks/use-document-title';

import { UserActions, TriviaActions } from '../../../states/actions';

const AllGames = ({ className }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [phrase, setPhrase] = useState('')
  const { triviaList, games } = useSelector(state => state.trivia)
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
              <ItemGameTrivia key={idx} d={d} />
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
