# 페이히어 프론트엔드 과제
- [x] 검색창에 Repository명을 입력해서 Repository를 검색할 수 있다.
- [x] 검색된 Public Repository를 등록할 수 있다.
    - [x] 등록 개수는 최대 4개로 제한하며, 최대 개수 초과 등록 시 이를 사용자에게 알려준다.
    - [x] 웹은 LocalStorage, 앱은 Async Storage 등 로컬 저장소를 활용한다. (웹 혹은 앱 선택)
- [x] 등록된 Repository를 삭제할 수 있다.
- [x] 등록된 각각의 Public Repository의 issue를 한 페이지에서 모아서 볼 수 있다.
    - [x] 각 issue 마다 제목, Repository 명은 필수로 표현되어야 한다. 그 이외의 데이터 중 필요하다고 생각되는 부분은 추가한다.
    - [x] 해당 issue를 클릭하면 Github의 상세 페이지로 이동할 수 있다.
    - [x] 페이지네이션을 통해서 계속해서 issue를 모아서 볼 수 있다.

---
**프로젝트에 사용된 노드 버전**
```shell
node version 16.6.1
```
---
##### 실행 방법
GitHub Settings에서 Developer settings를 들어가 토큰을 발급받습니다.
루트에 .env 파일 생성 하고 .env는 다음과 같이 설정합니다.
```
VITE_APP_API_URL=https://api.github.com
VITE_APP_GITHUB_TOKEN={발급받은 토큰}
```
---
**프로젝트 설치**
```shell
npm install
```
---
##### 테스트 환경 구축 방법
axios에서 import.meta를 읽을 수 없어 다음과 같이 설정을 진행했습니다.
**.jest폴더**를 만듭니다.
**.jest폴더** 안에 setEnvVars.js를 만듭니다.

**setEnvVars.js**
```js
process.env.VITE_APP_API_URL='https://api.github.com'
process.env.VITE_APP_GITHUB_TOKEN='{발급받은 토큰}' //문자열로 감싸야합니다.
```
---
**프로젝트 실행**
```shell
npm run dev
```
**테스트 실행**
```shell
npm run test:coverage
```
---
### vite를 선택한 이유
처음 프로젝트를 세팅할 때, CRA를 하지 않은 이유는 CRA는 간단하게 프로젝트를 세팅할 수 있지만 사용하지 않는 기능까지 전부 설치되기 때문에 모듈 사이즈가 크기 때문에 선택하지 않았습니다. 
webpack을 선택하지 않은 이유는 개발 서버를 시작할 때, 모든 모듈을 합치기 때문에 느리다는 단점이 있고 간단한 작업도 플러그인이 필요하고 번들사이즈가 크다는 단점이 있기 때문에 선택하지 않았습니다.
vite는 dependencies 그리고 source code 두 가지 카테고리로 나누어 개발 서버를 시작함으로써 서버 구동 속도가 빠르기에 vite를 선택했습니다.

---
### React.memo로 성능최적화를 하지 않은 이유
성능을 최적화하기 전에는 성능 측정이 필요합니다.
`react-devtools`의 `Profiler`로 memo를 사용했을 때와 사용을 안했을 때의 성능 측정을 진행하였고 차이가 없는 것을 확인한 후 불필요한 메모이제이션은 cpu를 사용하는 비용이 들기 때문에 `React.memo` 컴포넌트를 사용하지 않게 되었습니다. 

---

