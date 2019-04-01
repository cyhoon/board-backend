## Board-Backend



#### Backend Restful API 리스트

| 메소드 | 주소                                            | 의미                        | 인증 필요 |
| ------ | ----------------------------------------------- | --------------------------- | :-------: |
| POST   | /api/auth/signin                                | 로그인 API                  |     X     |
| POST   | /api/auth/signup                                | 회원가입 API                |     X     |
| GET    | /api/posts?offset=0&limit=10                    | 게시글 목록 조회 API        |     X     |
| GET    | /api/posts/{postId}                             | 게시글 상세보기 API         |     X     |
| POST   | /api/posts                                      | 게시글 작성 API             |     O     |
| PUT    | /api/posts/{postId}                             | 게시글 수정 API             |     O     |
| DELETE | /api/posts/{postId}                             | 게시글 삭제 API             |     O     |
| GET    | /api/posts/{postId}comments                     | 게시글 댓글 조회 API        |     X     |
| POST   | /api/posts/{postId}/comments                    | 게시글 댓글 작성 API        |     O     |
| PUT    | /api/posts/{postId}/comments/{commentId}        | 게시글 댓글 수정 API        |     O     |
| DELETE | /api/posts/{postId}/comments/{commentId}        | 게시글 댓글 삭제 API        |     O     |
| GET    | /api/users/{userId}                             | 사용자 프로필 조회 API      |     X     |
| GET    | /api/users/{userId}/posts?offset=0&limit=110    | 사용자 게시글 목록 조회 API |     X     |
| GET    | /api/users/{userId}/comments?offset=0&limit=110 | 사용자 댓글 목록 조회 API   |     X     |