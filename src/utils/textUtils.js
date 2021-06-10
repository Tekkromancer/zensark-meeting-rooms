export const getTimeText = value => {
  let hours = Math.floor(value / 60);
  const meridian = hours < 12 ? 'AM' : 'PM';
  if (meridian === 'PM') hours -= 12;

  if (hours === 0) hours = 12;

  const minutes = value % 60;
  return `${hours}:${minutes === 0 ? '00' : minutes} ${meridian}`;
};

export const getTimeMinutes = value => {
  const meridian = value.substr(value.indexOf(' ') + 1);
  const time = value.substr(0, value.indexOf(' '));
  let [hours, minutes] = time.split(':');
  hours = Number(hours);
  minutes = Number(minutes);
  if (meridian === 'PM' && hours < 12) hours += 12;
  return hours * 60 + minutes;
};
