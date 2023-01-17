import axios, { AxiosError } from 'axios';

import { convertIssue } from '../../utils/convertIssue';

import { IssuesUrlInfo } from '../../redux/repository/type';

import { UnknownError } from '../common/commonError';

import { ServerError } from '../type';

import { NotFound, ValidationError } from './getIssueError';

export const getIssue = async ({ owner, repo, page }: IssuesUrlInfo) => {
  try {
    const data = await axios.get(`${process.env.VITE_APP_API_URL}/repos/${owner}/${repo}/issues?per_page=10&page=${page}`);

    return convertIssue(data.data);
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
