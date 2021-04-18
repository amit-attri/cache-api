import Logger from './logger';

const sendSuccessResponse = (res, data) => {
  res.status(200).send(data);
};

const handleErrorResponse = (res, error) => {
  res.status(500).json({ message: error.err_message });
};

export default {
  sendSuccessResponse,
  handleErrorResponse,
  Logger
}