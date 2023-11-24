import axios from 'axios';

const instance = axios.create({
  baseURL: "/api", 
  timeout: 15000,
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, params) => instance.get(url, { params }).then(responseBody),
  post: (url, body) => instance.post(url, body).then(responseBody),
};

export const api = {
  getContacts: () => requests.get('contacts', {}),
  addContact: (body) => requests.post('contact',body),
};