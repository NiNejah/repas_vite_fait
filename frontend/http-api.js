import axios from 'axios';
import { getRecipes } from '../api/src/controllers/edamamController';

const instance = axios.create({
  baseURL: "/api", 
  timeout: 15000,
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, params) => instance.get(url, { params }).then(responseBody),
  post: (url, body) => instance.post(url, body).then(responseBody),
  delete: (url, body) => instance.delete(url, { data: body }).then(responseBody)
};

export const api = {
  getAllUsers: () => requests.get('users', {}),
  addUser: (body) => requests.post('users', body),
  login: (body) => requests.post('users/login', body),
  addFavorite: (id, body) => requests.post(`users/${id}/favorites/add`, body),
  getFavorites: (id) => requests.get(`users/${id}/favorites`, {}),
  deleteFavorite: (id, body) => requests.delete(`users/${id}/favorites/remove`, body),
  addToSchedule: (id, body) => requests.post(`users/${id}/program/add`, body),
  getSchedule: (id) => requests.get(`users/${id}/program`, {}),
  getRecipes: (body) => requests.post('recipes', body),
  getRecipeByID: (id) => requests.get(`recipes/${id}`, {})
};