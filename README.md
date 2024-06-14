# 📖Novel Stella
스파르타 내일배움캠프 AI 6기에서 진행한 최종 팀 프로젝트입니다. AI를 이용한 **'AI 소설 생성 커뮤니티'** 웹 페이지를 구현하였습니다.

# 📝프로젝트 소개
사용자들이 간단하게 즐길 수 있고 창작의 재미를 느낄 수 있는 **AI 기반 콘텐츠 생성 서비스**를 제공하는 것입니다. 기존의 프롬프트 작성을 통한 AI 생성 프로그램에서 좀 더 나아가 AI가 자동으로 제안하는 3가지 추천 내용 중에서 선택하거나 수정하여 최종 소설을 생성할 수 있도록 하였습니다. 또한, 텍스트 생성 및 AI 그림 생성 등 다양한 콘텐츠 형식을 지원하여 사용자가 창작의 재미를 느낄 수 있도록 합니다.


# 🗓️개발 기간
- 24.05.13. ~ 24.06.12.

<br/>

# 🧑‍💻팀 멤버 구성 

<br/>

👩‍💻 **프론트엔드**

- 김동환 [@1489ehdghks] (https://github.com/1489ehdghks)
- 이환희 [@tia4613] (https://github.com/tia4613)

<br/>

👨‍💻 **백엔드**

- 허준혁 [@Juunsik] (https://github.com/Juunsik)
- 이혜민 [@hy2min] (https://github.com/hy2min)

<br/>
<br/>

# 🏗️ 서비스 아키텍처
![image](https://github.com/1489ehdghks/NOST/assets/159985538/6155f958-9fb4-444a-8e89-75671c4bd7f8)


# ⚙️사용 환경 설정
  - [FRONTEND](https://github.com/1489ehdghks/NOST/wiki/%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95(Frontend))

1. 가상환경 실행
2. node_modeules 설치
   `npm install`
3. `npm start` 서버 실행



  - [BACKEND](https://github.com/1489ehdghks/NOST/wiki/%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95(Backend))

1. 가상환경 실행
2. pip 설치
   1. 패키지를 처음 설치하는 경우 `pip install -r requirements.txt`
   2. 패키지가 설치되어 있는 경우 `pip install --force-reinstall -r requirements.txt`
3. .env 세팅
4. `python manage.py makemigrations` 실행
5. `python manage.py migrate` 실행
6. `python manage.py runserver` 서버 실행


<br/>

# 🖥️개발 환경
<details>
<summary>프론트엔드</summary>
<div>

- React: 프론트엔드 프레임워크 <br/>
- Zustand: 상태 관리 라이브러리 <br/>
- Cloudflare: CDN 및 보안 서비스

</div>
</details>

<details>
<summary>백엔드</summary>
<div>

- Django: 백엔드 프레임워크 <br/>
- Gunicorn: WSGI HTTP 서버 <br/>
- PostgreSQL: 데이터베이스 관리 시스템 <br/>
- Nginx: HTTP 및 리버스 프록시 서버

</div>
</details>

<details>
<summary>클라우드 인프라</summary>
<div>

- Amazon EC2: 서버 호스팅 <br/>
- Amazon S3: 스토리지 서비스 <br/>
- Amazon Route53: DNS 및 도메인 이름 관리 서비스 <br/>

</div>
</details>

<details>
<summary>추가 서비스</summary>
<div>

- GitHub: 소스 코드 관리 및 협업 도구 <br/>
- LangChain: 자연어 처리 라이브러리 <br/>
- DeepL: 번역 서비스 <br/>
- ChatGPT: 챗봇 서비스 <br/>
- DALL-E: 이미지 생성 AI 

</div>
</details>



# 🛠️ ERD
![image](https://github.com/1489ehdghks/NOST/assets/159985538/1793ecf8-4415-4591-81f6-91d568752063)

<br/>

# ✅주요 기능
- **홈 페이지**  [📎Wiki - 상세보기](https://github.com/1489ehdghks/NOST/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Login))
- **책 목록**  [📎Wiki - 상세보기](https://github.com/1489ehdghks/NOST/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Book))
- **프로필 페이지**  [📎Wiki - 상세보기](https://github.com/1489ehdghks/NOST/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Profile))
- **소설 생성**  [📎Wiki - 상세보기](https://github.com/1489ehdghks/NOST/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C-(New-Novel))
- **사이드바**

<br/>




<details>
<summary><h2>🌟 git commit 규칙</h2></summary>
<div markdown="1">

- feat : 새로운 기능에 대한 커밋
- fix : 버그 수정에 대한
- build : build 관련 파일 수정에 대한 커밋
- chore : 그 외 수정에 대한 커밋
- ci : CI 관련 설정 수정에 대한 커밋
- docs : 문서 수정에 대한 커밋
- style : 코드 스타일 혹은 포맷 등에 대한 커밋
- refactor : 코드 리팩도링에 대한 커밋
- test : 테스트 코드 수정에 대한 커밋
- design : CSS 등 사용자 UI 디자인 변경
- rename : 파일 명 혹은 폴더명 수정 작업
- remove : 파일의 삭제 작업을 수행하는 경우
- setting: 초기 세팅 작업을 수행하는 경우
- assets: assets(image, font...) 관련 작업을 수행하는 경우

</div>
</details>
