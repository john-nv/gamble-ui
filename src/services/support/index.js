import support from '@services/support'
import axios from 'axios';

const getSupportLink = async () => {
  let phone = ''
  let http = 'https://zalo.me/'
  const host = support.apiNodeSupport()
  await axios.get(host + '/contacts').then(response => { phone = response.data[0].phone; })
  return phone
}

const apiNodeSupport = () =>
  // 'http://localhost:7171'
  'http://167.86.83.212:7171'

export default {
  getSupportLink,
  apiNodeSupport,
}