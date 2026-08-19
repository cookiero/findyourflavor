# Cookie:Ro 전환 이벤트 안내

## Vercel에서 먼저 할 일

1. Vercel Dashboard에서 이 프로젝트를 선택합니다.
2. **Analytics → Web Analytics → Enable**을 누릅니다.
3. 새 버전을 배포한 뒤 실제 사이트에서 Flavor 찾기, 친구 공유, Cookie Jar 저장을 각각 한 번 테스트합니다.
4. **Analytics → Events**에서 아래 이벤트 이름을 확인합니다.

Vercel Web Analytics의 Custom Events는 Pro 또는 Enterprise 플랜에서 제공됩니다. Hobby 플랜에서는 기본 방문·페이지뷰는 볼 수 있지만 아래 커스텀 이벤트 집계는 표시되지 않습니다.

## 이벤트 정의

| 이벤트 | 기록 시점 | 주요 속성 |
| --- | --- | --- |
| `flavor_started` | 필수 정보와 사진을 준비한 사용자가 Flavor 찾기 버튼을 누른 시점 | `flow`, `photo_count` |
| `flavor_completed` | 분석과 베이킹 애니메이션이 끝나 결과 또는 비교 결과가 표시된 시점 | `flow`, `flavor` |
| `friend_share_clicked` | 결과 페이지의 “같이 여행한 친구에게 보내기” 버튼을 누른 시점 | `flavor`, `method` |
| `friend_share_link_created` | 친구용 분석 데이터가 포함된 공유 URL 생성에 성공한 시점 | `flavor`, `method` |
| `jar_save_completed` | Google Sheets webhook 저장이 성공한 뒤 Cookie Jar 완료 화면이 표시된 시점 | `flow`, `flavor` |

`flow`는 최초 사용자에게 `original`, 공유 링크로 들어온 친구에게 `shared_friend`가 기록됩니다. Jar 저장에서는 기존 Sheets 분류와 맞추기 위해 `my-result` 또는 `friend-result`를 사용합니다. `method`는 `native_share` 또는 `clipboard`입니다. 이메일·전화번호·이름·사진·공유 URL은 Analytics에 보내지 않습니다.

## 확인할 비율

- Flavor 완료율 = `flavor_completed` ÷ `flavor_started` × 100
- 친구 공유 클릭률 = `friend_share_clicked` ÷ `flavor_completed` × 100
- 공유 링크 생성률 = `friend_share_link_created` ÷ `flavor_completed` × 100
- Cookie Jar 저장률 = `jar_save_completed` ÷ `flavor_completed` × 100

Vercel의 Events 패널에서 동일한 기간과 Production 환경을 선택한 뒤 각 이벤트 총합을 위 식에 넣습니다. 최초 사용자 퍼널만 보고 싶다면 `flow = original` 속성으로 구분합니다. 이벤트 횟수 기반 지표이므로 같은 사용자가 여러 번 실행하면 각각 포함됩니다.

## 테스트 팁

로컬 실행에서는 Vercel 이벤트가 전송되지 않는 것이 정상입니다. 배포 후 브라우저 개발자 도구의 Network에서 `/_vercel/insights/` 요청을 확인하고, 광고 차단 확장 프로그램을 끈 상태에서도 한 번 테스트하세요. Google Sheets 저장 성공 후에만 `jar_save_completed`가 기록되므로 이 이벤트는 실제 webhook 연결 상태도 함께 검증합니다.
