import React from 'react'
import Bambi from '../../assets/bambi.svg'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { format, parseISO } from 'date-fns'

const ItemGameTrivia = ({ d }) => {
  return (
    <div className='relative'>
      {!d?.isAvailable && <div onClick={e => {
        e.preventDefault()
        e.stopPropagation()
      }} className='absolute z-50 right-0 left-0 top-0 bottom-0 bg-white rounded-2xl font-bold text-green_light text-2xl flex flex-col justify-center items-center bg-opacity-80 text-center pointer-events-none p-4'><div>Available on</div> <div className='text-sm text-green_dark'>{format(parseISO(d?.availableDate), 'EEE dd MMM, yyyy')}</div></div>}
      <>
        {d?.isGame ? (
          <Link to={`/app/game-home/${d?.id}`} className={`${d?.isAvailable ? '' : 'pointer-events-none'} flex flex-col justify-center text-left cursor-pointer p-4 rounded-2xl bg-green-50  no-underline hover:no-underline capitalize text-base space-y-2 flex-shrink-0 relative`}>
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
                <div style={{ fontSize: '10px' }} className='text-xs line-clamp-1'>{`Game ${d?.points ? `• ${d?.points} point${d?.points > 1 ? 's' : ''}` : ''}`}</div>
              </div>
            </div>
          </Link>
        ) : (
          <Link to={`/app/trivia-home/${d?.slug}`} className={`${d?.isAvailable ? '' : 'pointer-events-none'} flex flex-col justify-center text-left cursor-pointer p-4 rounded-2xl bg-green-50  no-underline hover:no-underline capitalize text-base space-y-2 flex-shrink-0 relative`}>
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
                <div style={{ fontSize: '10px' }} className='text-xs line-clamp-1'>Trivia • {d?.trivia_points} point{d?.trivia_points > 1 ? 's' : ''}</div>
              </div>
            </div>
          </Link>
        )}
      </>
    </div>
  )
}

export default ItemGameTrivia
