/* Chapter 3 · 성장 문화 */
(function () {
  const ST = window.ST, { h, P, H3, callout, ul, table, figure, card, grid, empty, esc, charts: C } = ST;
  const AX = ['공통 KPI', '실험 속도', '깊은 협업', '권한 위임', '투명한 대화', '점진적 개선', '결정을 위한 데이터'];
  const AXN = ['공통 KPI', '실험 속도\n(Velocity)', '깊은 협업', '권한 위임', '투명한 대화', '점진적 개선', '결정용 데이터'];
  const Q = [
    '팀 간 목표가 하나의 핵심 KPI(또는 서로 맞물린 목표)로 정렬되어 있다.',
    '월/주 단위로 목표 실험 수를 정하고 실제로 시간을 확보한다.',
    '제품·마케팅·(영업)·개발이 스프린트 회의와 스탠드업에 함께 참석한다.',
    '실험을 설계·출시하는 데 여러 단계의 승인이 필요하지 않다.',
    '실패한 실험의 세부 내용까지 두려움 없이 공유한다.',
    '큰 베팅과 함께 매일의 작은 개선·작은 승리도 인정한다.',
    '완벽한 데이터를 기다리지 않고 충분한 데이터로 결정한다.'
  ];
  const FAIL = [
    { t: '가입 폼에서 전화번호 칸을 없애는 실험이 전환율을 거의 바꾸지 못했다.', c1: '고객 이탈 데이터(전화번호 칸에서 80% 이탈)가 근거였다.', c2: '원인을 분석해 “안내 문구를 바꾸는” 다음 가설을 이미 실행 중이다.', a: 1 },
    { t: '“느낌상 좋을 것 같아서” 보낸 이메일 캠페인이 부진했다.', c1: '근거 데이터 없이 직관으로 시작했다.', c2: '“왜 안 됐는지 모르겠다. 다음 계획도 없다.”', a: 0 },
    { t: '인터뷰와 퍼널 데이터에 근거한 실험이 실패했다.', c1: '고객 인터뷰와 퍼널 분석이 근거였다.', c2: '“그냥 실패했다”고 보고하고 원인 분석·다음 단계가 없다.', a: 0 },
    { t: '경쟁사를 따라 한 팝업 실험이 실패했다.', c1: '근거는 “경쟁사가 하니까”뿐이었다.', c2: '실패 원인을 정리하고 다음 실험을 이미 설계했다.', a: 0 }
  ];
  const DEC = [
    { t: '새 CTA 문구 실험의 첫 주 그래프가 한눈에 보일 만큼 크게 올랐다(20 → 35). 통계 검정은 아직 안 했다.', a: 1, why: '변화가 “충분히 크면” 통계를 기다리지 않고 바로 적용해도 됩니다 (Big enough to matter).' },
    { t: '변경 후 지표가 실눈으로 보면 조금 나아 보이지만 변동 범위와 거의 같다.', a: 1, why: '이렇게 구분하기 어렵다면 어느 쪽이든 큰 차이가 없다는 뜻입니다. 더 모으기보다 더 큰 개선을 찾아 넘어가세요.' },
    { t: '회계 시스템과 BI 도구의 매출이 1~2% 어긋나지만 추세는 같다.', a: 1, why: '정확하지 않아도 “신뢰할 수 있는(reliable)” 데이터면 추세로 결정할 수 있습니다.' },
    { t: '핵심 고객군의 이탈 데이터가 아예 없고, 이 정보에 따라 결정이 뒤집힐 수 있다.', a: 0, why: '“더 많은 데이터가 결정을 바꿀 때”에는 데이터를 모으세요. 질문: 마음만 편해지는가, 결정이 바뀌는가?' }
  ];
  ST.CH3 = { AX, FAIL, DEC };

  ST.chapters.push({
    n: 3, key: 'c3', title: '성장 문화 만들기', en: 'Growth Leaders — Create a Growth Culture', pages: 'p.24–45',
    tagline: '“스타트업처럼 일하기”는 구호가 아니라 7가지 습관입니다. 우리 조직의 문화를 진단합니다.',
    chips: ['7가지 습관', '좋은 실패', '완벽한 데이터 함정'],
    goal: '대기업이 느린 이유는 사람이 아니라 시스템·프로세스·문화가 다른 방식에 최적화되어 있어서입니다. 성장 리더가 만들어야 할 7가지 문화 습관을 진단하고, 데이터에 대한 의사결정 감각을 연습합니다.',

    learn() {
      const mis = (rows) => h('div', { class: 'grid g3', style: { margin: 0 } }, rows.map(([t, g]) => h('div', { class: 'metric' }, h('span', {}, t), h('b', { style: { fontSize: '17px' } }, g))));
      const tl = ST.fromSvg(`<svg viewBox="0 0 640 190" role="img" aria-label="월간 릴리스와 주간 릴리스의 학습 속도 비교"><style>.t{font:600 12px 'Noto Sans KR';fill:var(--ink2)}.s{font:700 12px 'IBM Plex Mono';fill:var(--ink)}</style>
        <text class="s" x="10" y="26">월 1회 릴리스</text><line x1="20" y1="60" x2="620" y2="60" style="stroke:var(--line)" stroke-width="2"/>
        ${[0, 1, 2].map((i) => `<circle cx="${60 + i * 150}" cy="60" r="10" style="fill:var(--coral)"/>`).join('')}<path d="M60 60 L210 60 L360 60" style="stroke:var(--coral)" stroke-width="3"/>
        <text class="t" x="360" y="92" text-anchor="middle">점 3개 → 추세 확인까지 약 2개월</text>
        <text class="s" x="10" y="124">주 1회 릴리스</text><line x1="20" y1="158" x2="620" y2="158" style="stroke:var(--line)" stroke-width="2"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<circle cx="${60 + i * 70}" cy="158" r="8" style="fill:var(--green)"/>`).join('')}
        <text class="t" x="130" y="184" text-anchor="middle">추세 확인 2주</text><text class="t" x="480" y="184" text-anchor="middle">같은 8주 동안 학습 사이클 4번</text></svg>`);
      const rel = C.line({ series: [{ name: '실제 KPI', ys: [100, 100, 100, 100, 100], color: 'var(--ink3)', dash: '5 5' }, { name: '리포트상의 KPI (신뢰 가능하지만 부정확)', ys: [101, 99, 98, 102, 100], color: 'var(--green)', dots: true }], ymin: 96, ymax: 104, yTicks: 4, xTickVals: [0, 1, 2, 3, 4], xFmt: (v) => v + 1, label: '정확성과 신뢰성' });
      return [
        P('작고 기민한 회사가 “성장 마인드셋”을 갖기 쉬운 이유는 규모가 아니라 <b>구조</b>입니다. 대기업은 사일로와 하위문화가 생기면서 다른 방식에 최적화됩니다. 성장 리더의 일은 <b>공통 지표에 정렬된 교차기능 협업, 배움에 보상하는 문화, 계획보다 반복</b>을 허용하는 프로세스를 만드는 것입니다.'),
        H3('문화 치트시트 — 되는 것 vs 안 되는 것'),
        table(['습관', '통하는 문화', '막는 문화', '성장 리더의 가이드'], [
          ['① 공통 KPI', '팀을 가로지르는 하나의 목표', '사일로마다 따로 노는 지표', '제품·마케팅(·영업)·개발 리더가 하나의 타깃 KPI에 합의'],
          ['② 실험 속도', '월/주 실험 수 목표', '실험할 여력이 없음', '리더들이 월 실험 횟수에 공동 약속'],
          ['③ 깊은 협업', '스프린트·스탠드업 공동 참석', '“내 영역 지키기”, 벽 넘기기', '스프린트 종료 시 성과 리뷰에 리더가 참석'],
          ['④ 권한 위임', '실행 수준에서 결정', '승인 단계 과다', '실행 팀이 실험을 설계·출시, 다단계 승인 제거'],
          ['⑤ 투명한 대화', '되는 것/안 되는 것 모두 공유', '좋은 결과만 보고', '배움이 있는 “실패”를 칭찬, “몰라서 실패”는 불용'],
          ['⑥ 점진적 개선', '큰 베팅 + 매일의 작은 개선', '큰 베팅 위주', '작은 승리를 축하 — 쌓이면 복리'],
          ['⑦ 결정용 데이터', '결정에 충분한 데이터', '완벽한 데이터 추구', '채택률/유지율을 높이는 결정에 집중']
        ]),
        H3('① 공통 KPI — 숫자가 어긋나는 순간'),
        P('마케팅은 파이프라인, 제품은 포트폴리오 매출, 영업은 신규 MRR을 책임지면 서류상 정렬돼 보여도 한 겹 아래에서 어긋납니다. 신제품 성장이 전략이면 모두의 지표가 <b>신제품의 채택</b>을 향해야 합니다.'),
        figure(h('div', {}, h('h4', { class: 'card-t', style: { fontSize: '14px' } }, '어긋난 목표 (예시)'), mis([['마케팅', '월 $100k 기회 파이프라인'], ['제품관리', '포트폴리오 매출 $200M'], ['영업', '월 신규 MRR $60k']]), h('h4', { class: 'card-t', style: { fontSize: '14px', marginTop: '14px' } }, '정렬된 목표 (예시)'), mis([['마케팅', '신제품 활성 체험 월 200건'], ['제품관리', '신제품 무료→유료 전환 20%'], ['영업', '신제품 월 신규 MRR $30k']])), '그림. 목표를 한 방향으로 — 가장 효과적인 팀은 아예 “같은 숫자”(활성 사용자 수, 유료 고객 수 등)에 정렬했습니다.'),
        callout('tip', '방법', '경영진(위에서 아래로)과 기능 리더(아래에서 위로)가 하나의 초점 지표에 합의하고, 정해진 기간 동안 함께 보고하는 책임 체계를 만드세요. 초점은 영원하지 않아도 됩니다.'),
        H3('② 실험 속도 — 점 3개가 있어야 추세가 보인다'),
        figure(tl, '그림. 추세를 알려면 데이터 점이 3개 필요합니다. 월 1회 릴리스는 2개월, 주 1회 릴리스는 2주가 걸립니다.'),
        P('일반적으로는 활동 기반 목표를 좋아하지 않지만, <b>실험 수 목표는 학습 문화를 강제하는 장치</b>입니다. 단기·장기 실험을 섞어 포트폴리오로 운영하세요.'),
        H3('③④ 협업과 권한 위임'),
        P('제품관리·개발·마케팅·영업을 따로 돌리면 제품 정의 단계에 마케팅 기술이 빠집니다. 정의 단계부터 한 스쿼드로 일하세요. 또 느린 이유는 관료제보다 <b>“승인받아야 하는 결정이 너무 많음”</b>인 경우가 많습니다. 어떤 결정이 승인이 필요한지 <b>경계</b>를 정해 주세요.'),
        table(['경계 예시', '규칙'], [['매출/고객 위험 $100,000 미만', '승인 불필요'], ['브랜드 위험(부정적 보도 가능성)', '추가 승인 필요'], ['개발 기간 3개월 미만', '승인 불필요']]),
        callout('info', '“함께 열쇠를 돌린다”', '다른 사람이 소유한 경험을 바꿀 때는 성장팀이 준비를 끝내고, 소유자에게 승인(또는 최소한 공유)을 요청합니다.'),
        H3('⑤ 투명한 대화 — 좋은 실패의 두 가지 체크'),
        ul(['<b>체크 1.</b> 실패한 실험이 탄탄한 시장 데이터와 논리적 고객 근거에서 출발했는가?', '<b>체크 2.</b> 실패를 발표할 때 원인을 파악했고 논리적인 다음 단계를 실행 중인가?'], ''),
        P('둘 다 “예”면 팀을 지원하고, 하나라도 “아니오”면 책임을 묻습니다. <b>배움도 다음 단계도 없는 실패</b>만 진짜 실패입니다.'),
        H3('⑥⑦ 점진적 개선과 “결정을 위한” 데이터'),
        P('사람이 결정하지 데이터가 결정하지 않습니다. 세 가지 질문을 습관으로 만드세요.'),
        grid(3, card('A. 더 모으면 결정이 바뀌나?', h('p', { class: 'muted', style: { margin: 0 } }, '열에 아홉은 “결정이 아니라 마음이 편해질 뿐”입니다. 그렇다면 지금 결정하세요.')), card('B. 정확성보다 신뢰성', h('p', { class: 'muted', style: { margin: 0 } }, '100을 정확히 맞히지 못해도 99~102 사이로 일관되면 추세 판단에 충분합니다.')), card('C. 충분히 큰 변화인가?', h('p', { class: 'muted', style: { margin: 0 } }, '변화가 너무 작아 통계로도 가리기 힘들면, 어차피 중요하지 않습니다. 더 큰 개선을 찾으세요.'))),
        figure(rel, '그림. 부정확하지만 신뢰할 수 있는 데이터 (교재의 예를 다시 그림)')
      ];
    },

    practice(ctx) {
      const root = h('div');
      ctx.ready(`c3/${ctx.me.id}`, (mine) => {
        const rad = (ST.arr(mine.radar).length === 7 ? ST.arr(mine.radar) : [3, 3, 3, 3, 3, 3, 3]).map(Number);
        /* A */
        const chartBox = h('div');
        const sls = Q.map((q, i) => ST.slider({ label: AX[i], min: 1, max: 5, step: 1, value: rad[i], fmt: (v) => v + '점', onInput: (v) => { rad[i] = v; paint(); } }));
        const paint = () => { ST.clear(chartBox); chartBox.appendChild(C.radar({ axes: AXN, series: [{ name: '우리 조직', vals: rad, color: 'var(--green)' }], max: 5, label: '내 문화 진단' })); };
        paint();
        const aBox = card('A. 우리 조직의 성장 문화 진단', h('p', { class: 'card-sub' }, '문항을 읽고 1(전혀 아니다)~5(매우 그렇다)로 응답하세요.'),
          h('div', { class: 'grid g2' }, h('div', {}, Q.map((q, i) => h('div', { style: { marginBottom: '10px' } }, h('p', { class: 'muted', style: { margin: '0 0 2px' } }, `${i + 1}. ${q}`), sls[i]))), chartBox),
          ST.btn('진단 저장', { kind: 'primary', onclick: () => { ctx.putMine('radar', rad.slice()); ctx.done(); const w = rad.indexOf(Math.min(...rad)); ST.toast(`저장! 가장 먼저 손볼 곳: ${AX[w]}`); } }));
        /* B */
        const fail = Object.assign({}, mine.fail || {});
        const bBox = card('B. 이 실패, 지원할까 책임을 물을까?', h('p', { class: 'card-sub' }, '두 가지 체크(근거 · 배움과 다음 단계)를 보고 판단하세요.'));
        FAIL.forEach((f, i) => {
          const fb = h('div', { class: 'why', hidden: true });
          const show = (v) => { fb.hidden = false; const ok = v === f.a; fb.innerHTML = (ok ? '✅ ' : '❌ ') + `체크 1 ${esc(f.c1)} / 체크 2 ${esc(f.c2)} → ` + (f.a ? '둘 다 충족하므로 <b>지원</b>합니다.' : '충족하지 못한 항목이 있어 <b>책임을 묻고 개선</b>합니다.'); };
          const sg = ST.seg([{ v: 1, l: '🤝 지원한다' }, { v: 0, l: '🔎 책임을 묻는다' }], fail[i] == null ? null : +fail[i], (v) => { fail[i] = v; show(v); ctx.putMine('fail/' + i, v); ctx.done(); });
          if (fail[i] != null) show(+fail[i]);
          bBox.appendChild(h('div', { style: { padding: '10px 0', borderTop: '1px dashed var(--line)' } }, h('p', { style: { margin: '0 0 6px' } }, h('b', {}, `사례 ${i + 1}. `), f.t), h('ul', { class: 'ul muted', style: { margin: '0 0 8px' } }, h('li', {}, '체크 1: ' + f.c1), h('li', {}, '체크 2: ' + f.c2)), sg, fb));
        });
        /* C */
        const dec = Object.assign({}, mine.dec || {});
        const cBox = card('C. 지금 결정할까, 더 모을까?', h('p', { class: 'card-sub' }, '“더 모으면 결정이 바뀌는가?”를 기준으로 판단하세요.'));
        DEC.forEach((d, i) => {
          const fb = h('div', { class: 'why', hidden: true });
          const show = (v) => { fb.hidden = false; fb.innerHTML = (v === d.a ? '✅ ' : '❌ ') + esc(d.why); };
          const sg = ST.seg([{ v: 1, l: '⚡ 지금 결정/넘어간다' }, { v: 0, l: '📥 데이터를 더 모은다' }], dec[i] == null ? null : +dec[i], (v) => { dec[i] = v; show(v); ctx.putMine('dec/' + i, v); ctx.done(); });
          if (dec[i] != null) show(+dec[i]);
          cBox.appendChild(h('div', { style: { padding: '10px 0', borderTop: '1px dashed var(--line)' } }, h('p', { style: { margin: '0 0 8px' } }, h('b', {}, `상황 ${i + 1}. `), d.t), sg, fb));
        });
        ST.clear(root); ST.add(root, [aBox, bBox, cBox]);
      });
      return root;
    },

    together(ctx) {
      const root = h('div');
      ctx.watch('c3', (d) => {
        ST.clear(root);
        const ids = Object.keys(d).filter((u) => u !== 'q');
        const R = ids.filter((u) => d[u] && d[u].radar).map((u) => ({ u, v: ST.arr(d[u].radar).map(Number) }));
        if (R.length) {
          const avg = AX.map((_, i) => ST.mean(R.map((r) => r.v[i] || 0)));
          const mine = R.find((r) => r.u === ctx.me.id);
          const w = avg.indexOf(Math.min(...avg)), s = avg.indexOf(Math.max(...avg));
          root.appendChild(grid(2,
            card('우리 반 평균 vs 나', C.radar({ axes: AXN, series: [{ name: '우리 반 평균', vals: avg, color: 'var(--blue)', dash: '5 4' }].concat(mine ? [{ name: '나', vals: mine.v, color: 'var(--green)' }] : []), max: 5, label: '반 평균 레이더' })),
            card('가장 강한 습관과 가장 약한 습관', h('div', { class: 'metric-row' }, h('div', { class: 'metric' }, h('b', {}, AX[s]), h('span', {}, `최강 · 평균 ${avg[s].toFixed(1)}점`)), h('div', { class: 'metric bad' }, h('b', {}, AX[w]), h('span', {}, `최약 · 평균 ${avg[w].toFixed(1)}점`))),
              C.bars({ items: AX.map((a, i) => ({ label: a, value: avg[i], color: i === w ? 'var(--coral)' : i === s ? 'var(--green)' : 'var(--blue)', hl: i === w })), max: 5, fmt: (v) => v.toFixed(1) }))));
          root.appendChild(card('참가자 × 습관 히트맵', C.heat({ rows: R.map((r) => ST.nameOf(r.u) + (r.u === ctx.me.id ? ' (나)' : '')), cols: ['KPI', '속도', '협업', '위임', '투명', '점진', '데이터'], data: R.map((r) => r.v), max: 5, fmt: (v) => v, color: 'var(--green)' })));
        } else root.appendChild(card('문화 진단', empty()));
        const vote = (key, items) => items.map((it, i) => { const r = ids.map((u) => d[u] && d[u][key] && d[u][key][i]).filter((v) => v != null); const right = r.filter((v) => +v === it.a).length; return { label: `${i + 1}. ` + it.t.slice(0, 20) + '…', value: r.length ? Math.round((right / r.length) * 100) : 0, text: r.length ? `${right}/${r.length}` : '–', color: 'var(--green)' }; });
        root.appendChild(grid(2, card('좋은 실패 판정 — 정답률', C.bars({ items: vote('fail', FAIL), max: 100 })), card('결정 vs 수집 판단 — 정답률', C.bars({ items: vote('dec', DEC), max: 100 }))));
      });
      return root;
    },

    quiz: [
      { q: '교재가 말하는 “좋은 실패”를 가려내는 기준으로 알맞은 것은?', opts: ['결과가 평균 이상이면 좋은 실패', '근거 있는 가설에서 출발했고, 원인 파악과 다음 단계가 있는 실패', '아무도 모르게 수정한 실패', '경쟁사도 실패한 실험'], a: 1, why: '탄탄한 근거 + 학습 + 논리적 다음 단계, 두 체크를 모두 통과하면 지원합니다.' },
      { q: '“추세를 알려면 데이터 점이 3개 필요하다”는 말이 시사하는 것은?', opts: ['릴리스가 잦을수록 학습이 빨라진다', '월 1회가 가장 좋은 주기이다', '데이터 점은 많을수록 정확해진다', '추세는 분석가만 볼 수 있다'], a: 0, why: '주 1회 릴리스는 같은 시간에 월 1회 릴리스보다 학습 사이클이 4배 많습니다.' },
      { q: '“더 많은 데이터를 달라”는 요청에 리더가 던질 질문은?', opts: ['예산은 있는가?', '더 모으면 결정이 바뀌는가, 마음만 편해지는가?', '누가 요청했는가?', '정확도는 몇 %인가?'], a: 1, why: '열에 아홉은 마음의 안정을 위한 요청이라 지금 결정하는 편이 낫습니다. 바뀔 때만 더 모읍니다.' }
    ]
  });
})();
