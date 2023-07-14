import React, {useState} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import InputBox from '../../../components/input-box/input-box';
import {MdOutlineKeyboardArrowRight} from 'react-icons/md'

import PointIcon from '../../../assets/point.svg'
import Receipt from '../../../assets/receipt.svg'
import {ReactComponent as ScanSign} from '../../../assets/scan-sign.svg'

import useDocumentTitle from '../../../hooks/use-document-title';

const ScanTracker = ({ className }) => {
  const history = useHistory()
  const [phrase, setPhrase] = useState('')
  useDocumentTitle('Scan Tracker')

  return (
    <FadeIn className={`${className} flex-1 flex flex-col text-gray-800 space-y-6 p-4 pb-12`}>
      <div className='font-semibold text-lg cursor-pointer' onClick={() => history.goBack()}>
        &larr;
      </div>

      <FadeIn className='flex items-center space-x-4 justify-between'>
        <div className='font-bold text-lg'>Scan Tracker</div>
        <button onClick={() => history.push('/app/scan')} className='flex items-center space-x-2 w-32 px-3 py-2 rounded-lg cursor-pointer text-white bg-green_light'>
          <ScanSign className='' />
          <div>Scan New</div>
        </button>
      </FadeIn>

      <InputBox
        className={`bg-gray-50 text-gray-800`}
        placeholder={'Search Here'}
        inputType={`search`}
        onValueChange={(e) => setPhrase(e.target.value)}
        value={phrase}
        name={`search`}
      />

      <FadeIn className='space-y-4'>

        <div onClick={() => history.push('/app/scan-result/1')} className='flex items-center space-x-4 justify-between bg-green_lightx rounded-2xl p-3 cursor-pointer'>
          <div className='flex items-center space-x-4'>
            <img className='h-12' src={Receipt} alt="" />
            <div className='space-y-2'>
              <div className='font-semibold'>Amazing Day</div>
              <div style={{fontSize: '10px'}} className='text-xs text-gray-400 font-medium'>1 May 2020, 11:30 am</div>
            </div>
          </div>
          <div className='flex items-center space-x-1'>
            <div className='flex items-center space-x-1 bg-white rounded-2xl p-2 text-xs font-semibold text-yellow_dark'>
              <img className='w-4' src={PointIcon} alt="" />
              <div>+ 500</div>
            </div>
            <MdOutlineKeyboardArrowRight size={20} className='text-green_light' />
          </div>
        </div>

        <div onClick={() => history.push('/app/scan-result/2')} className='flex items-center space-x-4 justify-between bg-green_lightx rounded-2xl p-3 cursor-pointer'>
          <div className='flex items-center space-x-4'>
            <img className='h-12' src={Receipt} alt="" />
            <div className='space-y-2'>
              <div className='font-semibold'>Amazing Day</div>
              <div style={{fontSize: '10px'}} className='text-xs text-gray-400 font-medium'>1 May 2020, 11:30 am</div>
            </div>
          </div>
          <div className='flex items-center space-x-1'>
            <div className='flex items-center space-x-1 bg-white rounded-2xl p-2 text-xs font-semibold text-yellow_dark'>
              <img className='w-4' src={PointIcon} alt="" />
              <div>+ 500</div>
            </div>
            <MdOutlineKeyboardArrowRight size={20} className='text-green_light' />
          </div>
        </div>


      </FadeIn>
    </FadeIn>
  );
};

export default ScanTracker;
