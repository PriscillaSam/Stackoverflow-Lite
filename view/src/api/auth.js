import axios from 'axios';

const url = process.env.API_URL;

const fetcher = (body, link) => axios.post(`${url}/auth/${link}`, body);

export const signUpApi = body => fetcher(body, 'signup');
export const logInApi = body => fetcher(body, 'login');
