import { Axios } from 'axios-observable';
import { AxiosError, AxiosResponse } from 'axios';

export const handleError = (error: AxiosError, msj = 'Inexpected Error') => {
  const response = error.response as AxiosResponse<{ error?: string }>;
  if (response) {
    return response.data.error || msj;
  }
  return error.message;
};

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_API
});
