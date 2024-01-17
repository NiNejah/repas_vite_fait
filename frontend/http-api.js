import axios from 'axios';

const instance = axios.create({
  baseURL: "/api", 
  timeout: 15000,
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, params) => instance.get(url, { params }).then(responseBody),
  post: (url, body) => instance.post(url, body).then(responseBody),
  delete: (url, body) => instance.delete(url, { data: body }).then(responseBody),
  put: (url, body) => instance.put(url, body).then(responseBody),
  post: (url, body, token) => instance.post(url, body,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(responseBody),
  put: (url, body, token) => instance.post(url, body,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(responseBody),
};

export const api = {
  getAllUsers: (token) => requests.get('users', {},token),
  addUser: (body) => requests.post('users', body),
  login: (body) => requests.post('users/login', body),
  addFavorite: (id, body,token) => requests.post(`users/${id}/favorites/add`, body,token),
  getFavorites: (id) => requests.get(`users/${id}/favorites`, {}),
  deleteFavorite: (id, body) => requests.delete(`users/${id}/favorites/remove`, body),
  addToSchedule: (id, body,token) => requests.post(`users/${id}/program/add`, body,token),
  getSchedule: (id) => requests.get(`users/${id}/program`, {})
};