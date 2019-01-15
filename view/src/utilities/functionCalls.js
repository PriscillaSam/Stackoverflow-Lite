import axios from 'axios';
import { getItem } from './storage';

export default id => (
  axios.delete(`${process.env.API_URL}/questions/${id}`, {
    headers: {
      Authorization: getItem('token'),
    },
  }));

export const favoriteAnswer = (questionId, id) => (
  axios.put(`${process.env.API_URL}/questions/${questionId}/answers/${id}`,
    {}, {
      headers: {
        Authorization: getItem('token'),
      },
    }));
