import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Switch, Route } from 'react-router-dom';
import { shuffle } from 'lodash';

import SpinToWin from '../components/spin-to-win';
import Button from '../components/button/button';
import Loader from '../components/loader/loader';

import { ReactComponent as PrizeBox } from '../../assets/box.svg';

import { RewardActions } from '../states/actions';

const style = [
  { backgroundColor: '#46F7AD', textColor: '#000000' },
  { backgroundColor: '#9747FF', textColor: 'white' },
  { backgroundColor: '#F44771', textColor: 'white' },
  { backgroundColor: '#153853', textColor: 'white' },
  { backgroundColor: '#9747FF', textColor: 'white' },
  { backgroundColor: '#F44771', textColor: 'white' },
  { backgroundColor: '#153853', textColor: 'white' },
  { backgroundColor: '#EE9AE5', textColor: 'white' },
  { backgroundColor: '#46F7AD', textColor: '#000000' },
  { backgroundColor: '#9747FF', textColor: 'white' },
  { backgroundColor: '#F44771', textColor: 'white' },
  { backgroundColor: '#9747FF', textColor: 'white' },
  { backgroundColor: '#F44771', textColor: 'white' },
  { backgroundColor: '#153853', textColor: 'white' },
  { backgroundColor: '#153853', textColor: 'white' },
  { backgroundColor: '#EE9AE5', textColor: 'white' },
  { backgroundColor: '#46F7AD', textColor: '#000000' },
  { backgroundColor: '#9747FF', textColor: 'white' },
  { backgroundColor: '#F44771', textColor: 'white' },
  { backgroundColor: '#9747FF', textColor: 'white' },
  { backgroundColor: '#F44771', textColor: 'white' },
  { backgroundColor: '#153853', textColor: 'white' },
  { backgroundColor: '#153853', textColor: 'white' },
  { backgroundColor: '#EE9AE5', textColor: 'white' },
  { backgroundColor: '#46F7AD', textColor: '#000000' },
  { backgroundColor: '#9747FF', textColor: 'white' },
  { backgroundColor: '#F44771', textColor: 'white' },
  { backgroundColor: '#153853', textColor: 'white' },
  { backgroundColor: '#EE9AE5', textColor: 'white' },
  { backgroundColor: '#9747FF', textColor: 'white' },
  { backgroundColor: '#F44771', textColor: 'white' },
  { backgroundColor: '#153853', textColor: 'white' },
  { backgroundColor: '#46F7AD', textColor: '#000000' },
  { backgroundColor: '#9747FF', textColor: 'white' },
  { backgroundColor: '#F44771', textColor: 'white' },
  { backgroundColor: '#9747FF', textColor: 'white' },
  { backgroundColor: '#F44771', textColor: 'white' },
  { backgroundColor: '#153853', textColor: 'white' },
  { backgroundColor: '#153853', textColor: 'white' },
  { backgroundColor: '#EE9AE5', textColor: 'white' },
  { backgroundColor: '#46F7AD', textColor: '#000000' },
  { backgroundColor: '#46F7AD', textColor: '#000000' },
  { backgroundColor: '#9747FF', textColor: 'white' },
  { backgroundColor: '#F44771', textColor: 'white' },
  { backgroundColor: '#153853', textColor: 'white' },
  { backgroundColor: '#EE9AE5', textColor: 'white' },
  { backgroundColor: '#EE9AE5', textColor: 'white' },
  { backgroundColor: '#F44771', textColor: 'white' },
  { backgroundColor: '#153853', textColor: 'white' },
  { backgroundColor: '#153853', textColor: 'white' },
  { backgroundColor: '#EE9AE5', textColor: 'white' },
  { backgroundColor: '#46F7AD', textColor: '#000000' },
  { backgroundColor: '#46F7AD', textColor: '#000000' },
  { backgroundColor: '#9747FF', textColor: 'white' },
  { backgroundColor: '#F44771', textColor: 'white' },
  { backgroundColor: '#153853', textColor: 'white' },
  { backgroundColor: '#EE9AE5', textColor: 'white' },
  { backgroundColor: '#EE9AE5', textColor: 'white' },
];

