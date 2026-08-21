# Cookie:Ro Find Your Flavor v3.2

## v3.2.2

- 서비스 소개 카드 오른쪽 위 별 장식 제거
- Crumbs → Crumbook → Flavor → Cookie Jar 화살표를 각 단계 사이의 정중앙에 배치

## v3.2.1

- 다섯 Flavor의 BASE / CREAM / CUBE / TOPPING 재료명을 최신 브랜드 레시피로 교체
- 화면, 로컬 fallback 상세 분석, AI 고정 레시피가 같은 재료명을 사용하도록 동기화

- BASE, CREAM, CUBE, TOPPING에 2~3개 핵심 키워드 요약 레이어 추가
- OpenAI 구조화 출력 스키마 및 프롬프트에 레이어별 키워드 생성 규칙 추가
- API 미사용 시에도 작동하는 Flavor별 로컬 키워드 fallback 추가
- 네 레이어 대표 키워드를 모은 `A TASTE OF YOUR JOURNEY` 요약 추가
- 공유 링크와 Cookie Jar 저장 데이터에 키워드 포함
- `THIS IS JUST A TASTE.` 전체 서비스 소개와 Crumbs → Crumbook → Flavor → Cookie Jar 흐름 추가
- `YOUR FIRST COOKIE IS WAITING.` 대기등록 카피 및 CTA 개편

기존 상세 분석, 사진 팔레트, 여행 편지, 친구 공유/비교, Cookie Jar 저장 및 Google Sheets 연결은 유지됩니다.
