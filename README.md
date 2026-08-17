# Cookie:Ro — Find the Flavor

여행지와 여행 시기, 사진 1–3장으로 다섯 가지 Cookie:Ro Flavor 중 하나를 발견하고, 친구와 결과를 비교하는 모바일 중심 정적 웹사이트입니다.

## 실행하기

별도 설치가 필요 없습니다. `index.html`을 브라우저에서 열면 됩니다. 사진은 서버로 전송되지 않으며 브라우저 안에서만 Flavor 선택에 사용됩니다.

Vercel에 배포하고 `OPENAI_API_KEY` 환경 변수를 설정하면 `/api/analyze`가 자동 활성화되어 실제 AI 이미지 분석을 사용합니다. API가 준비되지 않았거나 로컬 파일로 열면 브라우저 내 파일럿 분석으로 자동 전환됩니다.

## 대기명단을 Supabase에 저장하기

1. Supabase에서 프로젝트를 만든 뒤 **SQL Editor**를 엽니다.
2. 이 폴더의 `supabase-setup.sql` 내용을 실행합니다.
3. Supabase **Project Settings → API**에서 Project URL과 `service_role` 키를 확인합니다.
4. Vercel **Project → Settings → Environment Variables**에 아래 두 값을 추가하고 재배포합니다.

```text
SUPABASE_URL=https://프로젝트ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=service_role 키
```

`SUPABASE_SERVICE_ROLE_KEY`는 비밀키입니다. GitHub 파일이나 `app.js`에 넣지 마세요. 대기명단은 Vercel의 `/api/waitlist`를 거쳐 저장되므로 브라우저에 키가 노출되지 않습니다.

등록 목록은 Supabase의 **Table Editor → waitlist**에서 확인합니다. `created_at`은 등록 시각, `name`은 이름/별명, `contact`는 사용자가 남긴 연락처, `contact_type`은 이메일·전화번호·카카오톡 ID 구분입니다. `source`는 일반 결과 화면(`find_your_flavor`), 친구 공유 링크(`friend_share`), TestFlight 앱(`ios_testflight`) 유입을 뜻합니다. 같은 연락처가 다시 등록되면 가장 최근 이름·유입 경로·Flavor로 갱신됩니다.

이전 이메일 전용 테이블을 이미 만든 프로젝트도 최신 `supabase-setup.sql`을 SQL Editor에서 한 번 더 실행하면 기존 이메일을 보존한 채 새 연락처 구조로 확장됩니다.

## GitHub Pages에 올리기

> AI 분석과 Supabase 대기명단 저장은 서버 API가 필요하므로 실제 운영은 GitHub 저장소를 **Vercel에 연결해 배포**하세요. GitHub Pages에서는 정적 화면과 로컬 분석만 동작합니다.

1. GitHub에서 새 **Public repository**를 만듭니다.
2. 이 폴더 안의 `index.html`, `styles.css`, `app.js`, `assets` 폴더를 저장소 최상단에 업로드합니다.
3. 저장소의 **Settings → Pages**로 이동합니다.
4. **Source**를 `Deploy from a branch`, **Branch**를 `main`, 폴더를 `/ (root)`로 선택하고 저장합니다.
5. 잠시 기다리면 `https://사용자명.github.io/저장소명/` 주소로 사이트가 공개됩니다.

## 참고

- 결과는 업로드한 사진 파일의 브라우저 내 지문값으로 결정되는 파일럿 로직입니다. 실제 이미지 분석 AI를 연결할 때는 API 키를 `app.js`에 넣지 말고 별도 서버에서 안전하게 관리해야 합니다.
- 결과에는 Flavor별 색상 구성 비율, 월별 계절 이야기, 주요 여행지의 대표 먹거리와 풍경을 활용한 여행 편지가 표시됩니다.
- 색상 비율은 쿠키의 고정 팔레트가 아니라 업로드한 1~3장 사진의 실제 픽셀에서 일곱 개 대표색을 추출하며, 표시 비율의 합은 100%입니다.
- `destinations.js`에는 55개 주요 여행지의 별칭, 현지 계절 유형, 풍경, 대표 음식, 공감 질문, 여행 방식과 공식 관광 정보 출처가 저장되어 있습니다.
- 결과 jar는 각 Flavor 쿠키가 실제로 유리병 안에 담긴 전용 PNG를 사용합니다.
- AI 모드에서는 사진에 EXIF 촬영 시각이 있으면 장면의 빛과 함께 오전·낮·해질녘·밤 맥락을 읽습니다. GPS가 있으면 서버에서 장소명으로 변환한 뒤 사진 속 랜드마크 단서와 일치할 때만 구체적인 장소를 언급합니다. 원 GPS 좌표는 대기명단이나 별도 DB에 저장하지 않습니다.
- 팔레트 기반 Flavor 선택 규칙은 서버에서 고정되므로 같은 사진을 다시 분석해도 Flavor와 핵심 색 재료는 유지되고, 자연어 표현만 조금 달라질 수 있습니다.
- 친구 공유 링크는 URL의 `#friend=...` 값을 사용하므로 GitHub Pages에서도 별도 라우팅 설정 없이 작동합니다.
- 공유 링크로 들어온 친구도 여행지·시기·사진 1~3장을 입력하며, Flavor Match 아래에서 여행 코멘트와 실제 사진 색상 비율, jar를 동일하게 확인합니다.
- 모든 Cookie:Ro 이미지 자산은 `assets` 폴더에 의미 있는 영문 파일명으로 정리되어 있습니다.
