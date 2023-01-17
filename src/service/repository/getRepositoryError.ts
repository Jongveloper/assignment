export class AuthorizationError extends Error {
  constructor() {
    super('내부적인 오류가 발생했습니다. 관리자에게 문의해주세요.');
  }
}

export class ValidationError extends Error {
  constructor() {
    super('검색어를 입력해주세요.');
  }
}

export class ServiceError extends Error {
  constructor() {
    super('서비스가 불가합니다. 잠시 후 다시 이용해주세요.');
  }
}
