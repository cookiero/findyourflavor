# Google Sheets 무료 이벤트 트래킹

모든 이벤트는 사이트의 `/api/analytics`를 거쳐 기존 `GOOGLE_SHEETS_WEBHOOK_URL`의 Apps Script로 전송됩니다. Vercel Pro Custom Events는 사용하지 않습니다.

| 이벤트 | 기록 시점 |
|---|---|
| `flavor_started` | 원 사용자가 Flavor 찾기 버튼을 누름(친구 비교 시작은 분모에 포함하지 않음) |
| `flavor_completed` | 원 사용자의 Flavor 결과가 표시됨 |
| `friend_share_clicked` | 친구 공유 버튼을 누름 |
| `friend_landing_viewed` | 유효한 친구 공유 링크가 열림 |
| `friend_flavor_completed` | 공유 링크로 온 친구의 Flavor 비교 결과가 표시됨 |
| `jar_save_completed` | Google Sheets 저장 성공 후 Cookie Jar 완료 화면이 표시됨 |

`analytics` 열은 `timestamp`, `session_id`, `event_name`, `flavor`, `source`, `destination`, `referrer` 순서입니다. `session_id`는 브라우저 탭 세션 단위의 익명 ID입니다. 사진, 이름, 연락처는 분석 이벤트에 포함하지 않습니다.

핵심 지표:

- Flavor 완료율 = `flavor_completed / flavor_started`
- 친구 공유율 = `friend_share_clicked / flavor_completed`
- Cookie Jar 등록률 = `jar_save_completed / flavor_completed`

설정 코드와 Google Sheets 수식은 `GOOGLE_SHEETS_WAITLIST_SETUP.md`를 참고하세요.
