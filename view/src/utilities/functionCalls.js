import axios from 'axios';
import { getItem } from './storage';

export default id => (
  axios.delete(`${process.env.API_URL}/questions/${id}`, {
    headers: {
      Authorization: getItem('token'),
    },
  }));
