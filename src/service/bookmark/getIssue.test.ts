/* eslint-disable prefer-promise-reject-errors */

import axios, { AxiosError } from 'axios';
import { getIssue } from './getIssue';
import { ServerError } from '../type';

jest.mock('axios');

describe('getIssueApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  context('요청이 성공하면', () => {
    it('issue를 return합니다.', async () => {
      mockedAxios.get.mockImplementation(() => Promise.resolve({ data: [] }));

      const result = await getIssue({ owner: 'tester', repo: 'test', page: 1 });

      expect(result).toEqual([]);
    });
  });

  context('요청이 실패하면', () => {
    context('status가 404일 때', () => {
      it('에러 메세지는 "잘못된 경로입니다." 입니다.', async () => {
        mockedAxios.get.mockImplementation(() => Promise.reject({ response: { status: 404 } }));
        try {
          await getIssue({ owner: 'tester', repo: 'test', page: 1 });
        } catch (error) {
          const data = (error as AxiosError<ServerError>);

          expect(data.message).toBe('잘못된 경로입니다.');
        }
      });
    });
    context('status가 422일 때', () => {
      it('에러 메세지는 "유저명 혹은 레포지토리가 잘못되었습니다." 입니다.', async () => {
        mockedAxios.get.mockImplementation(() => Promise.reject({ response: { status: 422 } }));
        try {
          await getIssue({ owner: 'tester', repo: 'test', page: 1 });
        } catch (error) {
          const data = (error as AxiosError<ServerError>);

          expect(data.message).toBe('유저명 혹은 레포지토리가 잘못되었습니다.');
        }
      });
    });

    context('status가 500일 때', () => {
      it('에러 메세지는 "예기치 못한 오류가 발생했습니다. 잠시 후 다시 이용해주세요." 입니다.', async () => {
        mockedAxios.get.mockImplementation(() => Promise.reject({ response: { status: 500 } }));
        try {
          await getIssue({ owner: 'tester', repo: 'test', page: 1 });
        } catch (error) {
          const data = (error as AxiosError<ServerError>);

          expect(data.message).toBe('예기치 못한 오류가 발생했습니다. 잠시 후 다시 이용해주세요.');
        }
      });
    });
  });
});
