
`.env` 파일 생성 
`SECRET_KEY="(your_seckey_key)"` 입력

# Custom Package

## dj_rest_auth
> git+https://github.com/Juunsik/dj-rest-auth.git
- pip
    1. 패키지를 처음 설치하는 경우
    `pip install -r requirements.txt`

    2. 패키지가 설치되어 있는 경우
    `pip install --force-reinstall -r requirements.txt`


- poetry
`poetry add $(cat requirements.txt)`