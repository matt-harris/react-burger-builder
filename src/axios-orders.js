import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-49ea2.firebaseio.com/',
});

export default instance;
