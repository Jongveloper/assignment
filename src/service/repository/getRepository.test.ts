/* eslint-disable prefer-promise-reject-errors */

import axios, { AxiosError } from 'axios';

import { getRepository } from './getRepository';

import { ServerError } from '../type';

jest.mock('axios');

describe('getRepositoryApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  context('요청이 성공하면', () => {
    it('repositories를 return합니다.', async () => {
      mockedAxios.get.mockImplementation(() => Promise.resolve({ data: { items: [] } }));

      const result = await getRepository({ repository: 'test', page: 1 });

      expect(result).toEqual([]);
    });
  });

  context('요청이 실패하면', () => {
    context('status가 401일 때', () => {
      it('에러 메세지는 "내부적인 오류가 발생했습니다. 관리자에게 문의해주세요." 입니다.', async () => {
        mockedAxios.get.mockImplementation(() => Promise.reject({ response: { status: 401 } }));
        try {
          await getRepository({ repository: 'test', page: 1 });
        } catch (error) {
          const data = (error as AxiosError<ServerError>);

          expect(data.message).toBe('내부적인 오류가 발생했습니다. 관리자에게 문의해주세요.');
        }
      });
    });
    context('status가 422일 때', () => {
      it('에러 메세지는 "검색어를 입력해주세요." 입니다.', async () => {
        mockedAxios.get.mockImplementation(() => Promise.reject({ response: { status: 422 } }));
        try {
          await getRepository({ repository: 'test', page: 1 });
        } catch (error) {
          const data = (error as AxiosError<ServerError>);

          expect(data.message).toBe('검색어를 입력해주세요.');
        }
      });
    });

    context('status가 503일 때', () => {
      it('에러 메세지는 "서비스가 불가합니다. 잠시 후 다시 이용해주세요." 입니다.', async () => {
        mockedAxios.get.mockImplementation(() => Promise.reject({ response: { status: 503 } }));
        try {
          await getRepository({ repository: 'test', page: 1 });
        } catch (error) {
          const data = (error as AxiosError<ServerError>);

          expect(data.message).toBe('서비스가 불가합니다. 잠시 후 다시 이용해주세요.');
        }
      });
    });

    context('status가 500일 때', () => {
      it('에러 메세지는 "예기치 못한 오류가 발생했습니다. 잠시 후 다시 이용해주세요." 입니다.', async () => {
        mockedAxios.get.mockImplementation(() => Promise.reject({ response: { status: 500 } }));
        try {
          await getRepository({ repository: 'test', page: 1 });
        } catch (error) {
          const data = (error as AxiosError<ServerError>);

          expect(data.message).toBe('예기치 못한 오류가 발생했습니다. 잠시 후 다시 이용해주세요.');
        }
      });
    });
  });
});