const Spin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const rewards = useSelector(state => state.rewards);
  const user = useSelector(state => state.user);
  const response = useSelector(state => state.response);
  const [spinning, setSpinning] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [spinned, setSpinned] = useState(false);
  const [result, setResult] = useState('');
  const [wheelData, setWheelData] = useState([]);
  const [spinCount, setSpinCount] = useState(2);

  useEffect(() => {
    if (!user.id) {
      history.push('/');
    }
    let localSlug = localStorage.getItem('slug');
    if (localSlug) {
      dispatch(RewardActions.fetchRewards(localSlug));
    } else {
      dispatch(RewardActions.fetchRewards('string-8ce07701be17'));
      localStorage.setItem('slug', 'string-8ce07701be17');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (rewards && rewards.length > 0) {
      let apiRewards = rewards.map((d, i) => {
        d.style = style[i];
        // eslint-disable-next-line
        d.option = d.reward_type == 'Airtime' ? `₦${d.reward_value} ${d.reward_type.toUpperCase()}` : d.reward_value.toUpperCase();
        return d;
      });

      if (user.membership_type === 'user') {
        apiRewards = apiRewards.filter(d => !d.option.toLowerCase().includes('trial') && !d.option.toLowerCase().includes('pilot'));
      }

      let tryAgain = Array.from(Array(Math.ceil(apiRewards.length)).keys()).map(i => {
        if (i % 2 === 0) {
          return { option: 'TRY AGAIN', style: style[apiRewards.length + 1 + i] };
        } else {
          return { option: 'LOSE', style: style[apiRewards.length + 1 + i] };
        }
      });

      let data = [...apiRewards, ...tryAgain];

      setWheelData(shuffle(data));
    }
    // eslint-disable-next-line
  }, [rewards]);

  useEffect(() => {
    if (result) {
      if (result.option === 'LOSE') {
        claimReward();
      }
      if (result.option === 'TRY AGAIN' && spinCount <= 0) {
        claimReward();
      }
    }
    // eslint-disable-next-line
  }, [result, spinCount]);

  function stopSpin() {
    setSpinning(false);
    setSpinned(true);
    setSpinCount(spinCount => spinCount - 1);
    setResult(wheelData[prizeNumber]);
  }

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
    setPrizeNumber(newPrizeNumber);
    setSpinning(true);
  };

  const claimReward = () => {
    let data = { user_id: user.id, slug: localStorage.getItem('slug') };
    if (result && result.option !== 'TRY AGAIN' && result.option !== 'LOSE') {
      data = { ...data, reward_id: result.id };
    }
    dispatch(RewardActions.claimReward(data))
      .then(_ => {
        setTimeout(() => {
          history.push('/app/thank-you');
        }, 1000);
      })
      .catch(console.log);
  };

  return (
    <Switch>
      <Route exact path={'/app/spin'}>
        <div className='h-full flex flex-col justify-between items-center p-6 relative'>
          <div>{!spinned && <div className='font-semibold text-lg text-white'>Spin To Win</div>}</div>
          {wheelData && wheelData.length > 0 ? (
            <SpinToWin data={wheelData} spinning={spinning} onSpinStop={stopSpin} prizeNumber={prizeNumber} />
          ) : response.loading ? (
            <Loader />
          ) : (
            <div className='font-semibold text-lg text-white'>Invalid Campaign</div>
          )}
          <div className='w-full flex justify-center'>
            {!spinned && !response.loading && wheelData && wheelData.length > 0 && (
              <Button
                text={spinning ? 'Spinning' : 'Spin'}
                disabled={spinning}
                className={`w-60 ${spinning ? `pointer-events-none` : ``} ${spinCount <= 0 ? 'pointer-events-none opacity-50' : ''}`}
                onClick={handleSpinClick}
              />
            )}
          </div>
          {spinned && result && (
            <div className='z-30 fixed top-0 right-0 left-0 bottom-0 bg-gray-900 bg-opacity-50 py-10 flex flex-col items-center justify-between text-center'>
              <div className='space-y-6 flex flex-col items-center'>
                <div className='font-semibold text-lg text-white'>
                  {result && result.option !== 'TRY AGAIN' && result.option !== 'LOSE' && <span>You have won </span>}
                  <span className='text-primary'>{result.option}</span>
                </div>
                {result && result.option !== 'TRY AGAIN' && result.option !== 'LOSE' && <PrizeBox />}
              </div>
              {result && result.option !== 'TRY AGAIN' && result.option !== 'LOSE' && <Button text={'Claim Reward'} className={`w-60`} onClick={claimReward} />}
              {result && result.option === 'LOSE' && <Button text={'Finish'} className={`w-60`} onClick={() => history.push('/app/thank-you')} />}
              {result && result.option === 'TRY AGAIN' && spinCount > 0 ? (
                <div className='space-y-4'>
                  <Button
                    text={'Try again'}
                    className={`w-60`}
                    onClick={() => {
                      setSpinned(false);
                      setResult(null);
                    }}
                  />
                  <div className='text-white font-medium text-center text-xs'>{`You have ${spinCount} spin left`}</div>
                </div>
              ) : (
                result &&
                result.option === 'TRY AGAIN' && (
                  <div className='space-y-4'>
                    <Button text={'Finish'} className={`w-60`} onClick={() => history.push('/app/thank-you')} />
                    <div className='text-white font-medium text-center text-xs'>{`You have ${spinCount} spin left`}</div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </Route>
      <Route exact path={'/app/thank-you'}>
        <div className='h-full flex flex-col justify-center items-center p-6 relative'>
          {result && result.option !== 'TRY AGAIN' && result.option !== 'LOSE' && <div className='text-center text-white'>Reward claimed</div>}
          <div className='text-2xl font-bold text-center text-primary'>Thank you!</div>
        </div>
      </Route>
    </Switch>
  );
};

export default Spin;
