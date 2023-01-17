export class UnknownError extends Error {
  constructor() {
    super('예기치 못한 오류가 발생했습니다. 잠시 후 다시 이용해주세요.');
  }
}
