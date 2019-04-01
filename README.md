# Board-Backend



### 😀 프로젝트 기술 스택

- RestfulAPI
- Node.js
- Koa
- Typeorm
- MySQL
- Typescript
- Joi
- JWT
- 아주 미세하게 사용된.. Apollo-server-koa, GraphQL



## 🤩 프로젝트 실행 방법

#### 로컬로 실행하는 방법 ( * 저의 로컬 개발 환경 Node 버전은 10.13.5 입니다 )

우선, 데이터베이스를 만들어 주세요, 저는 데이터베이스 이름을 pick_me 로 하겠습니다.

![스크린샷 2019-04-01 오후 9.43.38.png](https://images.velog.io/post-images/jeff0720/d4532480-547b-11e9-ab21-e18f506a09b0/-2019-04-01-9.43.38.png)



그런 다음 프로젝트로 디렉터리에서 .env 파일을 선택해 아래와 같이 자신의 컴퓨터에 깔려있는 MYSQL 환경에 맞춰서 수정해주세요



![스크린샷 2019-04-01 오후 9.45.16.png](https://images.velog.io/post-images/jeff0720/09717860-547c-11e9-a095-d742f66aa765/-2019-04-01-9.45.16.png)



 프로젝트 최상위에서 아래 명령어를 실행 해 주세요

> yarn install && yarn prod



아래와 같이 나오면 성공입니다!

![스크린샷 2019-04-01 오후 9.49.35.png](https://images.velog.io/post-images/jeff0720/9efa1c20-547c-11e9-a095-d742f66aa765/-2019-04-01-9.49.35.png)



### 도커와 나의 RDS로 편하게 실행하기 ( 도커랑 Docker-Compose가 필요..😣 )

~~이 방법은 특별한 사람만 할 수 있다구~😎~~

.env 파일을 나의 RDS로 연결해 줄 수 있게 바꾸고 프로젝트 최상위에서 아래와 같은 명령어를 실행해 주면 끝!

> docker-compose up -d



### 😁 Postman API 테스트 URL

https://documenter.getpostman.com/view/2200241/S17xqQbJ



### 😄 Backend Restful API 리스트

| 메소드 | 주소                                     | 의미                        | 인증 필요 |
| ------ | ---------------------------------------- | --------------------------- | :-------: |
| POST   | /api/auth/signin                         | 로그인 API                  |     X     |
| POST   | /api/auth/signup                         | 회원가입 API                |     X     |
| GET    | /api/posts?offset=0&limit=10             | 게시글 목록 조회 API        |     X     |
| GET    | /api/posts/{postId}                      | 게시글 상세보기 API         |     X     |
| POST   | /api/posts                               | 게시글 작성 API             |     O     |
| PUT    | /api/posts/{postId}                      | 게시글 수정 API             |     O     |
| DELETE | /api/posts/{postId}                      | 게시글 삭제 API             |     O     |
| GET    | /api/posts/{postId}/comments             | 게시글 댓글 조회 API        |     X     |
| POST   | /api/posts/{postId}/comments             | 게시글 댓글 작성 API        |     O     |
| PUT    | /api/posts/{postId}/comments/{commentId} | 게시글 댓글 수정 API        |     O     |
| DELETE | /api/posts/{postId}/comments/{commentId} | 게시글 댓글 삭제 API        |     O     |
| GET    | /api/users/{userId}                      | 사용자 프로필 조회 API      |     X     |
| GET    | /api/users/{userId}/posts                | 사용자 게시글 목록 조회 API |     X     |
| GET    | /api/users/{userId}/comments             | 사용자 댓글 목록 조회 API   |     X     |



### 🧐 Backend GraphQL API 리스트

> GraphQL API URL :  http://localhost:4000/graphql

#### Query

| 쿼리 이름                 | 의미                  |
| ------------------------- | --------------------- |
| posts(offset: 0, limit:5) | 게시글 목록 조회 쿼리 |