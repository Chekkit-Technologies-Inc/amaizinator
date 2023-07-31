import React, { useState, useRef, useEffect } from "react";
import {Camera} from "react-camera-pro";
import { Switch, Route, useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useDispatch, useSelector } from 'react-redux';
import { CgSpinner } from 'react-icons/cg';

import {ReactComponent as ScanSign} from '../../../assets/scan-sign.svg'
import PointCard from '../../../components/point-card/point-card';
import Button from '../../../components/button/button';

import useDocumentTitle from '../../../hooks/use-document-title';

import {ScanActions, ResponseActions} from '../../../states/actions'

const Scan = ({ className }) => {
  const {unique_code, points} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()
  const {loading} = useSelector(state => state.response)
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  useDocumentTitle('Scan')

  useEffect(() => {
    setImage(null)
  }, [location])

  const scanImage = () => {
    dispatch(ScanActions.scanReceipt({photo: image})).then(res => {
      if (res.uniqueCode && !res.uniqueCode.includes('NAN')) {
        dispatch(ResponseActions.notify({ title: "", message: 'Good job!', type: 'success', loading: false }));
        history.push(`/app/scan-result/${res?.uniqueCode?.replaceAll('#', '')}/${res?.points}`)
      } else {
        dispatch(ResponseActions.notify({ title: "", message: 'An error occured', type: 'error', loading: false }));
      }
    })
  }

  return (
    <Switch>
      <Route exact path='/app/scan'>
        <div className={`${className} flex-1 flex flex-col text-gray-800 bg-green-50`}>

          <FadeIn className='p-4 bg-white space-y-4'>
            <div className='font-semibold text-lg cursor-pointer' onClick={() => history.goBack()}>
              &larr;
            </div>
            <div className="text-center text-green_dark">Please scan receipts that contains <b>Amaizing day</b> products from flour mills and date</div>
          </FadeIn>


          <div className='flex-1 flex justify-center items-center'>
            {!image ? <div className='w-full m-10 bg-camera p-1'>
              <Camera ref={camera} mirrored={"true"} facingMode="environment" aspectRatio={1 / 1} />
            </div> :<div className='w-full m-10'>
              <img className="rounded-2xl" src={image} alt='Taken'/>
            </div>  }
          </div>


          <div className='space-y-4 p-4 pt-6 pb-12 bg-white rounded-t-3xl text-center'>
            <div className='font-medium text-gray-400 text-base'>Hold steady...</div>
            {!image ? <div onClick={() => setImage(camera.current.takePhoto())} className='border border-green_dark text-green_dark font-semibold px-6 py-4 text-center rounded-xl cursor-pointer'>Take photo</div> : (
              <div className="grid grid-cols-2 gap-4">
                <div onClick={() => setImage(null)} className={`${loading ? 'pointer-events-none opacity-50' : ''} border border-green-100 text-green_dark font-semibold px-6 py-4 text-center rounded-xl cursor-pointer`}>Retake photo</div>
                <div onClick={scanImage} className='text-white bg-green_dark font-semibold px-6 py-4 text-center rounded-xl cursor-pointer'>
                  {!loading && (
                    <span>Process photo</span>
                  )}
                  {loading && (
                    <div className='flex justify-center'>
                      <CgSpinner className={`font-semibold animate-spin`} size={20} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </Route>

      <Route exact path='/app/scan-result/:unique_code/:points'>
        <FadeIn className={`${className} flex-1 flex flex-col text-gray-800 space-y-6 pt-4 pb-12`}>
          <div className='font-semibold text-lg cursor-pointer px-4' onClick={() => history.goBack()}>
            &larr;
          </div>

          <FadeIn className='flex items-center space-x-4 justify-between px-4'>
            <div className='font-bold text-lg'>Scan Result</div>
          </FadeIn>


          <FadeIn className='p-4 border-t-8 border-gray-100 space-y-4'>
            <div className='flex items-center space-x-4 justify-between'>
              <div className='font-semibold text-base text-gray-300'>#{`${unique_code}`}</div>
              <div onClick={() => history.push('/app/scan')} className='flex items-center space-x-2 cursor-pointer text-green_light font-medium text-xs'>
                <ScanSign className='' />
                <div>Scan New</div>
              </div>
            </div>
            {/* <div>
              <div style={{fontSize: '12px'}} className='text-gray-400'>Business Name</div>
              <div className='font-semibold'>Shoprite</div>
            </div>
            <FadeIn className='grid grid-cols-3 gap-4'>
              <div>
                <div style={{fontSize: '12px'}} className='text-gray-400 line-clamp-1'>Invoice Number</div>
                <div className='font-semibold'>#24434</div>
              </div>
              <div>
                <div style={{fontSize: '12px'}} className='text-gray-400 line-clamp-1'>Scan Date</div>
                <div className='font-semibold'>02/02/23</div>
              </div>
              <div>
                <div style={{fontSize: '12px'}} className='text-gray-400 line-clamp-1'>Amount</div>
                <div className='font-semibold'>₦5,000.00</div>
              </div>
            </FadeIn>
            <div className='font-semibold text-base text-gray-300'>Items</div>
            <div className='space-y-1'>
              <div className='font-semibold'>Amaizing Day</div>
              <div className='text-gray-400 line-clamp-1 font-medium'>₦500</div>
            </div>
            <div className='space-y-1'>
              <div className='font-semibold'>Amaizing Day</div>
              <div className='text-gray-400 line-clamp-1 font-medium'>₦500</div>
            </div>
            <div className='space-y-1'>
              <div className='font-semibold'>Amaizing Day</div>
              <div className='text-gray-400 line-clamp-1 font-medium'>₦500</div>
            </div>
            <div className='w-full h-1 border-b'></div> */}
            <PointCard point={points} />
            <Button className={'capitalize'} onClick={() => history.push('/app/dashboard')} text='Go to Dashboard' />
          </FadeIn>

        </FadeIn>
      </Route>
    </Switch>
  );
};

export default Scan;
