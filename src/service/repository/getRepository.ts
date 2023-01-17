import axios, { AxiosError } from 'axios';

import { convertRepositories } from '../../utils/convertRepositories';

import { ServerError } from '../type';
import { RequestRepositoriesProps } from '../../types/Repository';

import { UnknownError } from '../common/commonError';
import {
  AuthorizationError,
  ServiceError,
  ValidationError,
} from './getRepositoryError';

export const getRepository = async (
  { repository, page } : RequestRepositoriesProps,
) => {
  const baseURL = import.meta.env.VITE_APP_API_URL;
  try {
    const data = await axios.get(`${baseURL}/search/repositories?q=${repository}&sort=starts&order=desc&per_page=10&page=${page}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_TOKEN}`,
      },
    });

    return convertRepositories(data.data.items);
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
