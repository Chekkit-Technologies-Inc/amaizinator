import { FETCH_REWARDS, CLAIM_REWARD } from '../type';

import { RewardService } from '../../services';
import { notify, loading } from './response';

export const fetchRewards = slug => async dispatch => {
  dispatch(loading({ loading: true }));

  try {
    const res = await RewardService.retrieveRewards(slug);

    dispatch(notify({ loading: false }));

    dispatch({
      type: FETCH_REWARDS,
      payload: res.data.data?.campaign?.reward.filter(d => d.reward_quantity > 0),
    });
    return Promise.resolve(res.data.data);
  } catch (err) {
    dispatch({
      type: FETCH_REWARDS,
      payload: [],
    });
    dispatch(notify({ loading: false }));
    return Promise.reject(err);
  }
};

export const claimReward = data => async dispatch => {
  if (!data) return;

  dispatch(loading({ loading: true }));

  try {
    const res = await RewardService.claimReward(data);
    console.log('Reward claimed', res);

    dispatch(notify({ loading: false }));

    dispatch({
      type: CLAIM_REWARD,
    });
    return Promise.resolve();
  } catch (err) {
    dispatch(notify({ loading: false }));
    return Promise.reject(err);
  }
};

const RewardActions = {
  fetchRewards,
  claimReward,
};

export default RewardActions;
