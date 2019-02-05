export function toTitleCase(text) {
  return text.toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}

export function getDay(date) {
  return `0${date.getDate()}`.slice(-2);
}

export function getMonth(date) {
  return `0${date.getMonth() + 1}`.slice(-2);
}

export function closestReadingHour(date) {
  let hour = Math.floor(date.getHours() / 6) * 6;
  if (hour >= 24) { hour = 0; }
  return `0${hour}`.slice(-2);
}

export function round(value, decimals) {
  return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
}

export function parseUrlTitle(text) {
  if (!text) {
    return text;
  }
  return text.replace(/--/g, ', ').replace(/-/g, ' ');
}

export function encodeUrlTitle(text) {
  if (!text) {
    return text;
  }
  return text.replace(/, /g, '--').replace(/\W/g, '-');
}
