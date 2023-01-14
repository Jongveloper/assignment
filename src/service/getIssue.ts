import axios, { AxiosError } from 'axios';

import { IssuesUrlInfo } from '../redux/repository/index';

import { UnknownError } from "./commonError";

import { ServerError } from "./type";

class NotFound extends Error {
  constructor() {
    super('잘못된 경로입니다.')
  }
}

class ValidationError extends Error {
  constructor() {
    super('유저명 혹은 레포지토리가 잘못되었습니다.')
  }
}

export const getIssue = async ({ owner, repo }: IssuesUrlInfo) => {
  const baseURL = import.meta.env.VITE_APP_API_URL;
  try {
    const data = await axios.get(`${baseURL}/repos/${owner}/${repo}/issues`);

    return data;
  } catch (error) {
    const status = (error as AxiosError<ServerError>).response?.status;

    if (status === 404) {
      throw new NotFound();
    }

    if (status === 422) {
      throw new ValidationError();
    }

    throw new UnknownError();
  }
};
