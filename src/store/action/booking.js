import axios from '../../utils/axios';

export const getSeatBooking = (scheduleId, timeBooking, dateBooking) => {
  return {
    type: 'GET_SEAT_BOOKING',
    payload: axios.get(
      `/booking/seat?dateBooking=${dateBooking}&timeBooking=${timeBooking}&scheduleId=${scheduleId}`,
    ),
  };
};

export const getBookingById = bookingId => {
  return {
    type: 'GET_BOOKING_BY_ID',
    payload: axios.get(`/booking/id/${bookingId}`),
  };
};

export const getBookingByUserId = userId => {
  return {
    type: 'GET_BOOKING_BY_USER_ID',
    payload: axios.get(`/booking/user/${userId}`),
  };
};

export const createBooking = form => {
  return {
    type: 'CREATE_BOOKING',
    payload: axios.post(`/booking`, form),
  };
};
