import axios from 'axios'

export const apiBase = axios.create({
  //   baseURL: '/api',
  baseURL: 'https://halal.halalnest.com/hialal',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '2aa1513c-8998-454e-9d52-fa95b47fb142',
    // Accept: 'application/json',
  },
})
