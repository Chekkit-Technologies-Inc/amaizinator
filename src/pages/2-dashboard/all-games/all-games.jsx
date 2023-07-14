import React, {useState, useEffect} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Bambi from '../../../assets/bambi.svg'
import { useSelector } from 'react-redux';

import {IoClose} from 'react-icons/io5'

import InputBox from '../../../components/input-box/input-box';

import useDocumentTitle from '../../../hooks/use-document-title';

const AllGames = ({ className }) => {
  const history = useHistory()
  const [phrase, setPhrase] = useState('')
  const {triviaList} = useSelector(state => state.trivia)
  useDocumentTitle('All Games')

  useEffect(() => {
    console.log('triviaList', triviaList)
    // eslint-disable-next-line
  }, [triviaList])

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

export default AllGames;
