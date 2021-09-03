import axios from 'axios';
import { IPosts } from '../../types/types';

export const getPosts = (url: string) => {
  return axios.get<IPosts[]>(url);
};
