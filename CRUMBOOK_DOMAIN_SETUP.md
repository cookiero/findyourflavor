# crumbook.com 연결 순서

## 1. Vercel에 사이트 올리기

1. Vercel 계정을 만들고 현재 사이트 폴더를 새 프로젝트로 가져옵니다.
2. 프로젝트의 **Settings → Environment Variables**에서 `OPENAI_API_KEY`를 추가합니다.
3. Production으로 다시 배포합니다.
4. 먼저 Vercel이 제공하는 `*.vercel.app` 주소에서 사진 분석이 작동하는지 확인합니다.

## 2. Vercel에 도메인 등록하기

1. Vercel 프로젝트의 **Settings → Domains**를 엽니다.
2. `crumbook.com`을 추가합니다.
3. `www.crumbook.com`도 추가하고 둘 중 하나를 대표 주소로 정합니다.
4. 화면에 표시되는 DNS 값을 그대로 기록합니다. 프로젝트별 안내값이 우선입니다.

## 3. 후이즈 DNS에 입력하기

1. 후이즈에 로그인합니다.
2. `crumbook.com`의 도메인 관리에서 네임서버/DNS 관리 화면을 엽니다.
3. Vercel이 안내한 apex 도메인용 **A 레코드**를 호스트 `@`에 입력합니다.
4. Vercel이 안내한 **CNAME 레코드**를 호스트 `www`에 입력합니다.
5. 기존 이메일을 사용 중이면 MX 레코드는 삭제하거나 바꾸지 않습니다.
6. 저장 후 Vercel의 Domains 화면에서 **Refresh/Verify**를 누릅니다.

Vercel의 일반적인 값은 apex A 레코드 `76.76.21.21`, `www` CNAME `cname.vercel-dns-0.com`이지만, 반드시 Vercel 프로젝트 화면에 표시된 값을 우선 사용합니다.

## 4. 공개 전 확인

- `https://crumbook.com`과 `https://www.crumbook.com` 중 하나가 다른 하나로 자동 이동하는지
- HTTPS 자물쇠가 표시되는지
- 휴대폰 원본 사진에서 EXIF 촬영일과 GPS가 읽히는지
- 카카오톡으로 받은 EXIF 없는 사진도 사용자 입력 여행지를 기준으로 작동하는지
- AI 오류 시 로컬 분석으로 안전하게 전환되는지
- 사진 개인정보 안내가 실제 처리 방식과 일치하는지

DNS 반영에는 몇 분에서 길게는 48시간이 걸릴 수 있습니다.
