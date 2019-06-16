import axios from 'axios';
import ApiNavigation from './ApiNavigation';
import dataMemoryService from './storage';

const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
});

const authenticatedRequest = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
});

console.log(ApiNavigation.getRoute('userSignup'));

authenticatedRequest.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${dataMemoryService.getItem('currentUser')}`;
  return config;
});

export { authenticatedRequest }

export const userSignup = (data) => {
  return request({
    method: 'post',
    url: ApiNavigation.getRoute('userSignup'),
    data,
  }).then(({ data: result }) => {
    dataMemoryService.saveItem('currentUser', result.data);
    return true;
  })
};

export const userLogin = (data) => {
  return request({
    method: 'post',
    url: ApiNavigation.getRoute('userLogin'),
    data,
  }).then(({ data: result }) => {
    console.log(result.data);
    dataMemoryService.saveItem('currentUser', result.data);
    return true;
  })
};
