# Cookie:Ro 실제 AI 버전 전환 안내

현재 파일은 GitHub Pages에서도 작동하는 정적 파일럿입니다. 실제 사진 이해와 여행지별 맞춤 글을 생성하려면 프론트엔드와 비밀 API 키를 보관하는 서버 기능을 함께 배포해야 합니다.

## 권장 흐름

1. 사용자가 여행지·여행 시기와 사진 1~2장을 선택합니다.
2. 브라우저가 EXIF에서 촬영일, GPS, 카메라 정보를 읽습니다. EXIF가 없으면 사용자가 적은 정보를 기준으로 진행합니다.
3. 브라우저가 사진 픽셀을 직접 분석해 대표색과 비율을 계산합니다. 이 값은 AI에게 추측시키지 않습니다.
4. 사진은 서버의 `/api/analyze`로 전송합니다.
5. 서버만 `OPENAI_API_KEY`를 사용해 OpenAI Responses API에 이미지와 여행 정보를 전달합니다.
6. AI는 Flavor, 사진 분위기, 행복하게 느껴진 근거, 여행 방식, 계절 경험, 현지 음식 질문을 정해진 JSON 형태로 반환합니다.
7. 화면은 JSON과 로컬 색상 분석 결과를 조합해 결과를 보여줍니다.

## AI가 반환할 데이터

```text
flavor
confidence
detected_scene
detected_location_guess
location_confidence
photo_mood
warm_observation
why_this_flavor
travel_style
season_note
local_food_question
closing_message
```

GPS가 없는 사진에서 AI가 알아낸 장소는 반드시 `추정 위치`로 표시해야 합니다. 얼굴의 감정이나 관계 역시 단정하지 않고 “편안해 보여요”, “즐거운 분위기가 느껴져요”처럼 관찰 수준으로 표현합니다.

## 배포 구조

- 프론트엔드: 현재 Cookie:Ro 화면
- 서버 기능: Vercel Functions 또는 Cloudflare Workers
- AI: OpenAI Responses API의 이미지 입력과 구조화된 출력
- 도메인: 구매한 도메인을 배포 서비스에 연결
- 환경 변수: 배포 서비스 설정에 `OPENAI_API_KEY` 등록

API 키는 `app.js`나 HTML에 넣으면 안 됩니다. 방문자가 볼 수 없는 서버 환경 변수로만 저장합니다.

## 실제 공개 순서

1. OpenAI API 프로젝트와 API 키를 준비합니다.
2. 사이트를 Vercel 또는 Cloudflare에 배포합니다.
3. 서버의 `/api/analyze`를 구현하고 환경 변수에 API 키를 넣습니다.
4. 구입한 도메인의 DNS를 배포 서비스가 안내하는 값으로 연결합니다.
5. 휴대폰 사진, EXIF가 없는 카카오톡 사진, GPS가 있는 원본 사진을 각각 테스트합니다.
6. 사진 보관 여부와 삭제 정책을 개인정보 안내에 명시합니다. 가능하면 분석 후 즉시 폐기합니다.

## 구현에 필요한 정보

- 구입한 도메인 주소
- 도메인을 구입한 업체
- Vercel과 Cloudflare 중 사용할 서비스
- OpenAI API 키 준비 여부

이 정보가 정해지면 현재 화면을 유지한 채 실제 AI 분석 서버를 연결할 수 있습니다.
