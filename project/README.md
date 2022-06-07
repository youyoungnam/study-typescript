## 코로나 세계 현황판 만들기


## 자바스크립트 프로젝트에 타입스크립트 적용 
0. 
1. 타입스크립트의 기본환경 구성
    - [x]  npm 초기화
    - [x] 타입스크립트 라이브러리 설치
    - [x] 타입스크립트 설정 파일 생성 및 기본 값 추가
    - [x] 자바스크립트의 파일을 타입스크립트 파일로 변환하기 
    - [x] 'tsc'명령어로 타입스크립트 변환 


2. 명시적인 'any' 선언하기
 - 'tsconfig.json' 파일에 'noImpicityAny' 값을 'true' 추가하기
 - 가능한한 구체적인 타입 구체화 작업 진행 기본적으로 any타입으로 시작 

3. 프로젝트 환경 구성 
  - babel, eslint, prettier등의 환경 설정

4. 외부 라이브러리 모듈화 
 - 특정 오픈소스 라이브러리에서 선언되지않은 타입 선언파일들을 별도에 @types --> definitely typed에 선언되어있다.
 - @type제공되지 않으면 typeroots라는 옵션을 사용해서 @types경로를 정의하기
 - 프로젝트별도로 특정 폴더를 만들고 해당 폴더 안에 라이브러리 이름으로 폴더 만들고 그안에 index.d.ts파일을 만들고 그안에  declare module 'chart.js'; 이런식으로 넣어주면된다.
 

최종 프로젝트 폴더입니다

## 참고 자료

- [존스 홉킨스 코로나 현황](https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6)
- [Postman API](https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#27454960-ea1c-4b91-a0b6-0468bb4e6712)
- [Type Vue without Typescript](https://blog.usejournal.com/type-vue-without-typescript-b2b49210f0b)