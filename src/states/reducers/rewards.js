import { FETCH_REWARDS } from '../type';

const initialState = [];

const rewardReducer = (rewards = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_REWARDS:
      return payload;
    default:
      return rewards;
  }
};

export default rewardReducer;
