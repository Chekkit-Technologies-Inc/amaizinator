import { FETCH_SCANNED_RECEIPTS } from '../type';

import { ScanService } from '../../services';
import { notify, loading } from './response';

export const fetchScannedReceipts = (from, to) => async dispatch => {
  dispatch(loading({ loading: true }));

  try {
    const res = await ScanService.retrieveScans(from, to);

    dispatch(notify({ loading: false }));

    dispatch({
      type: FETCH_SCANNED_RECEIPTS,
      payload: res?.data?.data,
    });

    return Promise.resolve(res?.data?.data);
  } catch (err) {
    dispatch(notify({ loading: false }));

    dispatch({
      type: FETCH_SCANNED_RECEIPTS,
      payload: [],
    });

    return Promise.reject(err);
  }
};

export const scanReceipt = (data) => async dispatch => {

  dispatch(loading({ loading: true }));

  try {
    const res = await ScanService.scanReceipt(data);

    dispatch(notify({ loading: false }));

    return Promise.resolve(res?.data?.data);
  } catch (err) {
    dispatch(notify({ title: "", message: err.response?.data?.message || err.message, type: 'error', loading: false }));

    return Promise.reject(err);
  }
};

const ScanActions = {
  fetchScannedReceipts,
  scanReceipt
};

export default ScanActions;
