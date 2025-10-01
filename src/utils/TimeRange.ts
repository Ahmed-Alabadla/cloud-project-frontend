import moment from 'moment';

const getTimeRanges = (datetime:string) => {
  const from = moment(datetime).format('HH-mm');
  const to = moment(datetime).add(1, 'hours').format('HH-mm');
  return { from, to };
};

export default getTimeRanges;
