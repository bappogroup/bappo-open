import padStart from 'lodash/padStart';

export const DEFAULT_TIME_DISPLAY_FORMAT = 'h:mm A';
export const DEFAULT_TIME_VALUE_FORMAT = 'HH:mm:ss';
export const HOURS = [
  '12',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
];
export const MINUTES = Array.from({ length: 60 }).map((_unused, index) =>
  padStart(String(index), 2, '0'),
);
export const MERIDIEMS = ['AM', 'PM'];
