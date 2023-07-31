import React, {useState, useEffect} from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { format, parseISO } from 'date-fns';

import InputBox from '../../../components/input-box/input-box';
import SelectBox from '../../../components/select-box'
import {MdOutlineKeyboardArrowRight} from 'react-icons/md'

import PointIcon from '../../../assets/point.svg'
import {ReactComponent as ScanSign} from '../../../assets/scan-sign.svg'
import { useDispatch, useSelector } from 'react-redux';

import useDocumentTitle from '../../../hooks/use-document-title';

import {getTodayDate, getWeeklyStartDate, getAllTimeStartDate} from '../../../util'

import {ScanActions} from '../../../states/actions'

const ScanTracker = ({ className }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [phrase, setPhrase] = useState('')
  const {scannedReceipts} = useSelector(state => state.scan)
  const [filter,setFilter] = useState('Weekly')
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  })

  useDocumentTitle('Scan Tracker')

  useEffect(() => {
    if (filter === 'Daily') {
      setDateRange({from: getTodayDate(), to: getTodayDate()})
    }
    if (filter === 'Weekly') {
      setDateRange({from: getWeeklyStartDate(), to: getTodayDate()})
    }
    if (filter === 'All Time') {
      setDateRange({from: getAllTimeStartDate(), to: getTodayDate()})
    }
  }, [filter])

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      dispatch(ScanActions.fetchScannedReceipts(dateRange.from, dateRange.to))
    }
    // eslint-disable-next-line
  }, [dateRange])

  return (
    <FadeIn className={`${className} flex-1 flex flex-col text-gray-800 space-y-6 p-4 pb-12`}>


      <div className='flex items-center space-x-4 justify-between'>
        <div className='font-semibold text-lg cursor-pointer' onClick={() => history.goBack()}>
          &larr;
        </div>
        <div className='w-36 cursor-pointer'>
          <SelectBox
            className={`bg-yellow-100`}
            defaultValue={'Weekly'}
            onValueChange={e => setFilter(e.target.value)}
            value={filter}
            name={'filter'}
            options={['Daily', 'Weekly', 'All Time']}
          />
        </div>
      </div>

      <FadeIn className='flex items-center space-x-4 justify-between'>
        <div className='font-bold text-lg'>Scan Tracker</div>
        <button onClick={() => history.push('/app/scan')} className='flex items-center space-x-2 w-32 px-3 py-2 rounded-lg cursor-pointer text-white bg-green_light'>
          <ScanSign className='' />
          <div>Scan New</div>
        </button>
      </FadeIn>


      <div className='bg-green_light p-4 rounded-xl text-white text-center'>
        Scan receipts that include Amaizing Day . Each eligible receipt with Amaizing Day cereal earns you points and the more units of Amaizing day recorded, the more points you'll accumulate!
      </div>

      <InputBox
        className={`bg-gray-50 text-gray-800`}
        placeholder={'Search Here'}
        inputType={`search`}
        onValueChange={(e) => setPhrase(e.target.value)}
        value={phrase}
        name={`search`}
      />

      <FadeIn className='space-y-4'>

        {scannedReceipts ? scannedReceipts?.length > 0 ? scannedReceipts?.filter(d => d?.uniqueCode?.toLowerCase()?.includes(phrase?.toLowerCase()) || d?.created_at?.toLowerCase()?.includes(phrase?.toLowerCase()) || String(d?.points)?.toLowerCase()?.includes(phrase?.toLowerCase()))?.map((d, idx) => {
            return (
              <div key={idx} onClick={() => history.push(`/app/scan-result/${d?.uniqueCode?.replaceAll('#', '')}/${d?.points}`)} className='flex items-center space-x-4 bg-green_lightx rounded-2xl p-3 cursor-pointer'>
                <div className='flex items-center space-x-4 flex-1'>
                  <div className='h-12 w-12 bg-gray-100 rounded-xl overflow-hidden'>
                    <img className='h-12 w-12 object-cover object-top rounded-2xl' src={d?.imageUrl} alt="" />
                  </div>
                  <div className='space-y-2 flex-1'>
                    <div className='font-semibold'>{d?.uniqueCode}</div>
                    <div style={{fontSize: '10px'}} className='text-xs text-gray-400 font-medium'>{format(parseISO(d?.created_at), 'dd-MM-yyyy, HH:mm a ')}</div>
                  </div>
                </div>
                <div className='flex items-center space-x-1'>
                  <div className='flex items-center space-x-1 bg-white rounded-2xl p-2 text-xs font-semibold text-yellow_dark'>
                    <img className='w-4' src={PointIcon} alt="" />
                    <div>+ {d?.points}</div>
                  </div>
                  <MdOutlineKeyboardArrowRight size={20} className='text-green_light' />
                </div>
              </div>
            )
          }) : (
            <div>No scans</div>
          ) : <div>Loading...</div>}
      </FadeIn>
    </FadeIn>
  );
};

export default ScanTracker;
