# 터틀 북스

### 1. 서비스 소개

- 온라인 도서 쇼핑몰

### 2. 서비스 주요 기능 설명

<**메인 페이지**>

- 전체 상품 조회
- 베스트/스테디 셀러
- 신작 소개
- 카테고리 분류

<**User 기능**>

- 회원가입 및 로그인 : JWT 토큰을 이용한 인증 처리
- MyPage : 회원 정보 조회/수정 및 탈퇴, 구매 내역 확인
- 상품 목록 조회
- 로그아웃

<**Product 기능**>

- 상품 상세 조회(user)
- 상품 수정 및 삭제(admin)

<**Cart 기능**>

- 로컬에서 구현한 장바구니

<**Order 기능**>

- 주문 추가 및 조회
- 주문 삭제

### 3. 서비스 구성도

- 기술 스택 :
  <FE>
- HTML/CSS/Bulma
- JavaScript

<BE>
- Node.js
- Express
- MongoDB
- Mongoose

### 4. 프로젝트 팀원 역할 분담

| FE     |                          |
| ------ | ------------------------ |
| 권희경 | 장바구니 기능 구현       |
| 조수하 | 상품 기능, 로그인 구현     |
| 양영조 | 주문 기능, 회원가입 구현   |
| BE     |                          |
| 이규해 | 사용자 기능 구현         |
| 고지연 | 상품, 카테고리 기능 구현 |
| 김종현 | 주문 기능 구현           |

- 고지연: 백엔드 담당

  - 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
  - 개발 단계: 팀원간의 일정 등 조율 + 백엔드 (상품, 카테고리 기능) 개발
  - 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

- 권희경: 프론트엔드 담당

  - 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
  - 개발 단계: 팀원간의 일정 등 조율 + 프론트 (장바구니 기능) 개발
  - 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

- 김종현: 백엔드 담당

  - 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 와이어프레임 작성
  - 개발 단계: 와이어프레임을 기반으로 API 완성
  - 수정 단계: 피드백 반영해서 백엔드 설계 수정

- 양영조: 프론트엔드 담당

  - 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
  - 개발 단계: 팀원간의 일정 등 조율 + 프론트 (주문, 헤더 버튼, 회원가입, 로그아웃) 개발
  - 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

- 이규해: 팀장/백엔드 담당

  - 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
  - 개발 단계: 팀원간의 일정 등 조율 + 백엔드 (사용자 기능) 개발
  - 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

- 조수하: 프론트엔드 담당
  - 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
  - 개발 단계: 팀원간의 일정 등 조율 + 프론트 (상품 기능) 개발
  - 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

### 5. 실행 방법

```
npm install
npm start
```

### 6. 버전

- 1.0.0

### 7. FAQ
