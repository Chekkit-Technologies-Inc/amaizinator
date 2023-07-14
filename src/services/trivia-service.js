import http from '../http';

export const retrieveAllTrivia = async () => {
  return http().get(`/amazing-day-campaign/trivia`);
};

export const submitTrivia = async data => {
  return http().post(`/amazing-day-campaign/trivia-response`, data);
};

export const retrieveWinnings = async (from, to) => {
  return http().get(`/amazing-day-campaign/winngs?fromDate=${from}&toDate=${to}`);
};

export const retrieveLeaderboard = async (from, to) => {
  return http().get(`/amazing-day-campaign/leaderboard?fromDate=${from}&toDate=${to}`);
};

const TriviaService = {
  retrieveAllTrivia,
  submitTrivia,
  retrieveWinnings,
  retrieveLeaderboard,
};

export default TriviaService;
