export class NotFound extends Error {
  constructor() {
    super('잘못된 경로입니다.');
  }
}

export class ValidationError extends Error {
  constructor() {
    super('유저명 혹은 레포지토리가 잘못되었습니다.');
  }
}
