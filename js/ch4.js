/* Chapter 4 · 선결 조건 (PMF · 도구 · 지표) */
(function () {
  const ST = window.ST, { h, P, H3, callout, ul, table, figure, card, grid, empty, esc, charts: C } = ST;
  const AARRR = [
    { k: 'acq', en: 'A', t: '획득', d: '사용자가 우리를 찾는다', ex: '방문자 수, 체험 신청 수' },
    { k: 'act', en: 'A', t: '활성화', d: '처음으로 제품을 쓴다', ex: '첫 로그인율, 설정 완료율' },
    { k: 'ret', en: 'R', t: '유지', d: '계속 쓴다', ex: '주간 활성 사용자, 월 유지율' },
    { k: 'rev', en: 'R', t: '매출', d: '돈을 낸다', ex: '무료→유료 전환율, MRR' },
    { k: 'ref', en: 'R', t: '추천', d: '다른 사람에게 알린다', ex: '추천 가입 수, NPS' }
  ];
  const ELLIS = [{ v: 0, l: '매우 실망할 것이다', c: 'var(--green)' }, { v: 1, l: '다소 실망할 것이다', c: 'var(--amber)' }, { v: 2, l: '실망하지 않을 것이다', c: 'var(--coral)' }, { v: 3, l: '해당 없음(이미 안 씀)', c: 'var(--ink3)' }];
  const erf = (x) => { const s = Math.sign(x); x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); return s * (1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)); };
  const cdf = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
  function abTest(nA, cA, nB, cB) {
    const pA = cA / nA, pB = cB / nB, pp = (cA + cB) / (nA + nB), se = Math.sqrt(pp * (1 - pp) * (1 / nA + 1 / nB));
    const z = se ? (pB - pA) / se : 0, p = 2 * (1 - cdf(Math.abs(z)));
    const lift = pA ? pB / pA - 1 : 0;
    let verdict = '무의미(작은 차이)', cls = 'r';
    if (p < 0.05) { verdict = lift > 0 ? '변형안이 유의하게 우수' : '변형안이 유의하게 열세'; cls = lift > 0 ? 'g' : 'r'; }
    else if (Math.abs(lift) >= 0.2) { verdict = '큰 변화 — 표본을 더 확인'; cls = 'a'; }
    return { pA, pB, z, p, lift, verdict, cls };
  }
  ST.CH4 = { AARRR, ELLIS, abTest };

  ST.chapters.push({
    n: 4, key: 'c4', title: '선결 조건: PMF와 성장 도구', en: 'Prerequisites — Product/Market Fit, Tools & Metrics', pages: 'p.46–62',
    tagline: '성장팀을 꾸리기 전에 확인할 것 — PMF 40% 기준, 해적 지표 5개, 그리고 성장 스택.',
    chips: ['Sean Ellis 40%', 'AARRR 해적 지표', 'A/B 테스트'],
    goal: '구멍 난 양동이에는 물을 부을 수 없습니다. 제품-시장 적합성을 가볍게 검증하고, 사용자를 이해·최적화·측정하는 최소 도구와 3~5개의 핵심 지표를 정합니다.',

    learn() {
      const happy = h('div', { class: 'flow blue' }, ['방문', '가입 조회', '계정 생성', '설정', '사용', '유료'].map((s, i, a) => h('div', { class: 'st' }, s, i < a.length - 1 ? h('small', {}, '↓ 이탈') : null)));
      const pirate = h('div', { class: 'pirate' }, AARRR.map((a) => h('div', {}, h('b', {}, a.en), h('small', {}, h('strong', {}, a.t)), h('small', {}, a.d))));
      const stack = h('div', { class: 'stackdiag' },
        h('div', { class: 'lv out', style: { '--n': 4 } }, ['BI(결과 평가)', 'A/B 테스트', '이메일·넛지', 'CRM …'].map((t) => h('div', {}, t))),
        h('div', { class: 'lv mid', style: { '--n': 1 } }, h('div', {}, '코호트 분석 · 사용자 세분화'), ),
        h('div', { class: 'lv mid', style: { '--n': 1 } }, h('div', {}, 'AI 모델 · 데이터 사이언스 (선택)')),
        h('div', { class: 'lv data', style: { '--n': 1 } }, h('div', {}, '데이터 — 사용자 · 캠페인 · 웹 · 제품 · 사용 이력')));
      return [
        H3('1. 제품-시장 적합성(PMF)이 먼저다'),
        P('Marc Andreessen은 PMF를 “좋은 시장 + 그 시장을 만족시키는 제품”으로만 정의하지 않고, <b>느껴지는 신호</b>로 설명합니다.'),
        table(['신호', 'PMF가 없을 때', 'PMF가 있을 때'], [['고객', '가치를 못 느낀다', '만드는 속도만큼 팔린다'], ['입소문·사용량', '퍼지지 않고 더디다', '서버를 늘리는 속도로 사용량이 는다'], ['영업', '주기가 길고 계약이 안 닫힌다', '영업·지원 인력을 구하기 바쁘다'], ['언론·시장', '반응이 시큰둥하다', '기자가 먼저 연락한다']]),
        H3('가벼운 검증 두 가지'),
        ul(['<b>고객 대화</b> — 이긴/진 이유를 영업·고객성공 팀과 신규 고객, 놓친 고객에게서 듣습니다. 몇 번만 해도 방향이 보입니다.', '<b>벤치마킹</b> — 체험 전환율·유료 전환율·유지율을 업계 평균과 비교해 같은 대역인지 봅니다.']),
        H3('Sean Ellis PMF 설문 — 질문은 단 하나'),
        callout('key', '“이 제품을 더 이상 쓸 수 없다면 어떤 기분일까요?”', '① 매우 실망 ② 다소 실망 ③ 실망하지 않음 ④ 해당 없음(이미 안 씀)<br><b>“매우 실망”이 40% 이상</b>이면 성장 잠재력이 높은 제품으로 봅니다(약 100개 스타트업 벤치마크). 대상은 가입만 한 사람이 아니라 <b>실제 사용 경험이 있는 사람</b>입니다(Uber라면 실제 탑승/운행한 사람).'),
        H3('2. 성장 도구 — 이해, 최적화, 측정'),
        grid(3, card('정성(Qualitative)', h('p', { class: 'muted', style: { margin: 0 } }, '고객 인터뷰, 세션 녹화(FullStory 등), 사용자 테스트. 숫자가 말하지 못하는 “왜”를 듣습니다.')), card('정량(Quantitative)', h('p', { class: 'muted', style: { margin: 0 } }, '가장 중요한 건 <b>코호트 분석</b>과 퍼널 분석. 사용자를 가입 시점·캠페인·기능 사용 여부 등으로 쪼개 실험 효과를 봅니다.')), card('전환 최적화', h('p', { class: 'muted', style: { margin: 0 } }, '<b>A/B 테스트</b>와 <b>넛지(인앱 메시지·이메일)</b>. 예산이 없다면 기준선을 재고 바꾼 뒤 비교하는 “가난한 자의 A/B”도 가능합니다.'))),
        callout('info', '사례', '새 데모를 넣은 변형안이 체험 가입을 50% 높였고, 이후 단계인 활성화는 100%까지 좋아졌습니다. 테스트 도구를 분석 도구와 연결했기에 가능한 발견이었습니다.'),
        H3('행복 경로와 부정 경로'),
        figure(happy, '그림. 행복 경로에는 꼭 필요한 안내(팝업·가이드 투어·채팅)만, 이탈한 지점에는 이메일로 되돌려 보내는 “바운스백/윈백”을 설계합니다.'),
        P('교재의 경험으로는 <b>부정 경로 이메일</b>(가입했지만 설정하지 않은 사용자에게 설정 링크·문서·짧은 영상을 보내기)이 이탈을 줄이는 가장 효과적인 수단이었습니다.'),
        H3('3. 사업의 건강 — 지표는 3~5개'),
        P('가장 흔한 실수는 지표와 대시보드가 너무 많은 것입니다. 응급실이 맥박·체온·혈압·산소포화도·호흡수·통증 같은 <b>바이탈 사인</b>으로 환자를 분류하듯, 선행·후행 지표 3~5개로 건강을 진단하세요. Dave McClure의 <b>해적 지표(AARRR)</b>가 출발점입니다.'),
        figure(pirate, '그림. 해적 지표 — 단계마다 지표 하나씩 골라 시작합니다.'),
        P('월 누적(Month-over-Month cumulative) 그래프로 그리면 이번 달이 지난달보다 나은지 한눈에 알 수 있습니다.'),
        H3('4. 그로스 스택 — 개념도'),
        figure(stack, '그림. 데이터 → 세분화 → 사용자에게 다가가는 도구 → 결과 평가의 흐름. 기술 아키텍처가 아니라 개념도입니다.')
      ];
    },

    practice(ctx) {
      const root = h('div');
      ctx.ready(`c4/${ctx.me.id}`, (mine) => {
        /* A. 라이브 설문 */
        const pollOut = h('div');
        const cur = mine.poll != null ? +mine.poll : null;
        const sg = ST.seg(ELLIS.map((o) => ({ v: o.v, l: o.l })), cur, (v) => { ctx.putMine('poll', v); ctx.done(); ST.toast('응답했어요 ✔'); }, 'v');
        const aBox = card('A. 현장 PMF 설문 — 이 프로그램에 대해', h('p', { class: 'card-sub' }, '“이 프로그램(그로스 컴파운드)을 더 이상 쓸 수 없다면 어떤 기분일까요?” 지금 참여자 모두의 답으로 PMF 점수가 실시간으로 계산됩니다.'), sg, h('p', { class: 'muted' }, '결과는 “함께 보기” 탭의 게이지에서 확인합니다.'));
        /* B. 내 제품 계산 */
        const prod = ST.text({ placeholder: '제품/서비스 이름', value: (mine.pmf && mine.pmf.prod) || '', maxlength: 24 });
        const ns = ['very', 'some', 'not'].map((k, i) => h('input', { type: 'number', min: 0, value: mine.pmf ? mine.pmf[k] : '', placeholder: '명' }));
        const calc = h('div');
        const paintCalc = () => {
          const v = ns.map((n) => Math.max(0, +n.value || 0)), tot = v.reduce((a, b) => a + b, 0);
          ST.clear(calc);
          if (!tot) return calc.appendChild(h('p', { class: 'muted' }, '응답 수를 입력하면 점수가 계산돼요. (해당 없음은 제외하세요)'));
          const p = v[0] / tot;
          calc.appendChild(C.gauge({ value: p, threshold: 0.4, caption: `“매우 실망” ${v[0]}/${tot}명`, label: '내 제품 PMF' }));
          calc.appendChild(h('p', { class: 'p', style: { textAlign: 'center' } }, p >= 0.4 ? '🎯 40% 기준을 넘었어요. 성장 잠재력이 있는 신호입니다.' : '⚠️ 40% 미만이에요. 확장 전에 가치 제안·타깃을 점검해야 합니다.'));
        };
        ns.forEach((n) => n.addEventListener('input', paintCalc)); paintCalc();
        const bBox = card('B. 내 제품의 PMF 점수 계산기', h('p', { class: 'card-sub' }, '실제(또는 가정한) 설문 응답을 넣어 보세요. 실제 사용 경험이 있는 사람만 세는 것이 원칙입니다.'),
          h('div', { class: 'row' }, ST.field('제품/서비스', prod), ST.field('매우 실망', ns[0]), ST.field('다소 실망', ns[1]), ST.field('실망하지 않음', ns[2])), calc,
          ST.btn('결과 저장', { kind: 'primary', onclick: () => { const v = ns.map((n) => Math.max(0, +n.value || 0)); if (!prod.value.trim() || !v.reduce((a, b) => a + b, 0)) return ST.toast('이름과 응답 수를 넣어 주세요'); ctx.putMine('pmf', { prod: prod.value.trim(), very: v[0], some: v[1], not: v[2] }); ctx.done(); ST.toast('저장했어요 ✔'); } }));
        /* C. AARRR */
        const am = Object.assign({}, mine.aarrr || {});
        const cBox = card('C. 우리 사업의 바이탈 사인 5개', h('p', { class: 'card-sub' }, '단계마다 지표 하나만 고르세요. 선행(앞서 움직이는) 지표인지 후행(결과) 지표인지도 표시합니다.'));
        const inputs = AARRR.map((a) => {
          const cur = am[a.k] || {};
          const t = ST.text({ placeholder: '예) ' + a.ex.split(',')[0], value: cur.m || '', maxlength: 36 });
          const ty = ST.select([{ v: 'lead', l: '선행' }, { v: 'lag', l: '후행' }], cur.type || 'lead');
          cBox.appendChild(h('div', { class: 'row', style: { padding: '8px 0', borderTop: '1px dashed var(--line)' } }, h('div', { style: { flex: '0 0 120px' } }, h('b', {}, a.t), h('div', { class: 'muted', style: { fontSize: '12.5px' } }, a.d)), h('div', { style: { flex: '1 1 220px' } }, t), h('div', { style: { flex: '0 0 90px' } }, ty)));
          return { k: a.k, t, ty };
        });
        cBox.appendChild(h('div', { style: { marginTop: '12px' } }, ST.btn('지표 저장', { kind: 'primary', onclick: () => { const o = {}; inputs.forEach((i) => { if (i.t.value.trim()) o[i.k] = { m: i.t.value.trim(), type: i.ty.value }; }); if (Object.keys(o).length < 3) return ST.toast('최소 3개 단계는 채워 주세요'); ctx.putMine('aarrr', o); ctx.done(); ST.toast('저장했어요 ✔'); } })));
        /* D. A/B */
        const ab = Object.assign({ name: '가입 버튼 문구', nA: 2000, cA: 500, nB: 2000, cB: 600 }, mine.ab || {});
        const f = (k, ph) => h('input', { type: 'number', min: 0, value: ab[k], placeholder: ph });
        const fi = { nA: f('nA'), cA: f('cA'), nB: f('nB'), cB: f('cB') }, nm = ST.text({ value: ab.name, maxlength: 30 });
        const res = h('div');
        const paintAb = () => {
          const v = {}; for (const k in fi) v[k] = Math.max(0, +fi[k].value || 0);
          ST.clear(res);
          if (!v.nA || !v.nB) return;
          const r = abTest(v.nA, v.cA, v.nB, v.cB);
          res.appendChild(h('div', { class: 'metric-row' }, h('div', { class: 'metric' }, h('b', {}, ST.pct(r.pA, 1)), h('span', {}, '기존안(Control)')), h('div', { class: 'metric' }, h('b', {}, ST.pct(r.pB, 1)), h('span', {}, '변형안(Variation)')), h('div', { class: 'metric' + (r.lift < 0 ? ' bad' : '') }, h('b', {}, (r.lift >= 0 ? '+' : '') + (r.lift * 100).toFixed(1) + '%'), h('span', {}, '상대 개선율')), h('div', { class: 'metric' }, h('b', {}, r.p < 0.001 ? '<0.001' : r.p.toFixed(3)), h('span', {}, 'p값(양측 z검정)'))));
          res.appendChild(h('p', { class: 'p' }, h('span', { class: 'tag ' + r.cls }, '판정'), ' ', r.verdict + '. ' + (r.cls === 'r' && r.p >= 0.05 ? '구분하기 어렵다면 어느 쪽이든 큰 차이가 없다는 뜻이니, 더 큰 개선 아이디어로 넘어가세요.' : r.cls === 'a' ? '변화는 크지만 표본이 적어요. 흐름을 보며 판단하세요.' : '')));
          res.appendChild(C.vbars({ items: [{ label: '기존안', value: +(r.pA * 100).toFixed(1), text: (r.pA * 100).toFixed(1) + '%', color: 'var(--ink3)' }, { label: '변형안', value: +(r.pB * 100).toFixed(1), text: (r.pB * 100).toFixed(1) + '%', color: r.cls === 'g' ? 'var(--green)' : 'var(--blue)' }], h: 230, label: 'A/B 전환율 비교' }));
        };
        Object.values(fi).forEach((i) => i.addEventListener('input', paintAb)); paintAb();
        const dBox = card('D. A/B 테스트 실험실', h('p', { class: 'card-sub' }, '교재의 예(25% → 30%)와 같은 크기의 차이도 표본이 적으면 우연일 수 있어요. 방문자 수와 전환 수를 바꿔 보며 판정이 어떻게 달라지는지 확인하세요.'),
          h('div', { class: 'row' }, ST.field('실험 이름', nm)), h('div', { class: 'row' }, ST.field('기존안 방문자', fi.nA), ST.field('기존안 전환', fi.cA), ST.field('변형안 방문자', fi.nB), ST.field('변형안 전환', fi.cB)), res,
          ST.btn('결과 공유', { kind: 'primary', onclick: () => { const v = {}; for (const k in fi) v[k] = Math.max(0, +fi[k].value || 0); if (!v.nA || !v.nB) return; const r = abTest(v.nA, v.cA, v.nB, v.cB); ctx.putMine('ab', Object.assign({ name: nm.value.trim() || '실험', lift: r.lift, p: r.p, verdict: r.verdict, cls: r.cls }, v)); ctx.done(); ST.toast('공유했어요 ✔'); } }));
        ST.clear(root); ST.add(root, [aBox, bBox, cBox, dBox]);
      });
      return root;
    },

    together(ctx) {
      const root = h('div');
      ctx.watch('c4', (d) => {
        ST.clear(root);
        const ids = Object.keys(d).filter((u) => u !== 'q');
        const polls = ids.map((u) => d[u] && d[u].poll).filter((v) => v != null).map(Number);
        const valid = polls.filter((v) => v !== 3), very = polls.filter((v) => v === 0).length;
        root.appendChild(grid(2,
          card('현장 PMF 설문 — “그로스 컴파운드”', valid.length ? C.gauge({ value: very / valid.length, threshold: 0.4, caption: `“매우 실망” ${very}/${valid.length}명`, label: '프로그램 PMF' }) : empty(),
            valid.length ? C.stack({ items: [{ label: '응답 분포', parts: ELLIS.slice(0, 3).map((o) => ({ v: polls.filter((p) => p === o.v).length, color: o.c, name: o.l })) }], legend: ELLIS.slice(0, 3).map((o) => ({ name: o.l, color: o.c })) }) : null),
          card('제품별 PMF 점수 (40% 기준선)', (() => {
            const L = ids.filter((u) => d[u] && d[u].pmf).map((u) => { const p = d[u].pmf, t = (+p.very || 0) + (+p.some || 0) + (+p.not || 0); return { label: p.prod + ' · ' + ST.nameOf(u), value: t ? (p.very / t) * 100 : 0 }; }).sort((a, b) => b.value - a.value);
            return L.length ? [C.bars({ items: L.map((x) => ({ label: x.label, value: x.value, color: x.value >= 40 ? 'var(--green)' : 'var(--coral)' })), max: 100, fmt: (v) => v.toFixed(0) + '%' }), h('p', { class: 'muted', style: { marginTop: '8px' } }, '초록 = 40% 이상, 주황 = 40% 미만')] : empty();
          })())));
        /* AARRR 월 */
        const cols = h('div', { class: 'grid g3' });
        AARRR.forEach((a) => {
          const items = ids.filter((u) => d[u] && d[u].aarrr && d[u].aarrr[a.k]).map((u) => ({ u, ...d[u].aarrr[a.k] }));
          cols.appendChild(card(`${a.t}`, items.length ? h('div', { class: 'pill-row' }, items.map((i) => h('span', { class: 'tag ' + (i.type === 'lead' ? 'g' : 'a'), title: ST.nameOf(i.u) }, i.m))) : h('p', { class: 'muted' }, '–')));
        });
        root.appendChild(h('h3', { class: 'h3' }, '모두의 바이탈 사인 (초록=선행, 노랑=후행)'));
        root.appendChild(cols);
        /* A/B 표 */
        const abs = ids.filter((u) => d[u] && d[u].ab).map((u) => ({ u, ...d[u].ab }));
        root.appendChild(card('A/B 테스트 모음', abs.length ? [C.bars({ items: abs.map((a) => ({ label: a.name + ' · ' + ST.nameOf(a.u), value: Math.abs(a.lift * 100), text: (a.lift >= 0 ? '+' : '') + (a.lift * 100).toFixed(1) + '%', color: a.cls === 'g' ? 'var(--green)' : a.cls === 'a' ? 'var(--amber)' : 'var(--ink3)' })), fmt: (v) => v.toFixed(1) + '%' }), h('p', { class: 'muted', style: { marginTop: '8px' } }, '초록 = 유의하게 우수 · 노랑 = 변화는 크나 표본 부족 · 회색 = 구분 어려움')] : empty()));
      });
      return root;
    },

    quiz: [
      { q: 'Sean Ellis PMF 설문에서 “성장 잠재력이 높다”고 보는 기준은?', opts: ['“매우 실망” 응답이 40% 이상', '“다소 실망” 응답이 90% 이상', '가입자 수가 1만 명 이상', '“해당 없음” 응답이 많을 때'], a: 0, why: '약 100개 스타트업을 벤치마킹한 결과, 성장하는 회사는 대체로 “매우 실망”이 40%를 넘었습니다.' },
      { q: '해적 지표(AARRR)에 포함되지 않는 단계는?', opts: ['획득(Acquisition)', '유지(Retention)', '추천(Referral)', '입찰(Auction)'], a: 3, why: '획득·활성화·유지·매출·추천 — 단계마다 지표 하나씩 고르는 것이 출발점입니다.' },
      { q: '이탈을 줄이는 데 교재가 가장 효과적이라고 본 방법은?', opts: ['행복 경로에 팝업을 최대한 많이 띄운다', '가입했으나 설정하지 않은 사용자에게 되돌아오게 하는 이메일(부정 경로)', '대시보드를 더 많이 만든다', '가격을 올린다'], a: 1, why: '바운스백/윈백 이메일로 사용자를 이탈 지점으로 되돌리는 것이 전환율 개선에 가장 효과적이었다고 합니다.' }
    ]
  });
})();
