import http from '../http';

export const retrieveRewards = async slug => {
  return http().get(`/insight-campaign/${slug}`);
};

export const claimReward = async data => {
  return http().post(`/spin-wheel/reward`, data);
};

const RewardService = {
  retrieveRewards,
  claimReward,
};

export default RewardService;
