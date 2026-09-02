# Cookie:Ro Find Your Flavor v4.1

- 사진 1–3장 업로드 유지
- Base → Cream → Cube → Topping 순차 질문
- 사용자가 제공한 Base, Cream, Cubes, Toppings 실제 자산 20개 적용
- 선택한 네 가지 실제 재료를 브라우저에서 직접 합성
- 자유서술은 `/api/classify-layers`에서 AI가 각 레이어 재료 중 하나로 분류
- AI 사진 분석과 AI 장면 해석은 제거하고 사진 업로드 및 로컬 색상 추출만 유지
- 완성된 레이어 쿠키를 결과 화면과 Cookie Jar 안에 동일하게 표시
- 별도 설문 사이트의 return URL 지원

Vercel 환경 변수 `OPENAI_API_KEY`는 자유서술 분류에만 필요합니다. 키가 없거나 분류가 실패하면 선택한 객관식 레이어로 계속됩니다. 사진 파일은 AI API나 서버로 전송하지 않습니다.
