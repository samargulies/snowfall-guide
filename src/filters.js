import { toTitleCase, round } from './helpers';

export function snowfallReadingSummary(reading) {
  const name = toTitleCase(reading.Name);
  const amount = parseFloat(reading.Amount);
  const duration = parseFloat(reading.Duration);
  return `${amount} ${reading.Amount_Units} of snow reported at ${name} in the last ${duration} ${reading.Duration_Units}`;
}

export function snowAccumulationText(snowAccumulation) {
  if (snowAccumulation > 0 && snowAccumulation < 1) {
    return '<1';
  }
  return Math.round(snowAccumulation);
}

export function float(number) {
  return parseFloat(number);
}

export function roundToDecimals(value, decimals) {
  return round(value, decimals);
}

export function bearing(number) {
  const conversion = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
  ];
  const angle = Math.floor((((number + 180) / 22.5) + 0.5));
  return conversion[angle % 16];
}
