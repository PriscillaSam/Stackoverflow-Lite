import { getItem } from './storage';

const isLoggedIn = () => getItem('token') !== null;
export default isLoggedIn;
