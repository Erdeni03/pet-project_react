import axios from 'axios'
import { IPosts } from '../../helpers/types/types'

export const getPosts = (url: string) => {
  return axios.get<IPosts[]>(url)
}
