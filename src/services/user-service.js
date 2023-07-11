import http from '../http';

export const authenticate = async data => {
  return http().post('/spin-wheel/user', data);
};

export const requestOtp = async (campaignSlug, phoneNumber, countryCode) => {
  let data = {campaign_slug:campaignSlug, phone_number: phoneNumber, country_code: countryCode}
  return http().post(`/spin-wheel-otp`, data);
};

const UserService = {
  authenticate,
  requestOtp,
};

export default UserService;
