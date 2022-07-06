import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { LoginData } from "../pages/login";
import Router from 'next/router';

const BASE_URL = 'http://localhost:3333'

// contracts
interface LoginResponse {
  type: string;
  token: string;
}

export type User = {
  id: number;
  name: string;
  desc: string;
  age: number;
  latitude: number;
  longitude: number;
  created_at: Date;
  updated_at: Date;
  distance: string;
}

export type Coordinates = {
  lat: number,
  lon: number
}

class Http {
  http: AxiosInstance;

  constructor() {
    const http = axios.create({
      baseURL: BASE_URL
    });

    http.interceptors.request.use(function (config) {

      if (config.headers === undefined) {
        config.headers = {};
      }
      const token = window.localStorage.getItem("token");
      if (token) config.headers['Authorization'] = `Bearer ${token}`

      return config;
    })

    http.interceptors.response.use(this.handleSuccess, this.handleError)

    this.http = http;
  }

  private handleSuccess(response: AxiosResponse) {
    return response;
  }

  private handleError(error: AxiosError|Error) {
    if(!axios.isAxiosError(error)){
      return Promise.reject(error);
    }
    switch (error.response?.status) {
      case 401:
        window.localStorage.removeItem("token");
        Router.replace('/login')
        break;
    }
    return Promise.reject(error);
  }

  request(args: AxiosRequestConfig) {
    return this.http.request(args);
  }

  async createOrLogin(loginData: LoginData) {
    return this.http.post<LoginResponse>('/login', loginData)
  }

  async updateMySelfAndGetNearUsers(coords: Coordinates) {
    return this.http.put<User[]>('/users', coords)
  }

}

export default new Http();