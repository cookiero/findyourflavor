# Cookie:Ro Find Your Flavor v4

- 사진 1–3장 업로드 유지
- Base → Cream → Cube → Topping 순차 질문
- 각 레이어당 객관식 4개와 자유서술 입력
- 자유서술은 `/api/classify-layers`에서 AI가 네 선택지 중 하나로 분류
- 사진 색상과 레이어 응답을 함께 반영해 Flavor 결정
- 별도 설문 사이트의 return URL 지원

Vercel 환경 변수 `OPENAI_API_KEY`가 필요합니다. 키가 없거나 분류가 실패하면 객관식과 사진 분석만으로 계속됩니다.
