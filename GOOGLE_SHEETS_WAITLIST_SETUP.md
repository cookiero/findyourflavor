# Cookie:Ro Google Sheets 연결 안내

이 버전은 하나의 Apps Script 웹 앱으로 `waitlist`와 `analytics` 시트를 함께 관리합니다. Vercel Pro Custom Events는 사용하지 않습니다. 사용자가 올린 사진 원본은 저장하지 않습니다.

## 1. 시트 준비

1. 기존 Google Sheets 파일을 엽니다.
2. 기존 `waitlist` 시트는 그대로 둡니다.
3. 같은 파일에 `analytics`라는 이름의 새 시트를 추가합니다.
4. 첫 행은 아래 스크립트가 자동으로 만듭니다.

## 2. Apps Script 교체

Google Sheets에서 **확장 프로그램 → Apps Script**를 열고 기존 코드를 아래 코드로 전부 교체합니다.

```javascript
const WAITLIST_HEADERS = [
  '등록 시각', '이름', '연락처', '등록 위치', 'Cookie ID',
  '여행 장소', '여행 시기', 'Flavor ID', 'Flavor 이름',
  'BASE 분석', 'CREAM 분석', 'CUBE 분석', 'TOPPING 분석', '최종 여행 설명',
  '사진 저장 여부', '데이터 버전'
];

const ANALYTICS_HEADERS = [
  'timestamp', 'session_id', 'event_name', 'flavor',
  'source', 'destination', 'referrer'
];

function ensureHeaders(sheet, headers) {
  const current = sheet.getLastColumn()
    ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    : [];
  headers.forEach((header, index) => {
    if (current[index] !== header) sheet.getRange(1, index + 1).setValue(header);
  });
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (data.type === 'analytics') {
      const sheet = book.getSheetByName('analytics');
      if (!sheet) throw new Error('analytics 시트를 찾을 수 없습니다.');
      ensureHeaders(sheet, ANALYTICS_HEADERS);
      sheet.appendRow([
        new Date(data.timestamp), data.session_id, data.event_name, data.flavor,
        data.source, data.destination, data.referrer
      ]);
      return jsonResponse({ ok: true });
    }

    const sheet = book.getSheetByName('waitlist');
    if (!sheet) throw new Error('waitlist 시트를 찾을 수 없습니다.');
    ensureHeaders(sheet, WAITLIST_HEADERS);
    if (sheet.getLastRow() > 1) {
      const ids = sheet.getRange(2, 5, sheet.getLastRow() - 1, 1).getDisplayValues().flat();
      if (ids.includes(String(data.cookieId))) return jsonResponse({ ok: true, duplicate: true });
    }
    sheet.appendRow([
      new Date(data.createdAt), data.name, data.contact, data.source, data.cookieId,
      data.destination, data.travelDate, data.flavorId, data.flavorName,
      data.baseAnalysis, data.creamAnalysis, data.cubeAnalysis,
      data.toppingAnalysis, data.finalBake, false, data.storageVersion
    ]);
  } finally {
    lock.releaseLock();
  }
  return jsonResponse({ ok: true });
}
```

## 3. 웹 앱 새 버전 배포

1. **배포 → 배포 관리**를 엽니다.
2. 기존 웹 앱의 연필 아이콘을 누르고 **새 버전**을 선택합니다.
3. 실행 사용자는 **나**, 액세스 권한은 **모든 사용자**로 배포합니다.
4. `/exec` 주소가 같으면 Vercel 환경변수는 변경할 필요가 없습니다.
5. 처음 연결한다면 Vercel의 `GOOGLE_SHEETS_WEBHOOK_URL`에 `/exec` 주소를 넣고 다시 배포합니다.

## 4. 동작 확인

배포 사이트에서 `Flavor 시작 → 결과 완료 → 친구 공유 → 공유 링크 방문 → 친구 Flavor 완료 → Cookie Jar 저장`을 한 번 수행합니다. `analytics` 시트에는 7개 열이, `waitlist` 시트에는 16개 열이 채워져야 합니다.

사진 파일·사진 주소·이름·연락처는 `analytics`에 기록되지 않습니다. 이름과 연락처는 Cookie Jar 저장 시에만 `waitlist`에 기록됩니다.

## 5. 핵심 지표 계산

Google Sheets의 빈 셀에 아래 수식을 넣습니다. 아래 수식은 `analytics!C:C`가 `event_name` 열일 때 기준입니다.

- Flavor 완료율: `=IFERROR(COUNTIF(analytics!C:C,"flavor_completed")/COUNTIF(analytics!C:C,"flavor_started"),0)`
- 친구 공유율: `=IFERROR(COUNTIF(analytics!C:C,"friend_share_clicked")/COUNTIF(analytics!C:C,"flavor_completed"),0)`
- Cookie Jar 등록률: `=IFERROR(COUNTIF(analytics!C:C,"jar_save_completed")/COUNTIF(analytics!C:C,"flavor_completed"),0)`

셀 서식을 **백분율**로 설정하세요. 친구 유입 흐름은 `friend_landing_viewed`와 `friend_flavor_completed`로 별도 확인할 수 있습니다.
