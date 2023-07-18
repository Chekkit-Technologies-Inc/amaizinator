import http from '../http';

export const scanReceipt = async data => {
  return http().post('/amazing-day-campaign/process-receipt', data);
};

export const retrieveScans = async (from, to) => {
  return http().get(`/amazing-day-campaign/scanned-receipt?fromDate=${from}&toDate=${to}`);
};


const ScanService = {
  scanReceipt,
  retrieveScans,
};

export default ScanService;
