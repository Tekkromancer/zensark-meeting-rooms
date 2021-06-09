import axios from 'axios';

const baseURL = ' http://localhost:3002';

const queue = [
  { endpoint: 'config', loaded: false, result: null },
  { endpoint: 'roomCapacities', loaded: false, result: null },
  { endpoint: 'roomTypes', loaded: false, result: null },
  { endpoint: 'rooms', loaded: false, result: null },
];

const data = {};

const checkAllLoaded = () => queue.every(({loaded}) => loaded);
const getForeignKeyData = (foreignID, foreignData) => foreignData.find(({id}) => id === foreignID);

const getReturnResult = () => {
  queue.reduce((acc, {endpoint, result}) => {
    acc[endpoint] = result;
    return acc;
  }, data);

  data.displayData = data.rooms.map(roomData => {
    return {
      id: roomData.id,
      name: roomData.name,
      roomType: getForeignKeyData(roomData.roomTypeID, data.roomTypes),
      capacity: getForeignKeyData(roomData.capacityID, data.roomCapacities),
    };
  });

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