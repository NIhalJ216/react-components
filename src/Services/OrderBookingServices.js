import { getData, postData } from './rest-services';
import { APIS } from '../Utils/apiList';

export const orderBooking = (data) =>
  postData(`${APIS.OERDER_BOOKING}`, data);

export const getPreviousOrders = (userId) =>
  getData(`${APIS.GET_PREVIOUS_ORDERS}${userId}`);
