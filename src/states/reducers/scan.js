import { FETCH_SCANNED_RECEIPTS } from '../type';

const initialState = {};

const scanReducer = (scan = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_SCANNED_RECEIPTS:
      return {...scan, scannedReceipts: payload};
    default:
      return scan;
  }
};

export default scanReducer;
