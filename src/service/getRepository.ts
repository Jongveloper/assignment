import axios, { AxiosError } from 'axios';

import { RequestRepositoriesProps } from '../types/Repository';

import { UnknownError } from "./commonError";

interface ServerError {
  errors: { status: string, field: string, message: string }[];
}

class AuthorizationError extends Error {
  constructor() {
    super('내부적인 오류가 발생했습니다. 관리자에게 문의해주세요.');
  }
}

class ValidationError extends Error {
  constructor() {
    super('검색어를 입력해주세요.')
  }
}

class ServiceError extends Error {
  constructor() {
    super('서비스가 불가합니다. 잠시 후 다시 이용해주세요.');
  }
}

export const getRepository = async ({ repository, page } : RequestRepositoriesProps) => {
  const baseURL = import.meta.env.VITE_APP_API_URL;
  try {
    const data = await axios.get(`${baseURL}/search/repositories?q=${repository}&sort=starts&order=desc&per_page=10&page=${page}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_TOKEN}`,
      },
    });

    return data;
  } catch (error) {
    const status = (error as AxiosError<ServerError>).response?.status;

    if (status === 401) {
      throw new AuthorizationError();
    }

    if (status === 422) {
      throw new ValidationError();
    }

    if (status === 503) {
      throw new ServiceError();
    }

    throw new UnknownError();
  }
};
