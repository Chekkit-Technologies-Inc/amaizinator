import React from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom';

import UserIcon from '../../../assets/user-white.svg'
import KeyIcon from '../../../assets/key-white.svg'
import BellIcon from '../../../assets/bell-white.svg'

import {MdOutlineKeyboardArrowRight} from 'react-icons/md'

const MyAccount = ({ className }) => {
  const history = useHistory()

  return (
    <div className={`${className} flex-1 flex flex-col text-white  p-4 pb-6`}>
      <div className='font-semibold text-lg cursor-pointer' onClick={() => history.goBack()}>
        &larr;
      </div>

      <div className='font-bold text-lg mt-4'>My Acccount</div>

      <div className='flex flex-col flex-1 h-full'>
        <div className='bg-green_light text-white hover:text-white w-24 h-24 flex justify-center items-center rounded-full mx-auto relative top-8 text-2xl font-bold'>
          BA
        </div>
        <div className='bg-white flex-1 rounded-2xl text-gray-800 p-4 pt-10'>
          <div className='font-bold text-lg text-center'>Barbie Ghost</div>

          <FadeIn className='space-y-4 mt-6'>
            <Link to='/app/update-profile' className='no-underline hover:no-underline flex items-center space-x-4 justify-between bg-green_lightx rounded-2xl p-3'>
              <div className='flex items-center space-x-4'>
                <div className='w-8 h-8 bg-green_light flex justify-center items-center p-1 rounded-md'>
                  <img className='h-4' src={UserIcon} alt="" />
                </div>
                <div className='space-y-1'>
                  <div className='font-medium text-xs text-gray-800 hover:text-gray-800'>Update Profile</div>
                  <div style={{fontSize: '10px'}} className='text-gray-700 hover:text-gray-700'>Name ,phone number and more</div>
                </div>
              </div>
              <MdOutlineKeyboardArrowRight size={20} className='text-gray-400 hover:text-gray-400' />
            </Link>
            <Link to='/app/change-password' className='no-underline hover:no-underline flex items-center space-x-4 justify-between bg-green_lightx rounded-2xl p-3'>
              <div className='flex items-center space-x-4'>
                <div className='w-8 h-8 bg-green_light flex justify-center items-center p-1 rounded-md'>
                  <img className='h-4' src={KeyIcon} alt="" />
                </div>
                <div className='space-y-1'>
                  <div className='font-medium text-xs text-gray-800 hover:text-gray-800'>Change Password</div>
                  <div style={{fontSize: '10px'}} className='text-gray-700 hover:text-gray-700'>Reset Password</div>
                </div>
              </div>
              <MdOutlineKeyboardArrowRight size={20} className='text-gray-400 hover:text-gray-400' />
            </Link>

            <div className='no-underline hover:no-underline flex items-center space-x-4 justify-between bg-green_lightx rounded-2xl p-3'>
              <div className='flex items-center space-x-4'>
                <div className='w-8 h-8 bg-green_light flex justify-center items-center p-1 rounded-md'>
                  <img className='h-4' src={BellIcon} alt="" />
                </div>
                <div className='space-y-1'>
                  <div className='font-medium text-xs text-gray-800 hover:text-gray-800'>Notification</div>
                  <div style={{fontSize: '10px'}} className='text-gray-700 hover:text-gray-700'>Turn on and off notification</div>
                </div>
              </div>
              <MdOutlineKeyboardArrowRight size={20} className='text-gray-400 hover:text-gray-400' />
            </div>
          </FadeIn>
        </div>
      </div>

    </div>
  );
};

export default MyAccount;
