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



### 😁Postman API 테스트 URL

https://documenter.getpostman.com/view/2200241/S17xqQbJ



### 😄Backend Restful API 리스트

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



### 🧐Backend GraphQL API 리스트

> GraphQL API URL :  http://localhost:4000/graphql

#### Query

| 쿼리 이름                 | 의미                        |
| ------------------------- | --------------------------- |
| posts(offset: 0, limit:5) | 게시글을 가지고 온다는 의미 |

