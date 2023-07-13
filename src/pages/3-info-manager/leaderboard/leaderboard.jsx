import React, {useState} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import SelectBox from '../../../components/select-box'

const Leaderboard = ({ className }) => {
  const history = useHistory()
  const [filter,setFilter] = useState('This Week')

  return (
    <div className={`${className} flex-1 flex flex-col text-gray-800 space-y-6`}>
      <div className='font-semibold text-lg cursor-pointer px-4 pt-4' onClick={() => history.goBack()}>
        &larr;
      </div>

      <div className='flex items-center space-x-4 justify-between px-4'>
        <div className='font-bold text-lg'>Leaderboard</div>
        <div className='w-28 cursor-pointer'>
          <SelectBox
            className={`bg-yellow-100`}
            defaultValue={'This week'}
            onValueChange={e => setFilter(e.target.value)}
            value={filter}
            name={'filter'}
            options={['This Week', 'All Time']}
          />
        </div>
      </div>

      <FadeIn className='p-4 py-8 grid grid-cols-3 items-end gap-6'>
        <div className='space-y-3 text-center flex flex-col items-center justify-center'>
          <div className='bg-blue-400 text-white capitalize p-2 rounded-full w-16 h-16 flex justify-center items-center font-semibold text-2xl border-2 border-blue-500'>2</div>
          <div className='font-semibold text-green_dark'>Jack L. Gregory</div>
          <div className='text-gray-400 text-xs font-medium'>
            5000
          </div>
        </div>

        <div className='space-y-3 text-center flex flex-col items-center justify-center'>
          <div className='bg-yellow-400 text-white capitalize p-2 rounded-full w-24 h-24 flex justify-center items-center font-semibold text-3xl border-2 border-yellow-500'>1</div>
          <div className='font-semibold text-green_dark'>Jack L. Gregory</div>
          <div className='text-gray-400 text-xs font-medium'>
            7000
          </div>
        </div>


        <div className='space-y-3 text-center flex flex-col items-center justify-center'>
          <div className='bg-red-400 text-white capitalize p-2 rounded-full w-16 h-16 flex justify-center items-center font-semibold text-2xl border-2 border-red-500'>3</div>
          <div className='font-semibold text-green_dark'>Jack L. Gregory</div>
          <div className='text-gray-400 text-xs font-medium'>
            2000
          </div>
        </div>
      </FadeIn>


      <div className='space-y-4 p-4 pb-12 bg-green_dark flex-1 rounded-t-3xl'>

        <div className='flex items-center space-x-4 justify-between bg-white rounded-2xl p-3'>
          <div className='flex items-center space-x-4'>
            <div className='bg-green_lightx capitalize p-2 rounded-full w-6 h-6 flex justify-center items-center'>4</div>
            <div className='bg-yellow-100 text-blue-400 hover:text-blue-400 capitalize p-2 rounded-lg w-10 h-10 flex justify-center items-center font-semibold'>JA</div>
            <div className='font-medium text-green_dark'>Jack L. Gregory</div>
          </div>
          <div className='text-gray-400 text-xs font-medium'>
            5000
          </div>
        </div>

        <div className='flex items-center space-x-4 justify-between bg-white rounded-2xl p-3'>
          <div className='flex items-center space-x-4'>
            <div className='bg-green_lightx capitalize p-2 rounded-full w-6 h-6 flex justify-center items-center'>5</div>
            <div className='bg-yellow-100 text-blue-400 hover:text-blue-400 capitalize p-2 rounded-lg w-10 h-10 flex justify-center items-center font-semibold'>JA</div>
            <div className='font-medium text-green_dark'>Jack L. Gregory</div>
          </div>
          <div className='text-gray-400 text-xs font-medium'>
            5000
          </div>
        </div>

        <div className='flex items-center space-x-4 justify-between bg-white rounded-2xl p-3'>
          <div className='flex items-center space-x-4'>
            <div className='bg-green_lightx capitalize p-2 rounded-full w-6 h-6 flex justify-center items-center'>6</div>
            <div className='bg-yellow-100 text-blue-400 hover:text-blue-400 capitalize p-2 rounded-lg w-10 h-10 flex justify-center items-center font-semibold'>JA</div>
            <div className='font-medium text-green_dark'>Jack L. Gregory</div>
          </div>
          <div className='text-gray-400 text-xs font-medium'>
            5000
          </div>
        </div>

        <div className='flex items-center space-x-4 justify-between bg-white rounded-2xl p-3'>
          <div className='flex items-center space-x-4'>
            <div className='bg-green_lightx capitalize p-2 rounded-full w-6 h-6 flex justify-center items-center'>6</div>
            <div className='bg-yellow-100 text-blue-400 hover:text-blue-400 capitalize p-2 rounded-lg w-10 h-10 flex justify-center items-center font-semibold'>JA</div>
            <div className='font-medium text-green_dark'>Jack L. Gregory</div>
          </div>
          <div className='text-gray-400 text-xs font-medium'>
            5000
          </div>
        </div>
        <div className='flex items-center space-x-4 justify-between bg-white rounded-2xl p-3'>
          <div className='flex items-center space-x-4'>
            <div className='bg-green_lightx capitalize p-2 rounded-full w-6 h-6 flex justify-center items-center'>6</div>
            <div className='bg-yellow-100 text-blue-400 hover:text-blue-400 capitalize p-2 rounded-lg w-10 h-10 flex justify-center items-center font-semibold'>JA</div>
            <div className='font-medium text-green_dark'>Jack L. Gregory</div>
          </div>
          <div className='text-gray-400 text-xs font-medium'>
            5000
          </div>
        </div>

        <div className='flex items-center space-x-4 justify-between bg-white rounded-2xl p-3'>
          <div className='flex items-center space-x-4'>
            <div className='bg-green_lightx capitalize p-2 rounded-full w-6 h-6 flex justify-center items-center'>6</div>
            <div className='bg-yellow-100 text-blue-400 hover:text-blue-400 capitalize p-2 rounded-lg w-10 h-10 flex justify-center items-center font-semibold'>JA</div>
            <div className='font-medium text-green_dark'>Jack L. Gregory</div>
          </div>
          <div className='text-gray-400 text-xs font-medium'>
            5000
          </div>
        </div>
        <div className='flex items-center space-x-4 justify-between bg-white rounded-2xl p-3'>
          <div className='flex items-center space-x-4'>
            <div className='bg-green_lightx capitalize p-2 rounded-full w-6 h-6 flex justify-center items-center'>6</div>
            <div className='bg-yellow-100 text-blue-400 hover:text-blue-400 capitalize p-2 rounded-lg w-10 h-10 flex justify-center items-center font-semibold'>JA</div>
            <div className='font-medium text-green_dark'>Jack L. Gregory</div>
          </div>
          <div className='text-gray-400 text-xs font-medium'>
            5000
          </div>
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;
