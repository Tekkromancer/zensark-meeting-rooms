import axios from 'axios';
import { getTimeText, getTimeMinutes } from '../../utils/textUtils';

const baseURL = ' http://localhost:3002';

const queue = [
  { endpoint: 'config', loaded: false, result: null },
  { endpoint: 'roomCapacities', loaded: false, result: null },
  { endpoint: 'roomTypes', loaded: false, result: null },
  { endpoint: 'rooms', loaded: false, result: null },
  { endpoint: 'bookings', loaded: false, result: null },
];

const data = {};

const checkAllLoaded = () => queue.every(({loaded}) => loaded);
const getForeignKeyData = (foreignID, foreignData) => foreignData.find(({id}) => id === foreignID);
const getBookings = id => data.bookings
  .filter(({ roomID }) => roomID === id)
  .sort((a, b) => a.start - b.start)
  .map(item => ({
    ...item,
    startText: item.start,
    endText: item.end,
    start: getTimeMinutes(item.start),
    end: getTimeMinutes(item.end),
  }));

const getDisplayData = () => 
  data.rooms.map(roomData => {
    return {
      id: roomData.id,
      name: roomData.name,
      roomType: getForeignKeyData(roomData.roomTypeID, data.roomTypes),
      capacity: getForeignKeyData(roomData.capacityID, data.roomCapacities),
      bookings: getBookings(roomData.id),
    };
  });

const getReturnResult = () => {
  queue.reduce((acc, {endpoint, result}) => {
    acc[endpoint] = result;
    return acc;
  }, data);

  data.displayData = getDisplayData();

  return data;
}

export const loadData = callback => {
  const onItemLoaded = (item, response) => {
    item.loaded = true;
    item.result = response.data;
    if (checkAllLoaded()) callback(getReturnResult());
  } 

  const onError = (item, error) => {
    console.group('onError');
    console.log('item', item);
    console.log('response', error);
    console.groupEnd();
  }

  queue.forEach(item => {
    axios.get(`${baseURL}/${item.endpoint}`)
      .then(response => onItemLoaded(item, response))
      .catch(error => onError(item, error));
  });

}

export const addBooking = (bookingData, date, timeslot, callback) => {
  const payload = {
    roomID: bookingData.id,
    date,
    start: getTimeText(timeslot[0]),
    end: getTimeText(timeslot[1]),
  };

  axios.post(`${baseURL}/bookings`, payload)
    .then(response => {
      data.bookings.push(response.data);
      callback(getReturnResult());
    });
};

export const canBook = ({ data: { name, bookings }, timeRange }) => {

  let bookingAllowed = true;
  const [ startTime, endTime ] = timeRange;

  if (endTime - startTime < data.config.increment) return false;

  bookings.forEach(({ start: bookingStart, end: bookingEnd }) => {
    if (startTime >= bookingStart && startTime < bookingEnd) bookingAllowed = false;
    if (endTime > bookingStart && endTime <= bookingEnd) bookingAllowed = false;
    if (startTime < bookingStart && endTime > bookingEnd) bookingAllowed = false;

    
  });

  return bookingAllowed;
}
