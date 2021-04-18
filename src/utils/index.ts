import { v5 } from 'uuid';
import * as moment from 'moment';

import Logger from './logger';

const getRandomString = () => {
  return v5();
};

const getCurrentUtcTime = () => {
  return moment.utc();
};

const sendSuccessResponse = (res, data) => {
  res.status(200).send(data);
};

const handleErrorResponse = (res, error) => {
  res.status(500).json({ message: error.err_message });
};

export default {
  sendSuccessResponse,
  handleErrorResponse,
  Logger,
  getRandomString,
  getCurrentUtcTime
}