# Cookie:Ro — Find the Flavor

## v3.2 변경사항

- BASE / CREAM / CUBE / TOPPING마다 2~3개의 핵심 키워드 요약을 추가하고 기존 상세 분석은 그대로 유지했습니다.
- AI 구조화 출력, 로컬 fallback, 친구 공유 데이터, Cookie Jar 저장 데이터에 키워드 필드를 함께 반영했습니다.
- 네 레이어의 대표 키워드를 한 줄로 모은 `A TASTE OF YOUR JOURNEY` 종합 요약을 추가했습니다.
- 결과와 대기등록 사이에 `Crumbs → Crumbook → Flavor → Cookie Jar` 전체 서비스 소개를 추가했습니다.
- 대기등록 문구와 CTA를 `YOUR FIRST COOKIE IS WAITING.` / `내 쿠키 담아두고 먼저 초대받기`로 개편했습니다.
- v3.2.1에서 다섯 Flavor의 네 가지 재료명을 최신 레시피로 교체하고 AI·로컬 fallback에 동일하게 반영했습니다.

여행지와 여행 시기, 사진 1–2장으로 다섯 가지 Cookie:Ro Flavor 중 하나를 발견하고, 친구와 결과를 비교하는 모바일 중심 정적 웹사이트입니다.

## 실행하기

별도 설치가 필요 없습니다. `index.html`을 브라우저에서 열면 됩니다. 사진은 서버로 전송되지 않으며 브라우저 안에서만 Flavor 선택에 사용됩니다.

Vercel에 배포하고 `OPENAI_API_KEY` 환경 변수를 설정하면 `/api/analyze`가 자동 활성화되어 실제 AI 이미지 분석을 사용합니다. API가 준비되지 않았거나 로컬 파일로 열면 브라우저 내 파일럿 분석으로 자동 전환됩니다.

## GitHub Pages에 올리기

1. GitHub에서 새 **Public repository**를 만듭니다.
2. 이 폴더 안의 `index.html`, `styles.css`, `app.js`, `assets` 폴더를 저장소 최상단에 업로드합니다.
3. 저장소의 **Settings → Pages**로 이동합니다.
4. **Source**를 `Deploy from a branch`, **Branch**를 `main`, 폴더를 `/ (root)`로 선택하고 저장합니다.
5. 잠시 기다리면 `https://사용자명.github.io/저장소명/` 주소로 사이트가 공개됩니다.

## 참고

- 결과는 업로드한 사진 파일의 브라우저 내 지문값으로 결정되는 파일럿 로직입니다. 실제 이미지 분석 AI를 연결할 때는 API 키를 `app.js`에 넣지 말고 별도 서버에서 안전하게 관리해야 합니다.
- 결과에는 Flavor별 색상 구성 비율, 월별 계절 이야기, 주요 여행지의 대표 먹거리와 풍경을 활용한 여행 편지가 표시됩니다.
- 색상 비율은 쿠키의 고정 팔레트가 아니라 업로드한 1~2장 사진의 실제 픽셀을 네 개 대표색으로 분석하며, 표시 비율의 합은 100%입니다.
- `destinations.js`에는 55개 주요 여행지의 별칭, 현지 계절 유형, 풍경, 대표 음식, 공감 질문, 여행 방식과 공식 관광 정보 출처가 저장되어 있습니다.
- 결과 jar는 각 Flavor 쿠키가 실제로 유리병 안에 담긴 전용 PNG를 사용합니다.
- 친구 공유 링크는 URL의 `#friend=...` 값을 사용하므로 GitHub Pages에서도 별도 라우팅 설정 없이 작동합니다.
- 공유 링크로 들어온 친구도 여행지·시기·사진 1~2장을 입력하며, Flavor Match 아래에서 AI 코멘트·현지 계절·음식·실제 사진 색상 비율과 jar까지 동일하게 확인합니다.
- 모든 Cookie:Ro 이미지 자산은 `assets` 폴더에 의미 있는 영문 파일명으로 정리되어 있습니다.
- 결과 페이지의 “내 Cookie Jar에 이 쿠키 담아두기”는 연락처와 함께 여행 장소·시기, 선택한 여행 기억 답변, Flavor, BASE/CREAM/CUBE/TOPPING 분석, 최종 설명, 고유 Cookie ID를 `/api/waitlist`와 `GOOGLE_SHEETS_WEBHOOK_URL`을 통해 보존합니다. 사진 원본은 저장하지 않습니다.
- `/api/analytics`는 같은 Apps Script의 `analytics` 시트에 익명 행동 이벤트를 기록합니다. Vercel Pro Custom Events는 필요하지 않습니다. 설정과 지표 수식은 `GOOGLE_SHEETS_WAITLIST_SETUP.md`, 이벤트 정의는 `ANALYTICS_EVENTS.md`를 확인하세요.
- 전환 이벤트와 Vercel 확인 방법은 `ANALYTICS_EVENTS.md`를 참고하세요.
