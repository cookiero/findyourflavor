# Cookie:Ro — Find the Flavor Pilot

파일럿용 정적 웹 프로토타입입니다.

## 포함 기능
- 온보딩
- 여행 사진 1~2장 업로드
- 브라우저 내 간단한 이미지 색감/밝기 분석
- 5개 Flavor 중 하나 매칭
- 결과 근거 태그 및 만족도 피드백
- My Cookie Jar 저장 연출
- `우리 여행, 같은 맛일까?` 친구 초대 링크
- 친구가 자기 사진으로 Flavor를 찾은 뒤 Match / Different Flavor 비교 화면
- Web Share API 지원 기기에서는 시스템 공유 시트 사용

## 실행
`index.html`을 브라우저에서 열면 됩니다.
실제 공유 테스트는 Vercel / Netlify / GitHub Pages 같은 정적 호스팅을 권장합니다.

## 현재 Flavor 분류 방식
실제 AI Vision API가 아니라 파일럿 데모를 위한 deterministic heuristic입니다.
이미지의 평균 밝기, 채도, 따뜻한 색/푸른색/초록색 비율, 저조도 비율 등을 읽어 5개 Flavor 중 하나를 매칭합니다.

실제 AI 연동 시 `app.js`의 `extractFeatures()`와 `chooseFlavor()`를 API 호출로 교체하면 됩니다.

## 친구 공유 방식
공유 URL에 `f`(초대한 사람 Flavor)와 `from`(이름) 쿼리 파라미터가 붙습니다.
친구가 링크를 열면 초대한 사람의 Flavor를 먼저 본 뒤 자기 사진을 넣고 결과를 비교합니다.

## 다음 개발 우선순위
1. 실제 AI Vision API 연동
2. 사용자/여행 ID 기반 초대 링크
3. Flavor/Jar 결과 서버 저장
4. 개인정보/업로드 보존 정책
5. 분석 이벤트 연결
