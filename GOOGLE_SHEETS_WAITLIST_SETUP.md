# Cookie:Ro 대기명단을 Google Sheets에 연결하기

## 1. 시트 만들기

1. 새 Google Sheets를 만들고 첫 번째 시트 이름을 `waitlist`로 바꿉니다.
2. 첫 행에 `등록 시각`, `이름`, `연락처`, `등록 위치`를 차례로 적습니다.

## 2. Apps Script 붙여 넣기

Google Sheets에서 **확장 프로그램 → Apps Script**를 열고 기존 코드를 지운 뒤 아래 코드를 붙여 넣습니다.

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('waitlist');
    sheet.appendRow([new Date(data.createdAt), data.name, data.contact, data.source]);
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. 웹 앱으로 배포하기

1. Apps Script 오른쪽 위의 **배포 → 새 배포**를 누릅니다.
2. 유형은 **웹 앱**, 실행 사용자는 **나**, 액세스 권한은 **모든 사용자**로 선택합니다.
3. 배포 후 표시되는 `/exec` 주소를 복사합니다.
4. Vercel 프로젝트의 **Settings → Environment Variables**에서 이름을 `GOOGLE_SHEETS_WEBHOOK_URL`, 값을 복사한 주소로 추가합니다.
5. Production에 적용하고 사이트를 다시 배포합니다.

이후 사이트에서 입력한 이름, 이메일 주소·전화번호·카카오톡 ID 중 하나, 등록 위치와 시간이 `waitlist` 시트에 쌓입니다.
