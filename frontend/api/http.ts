import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { LoginData } from "../pages/login";
import Router from 'next/router';

const BASE_URL = 'http://localhost:3333'

// contracts
interface LoginResponse {
  type: string;
  token: string;
}

class Http {
  http: AxiosInstance;
  constructor() {
    const http = axios.create({
      baseURL: BASE_URL
    });

    axios.interceptors.request.use(function (config) {

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

  async login(loginData: LoginData) {
    return this.http.post<LoginResponse>('/login', loginData)
  }


}

export default new Http();