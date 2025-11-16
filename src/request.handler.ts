import { AxiosResponse } from 'axios';
import express from 'express';

export const axiosRequestHandler =
  (resourceRequestPromise: Promise<AxiosResponse>) =>
  async (req: express.Request, res: express.Response) => {
    try {
      const { data } = await resourceRequestPromise;
      res.json(data);
    } catch (error) {
      console.error(error);
      res.json(res.errored);
    }
  };

export const defaultRequestHandler =
  <T>(resourceRequestPromise: Promise<T>) =>
  async (req: express.Request, res: express.Response) => {
    try {
      const data = await resourceRequestPromise;
      res.json(data);
    } catch (error) {
      console.error(error);
      res.json(res.errored);
    }
  };
