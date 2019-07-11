import { format } from 'date-fns';

export default rawDate => {
  return format(new Date(rawDate), 'Do MMMM[,] YYYY [at] HH:MM');
};
