import moment from 'moment';

//format date, hours
export const dayFormat = (time) => moment(time).format("DD/MM/YYYY");
export const hourFormat = (value) => moment(value).format('LT');