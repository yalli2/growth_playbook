/* Chapter 9 · 마무리 — 나의 그로스 플레이북 */
(function () {
  const ST = window.ST, { h, P, H3, callout, ul, table, figure, card, grid, empty, esc, charts: C } = ST;
  const PILLARS = ['제품-시장 적합성', '교차기능 팀·공통 KPI', '지표·도구', '실험 프로세스', '성장 문화'];
  const NEXT = [
    '고객 인터뷰 5건과 Sean Ellis 설문으로 PMF부터 확인하세요 (4장).',
    '제품·마케팅·(영업)·개발 리더를 한 스쿼드로 묶고 하나의 타깃 KPI에 합의하세요 (2·3장).',
    '해적 지표(AARRR)에서 지표를 단계별 하나씩 3~5개로 줄이고 코호트·A/B 도구를 점검하세요 (4장).',
    'Sprint 0로 퍼널을 그리고 백로그를 만들어 첫 스프린트에 실험 2개를 올리세요 (5·7장).',
    '월 실험 수 목표와 의사결정 경계를 정하고, 좋은 실패를 칭찬하는 의식을 시작하세요 (3장).'
  ];
  const PH = [{ t: 'Sprint 0 · 0~30일', d: '팀 구성, 타깃 KPI 정렬, 퍼널·백로그' }, { t: '첫 실험 · 31~60일', d: '실험 2개 이상 출시, 첫 플레이백' }, { t: '정착 · 61~90일', d: '성장 회의 정례화, 배움 아카이브' }];
  ST.CH9 = { PILLARS, NEXT, PH };

  ST.chapters.push({
    n: 9, key: 'c9', title: '나의 그로스 플레이북', en: 'Conclusion — Build Your Own Playbook', pages: 'p.128',
    tagline: '8개 챕터를 한 장으로. 내 준비도를 진단하고, 90일 로드맵과 이번 주의 첫 실험을 약속합니다.',
    chips: ['준비도 레이더', '90일 로드맵', '플레이북 한 장'],
    goal: '화려한 한 방의 전술보다 단순한 개선의 누적이 성장을 만듭니다. 올바른 도구, 가벼운 프로세스, 그리고 강한 성장 문화 — 이 세 가지로 나의 플레이북을 완성합니다.',

    learn() {
      return [
        P('책의 결론은 단순합니다. 지수적 성장을 일으키는 기발한 전술을 기대하기 쉽지만, 실제로는 <b>성장을 가속하는 단순한 개선</b>이 많이 있습니다. 성장 리더의 열쇠는 팀에게 <b>알맞은 도구와 가벼운 프로세스</b>를 주고, 무엇보다 <b>강한 성장 문화</b>를 만드는 것입니다.'),
        H3('한 장으로 보는 플레이북'),
        table(['챕터', '한 줄 원칙', '내일 해 볼 일'], [
          ['1 성장팀의 일', '성장팀은 KPI를 움직이는 팀이지 리포팅 팀이 아니다', '성장팀 업무와 리포팅 업무를 분리해 목록으로 만들기'],
          ['2 시스템 전체', '한 구간이 아니라 전체 여정 — 개선은 곱해진다', '고객 여정 7단계에 책임 기능을 적어 “주인 없음” 찾기'],
          ['3 성장 문화', '공통 KPI · 실험 속도 · 협업 · 위임 · 투명 · 점진 · 결정용 데이터', '문화 진단 레이더에서 가장 낮은 항목 하나 정하기'],
          ['4 선결 조건', 'PMF 40% · 해적 지표 3~5개 · 정성+정량+전환 도구', 'Ellis 설문 1회, 지표 5개 확정'],
          ['5 그로스 프로세스', 'Sprint 0: 지표→여정→퍼널→백로그→우선순위', '퍼널 히스토그램 그리고 가장 큰 이탈 구간 찾기'],
          ['6 그로스 잼', '프레이밍 + 조용한 발산 + 투표 + 반대 의견 + 사람 이름', '90분 잼 일정을 잡고 프레임 작성하기'],
          ['7 애자일', '스프린트에 실험 카드, Running 열, 배움 기록', '칸반에 Running 열 추가'],
          ['8 도구', '북극성>목표>아이디어, ICE, 성장 회의', '아이디어 10개에 ICE 점수 매기기']
        ]),
        callout('key', '성장 리더의 마음가짐', '1) 완벽한 데이터를 기다리지 말고 <b>결정</b>하세요. 2) <b>작은 승리</b>를 축하하세요. 3) 실패를 숨기지 않게 만드세요. 4) “우리”라고 말하세요.'),
        H3('더 읽을 거리 (교재의 인용문헌)'),
        ul(['Marc Andreessen, “Part 4: The Only Thing That Matters” — PMF', 'Sean Ellis, “Using Product/Market Fit to Drive Sustainable Growth” — PMF 설문', 'Dave McClure, “Product Marketing for Pirates: AARRR!” — 해적 지표']),
        callout('tip', '다음', '“실습하기”에서 준비도 진단, 90일 로드맵, 이번 주 첫 실험 서약을 작성하고 “내 플레이북 한 장”을 만들어 보세요.')
      ];
    },

    practice(ctx) {
      const root = h('div'); const me = ctx.me.id;
      ctx.ready(`c9/${me}`, (mine) => {
        const rd = (ST.arr(mine.ready).length === 5 ? ST.arr(mine.ready) : [3, 3, 3, 3, 3]).map(Number);
        const chart = h('div'), tip = h('div');
        const paint = () => { ST.clear(chart); chart.appendChild(C.radar({ axes: PILLARS.map((p) => p.replace(/·/, '·\n').replace(/ /, '\n')), series: [{ name: '내 준비도', vals: rd, color: 'var(--green)' }], max: 5, label: '준비도 레이더' })); ST.clear(tip); const w = rd.indexOf(Math.min(...rd)); tip.appendChild(callout('warn', `가장 먼저 손볼 곳: ${PILLARS[w]}`, esc(NEXT[w]))); };
        const sls = PILLARS.map((p, i) => ST.slider({ label: p, min: 1, max: 5, value: rd[i], fmt: (v) => v + '점', onInput: (v) => { rd[i] = v; paint(); } })); paint();
        const aBox = card('A. 우리 팀의 그로스 준비도', h('p', { class: 'card-sub' }, '1(아직 없음) ~ 5(탄탄함)으로 솔직하게. 가장 낮은 항목이 곧 첫 번째 할 일입니다.'), h('div', { class: 'grid g2' }, h('div', {}, sls, tip), chart), ST.btn('진단 저장', { kind: 'primary', onclick: () => { ctx.putMine('ready', rd.slice()); ctx.done(); ST.toast('저장했어요 ✔'); } }));

        const plan = PH.map((_, i) => Object.assign({ a: '', who: '' }, ST.arr(mine.plan)[i] || {}));
        const bBox = card('B. 90일 로드맵', h('p', { class: 'card-sub' }, '각 단계에서 가장 중요한 한 가지와 책임질 사람 이름을 적으세요.'));
        const pin = PH.map((p, i) => { const a = ST.text({ placeholder: p.d, value: plan[i].a, maxlength: 70 }), w = ST.text({ placeholder: '책임자 이름', value: plan[i].who, maxlength: 12 }); bBox.appendChild(h('div', { class: 'row', style: { padding: '8px 0', borderTop: '1px dashed var(--line)' } }, h('div', { style: { flex: '0 0 170px' } }, h('b', {}, p.t)), h('div', { style: { flex: '1 1 260px' } }, a), h('div', { style: { flex: '0 0 130px' } }, w))); return { a, w }; });
        bBox.appendChild(h('div', { style: { marginTop: '10px' } }, ST.btn('로드맵 저장', { kind: 'primary', onclick: () => { ctx.putMine('plan', pin.map((x) => ({ a: x.a.value.trim(), who: x.w.value.trim() }))); ctx.done(); ST.toast('저장했어요 ✔'); } })));

        const f = mine.first || {};
        const t = ST.text({ placeholder: '실험 이름', value: f.t || '', maxlength: 30 }), hy = ST.area({ rows: 2, placeholder: '통찰 → 가설: “~를 바꾸면 ~가 ~에서 ~로 달라질 것이다”', value: f.hyp || '', maxlength: 140 }), me2 = ST.text({ placeholder: '타깃 지표', value: f.metric || '', maxlength: 40 });
        const cBox = card('C. 이번 주에 시작할 첫 실험 서약', h('p', { class: 'card-sub' }, '작아도 좋아요. 이번 주 안에 출시할 수 있는 실험 하나를 약속하세요. 함께 보기의 벽에 올라갑니다.'), ST.field('이름', t), ST.field('가설', hy), ST.field('타깃 지표', me2), ST.btn('서약하기', { kind: 'gold', onclick: () => { if (!t.value.trim() || !hy.value.trim()) return ST.toast('이름과 가설을 적어 주세요'); ctx.putMine('first', { t: t.value.trim(), hyp: hy.value.trim(), metric: me2.value.trim() }); ctx.done(); ST.toast('서약했어요 🎯'); } }));

        const dBox = card('D. 내 플레이북 한 장', h('p', { class: 'card-sub' }, '앞선 챕터에서 입력한 내용을 모아 한 장으로 보여 줍니다. 인쇄(PDF 저장)하거나 텍스트로 복사하세요.'));
        const sum = h('div', { id: 'onepager' });
        dBox.appendChild(sum);
        dBox.appendChild(h('div', { class: 'row', style: { marginTop: '12px' } }, ST.btn('🖨 인쇄 / PDF', { kind: 'primary', onclick: () => window.print() }), ST.btn('📋 텍스트 복사', { onclick: () => { navigator.clipboard && navigator.clipboard.writeText(sum.innerText).then(() => ST.toast('복사했어요'), () => ST.toast('복사하지 못했어요')); } })));
        ST.clear(root); ST.add(root, [aBox, bBox, cBox, dBox]);
        /* 한 장 요약: 다른 챕터의 내 데이터를 읽어 온다 */
        const got = {}; let n = 0;
        const need = ['c1', 'c3', 'c4', 'c5', 'c8'];
        need.forEach((k) => ctx.ready(`${k}/${me}`, (d) => { got[k] = d; if (++n === need.length) drawSum(); }));
        function drawSum() {
          ST.clear(sum);
          const rows = [];
          if (got.c1.kpi) rows.push(['내가 책임질 KPI (1장)', got.c1.kpi]);
          if (got.c8.ns) rows.push(['북극성 지표 (8장)', got.c8.ns.ns + (ST.arr(got.c8.ns.objs).filter(Boolean).length ? ' / 목표: ' + ST.arr(got.c8.ns.objs).filter(Boolean).join(', ') : '')]);
          const r3 = ST.arr(got.c3.radar).map(Number); if (r3.length === 7) { const ax = ST.CH3.AX; rows.push(['가장 약한 문화 습관 (3장)', ax[r3.indexOf(Math.min(...r3))]]); }
          const am = got.c4.aarrr; if (am) rows.push(['바이탈 사인 (4장)', ST.CH4.AARRR.filter((a) => am[a.k]).map((a) => `${a.t}: ${am[a.k].m}`).join(' · ')]);
          if (got.c5.metric) rows.push(['Sprint 0 핵심 지표 (5장)', got.c5.metric === '직접 입력' ? got.c5.custom : got.c5.metric]);
          const id5 = ST.arr(got.c5.ideas).filter((i) => ST.CH5.wave(+i.imp, +i.ease) === 1); if (id5.length) rows.push(['Wave 1 실험 후보 (5장)', id5.map((i) => i.t).join(' · ')]);
          const rd2 = ST.arr(mine.ready); if (rd2.length === 5) rows.push(['준비도 최약 영역 (9장)', PILLARS[rd2.indexOf(Math.min(...rd2.map(Number)))]]);
          if (mine.first) rows.push(['이번 주 첫 실험 (9장)', `${mine.first.t} — ${mine.first.hyp}`]);
          PH.forEach((p, i) => { const x = ST.arr(mine.plan)[i]; if (x && x.a) rows.push([p.t, `${x.a}${x.who ? ' (' + x.who + ')' : ''}`]); });
          sum.appendChild(h('h3', { class: 'card-t' }, `${ctx.me.name}의 그로스 플레이북`));
          sum.appendChild(rows.length ? table(['항목', '내용'], rows.map((r) => [esc(r[0]), esc(r[1])])) : empty('앞선 챕터와 이 챕터의 실습을 채우면 여기에 요약이 나타납니다.'));
        }
      });
      return root;
    },

    together(ctx) {
      const root = h('div');
      ctx.watch('c9', (D) => {
        ST.clear(root);
        const ids = Object.keys(D).filter((u) => u !== 'q');
        const R = ids.filter((u) => D[u] && D[u].ready).map((u) => ({ u, v: ST.arr(D[u].ready).map(Number) }));
        const avg = PILLARS.map((_, i) => ST.mean(R.map((r) => r.v[i] || 0)));
        const mine = R.find((r) => r.u === ctx.me.id);
        const axes = PILLARS.map((p) => p.replace(/·/, '·\n').replace(/ /, '\n'));
        root.appendChild(grid(2, card('우리 반의 그로스 준비도', R.length ? C.radar({ axes, series: [{ name: '반 평균', vals: avg, color: 'var(--blue)', dash: '5 4' }].concat(mine ? [{ name: '나', vals: mine.v, color: 'var(--green)' }] : []), max: 5, label: '준비도 평균' }) : empty()),
          card('먼저 손볼 곳 (평균이 낮은 순)', R.length ? C.bars({ items: PILLARS.map((p, i) => ({ label: p, value: avg[i], color: 'var(--coral)' })).sort((a, b) => a.value - b.value), max: 5, fmt: (v) => v.toFixed(1) }) : empty())));
        const pl = ids.filter((u) => D[u] && D[u].first);
        root.appendChild(card('🎯 첫 실험 서약 벽', pl.length ? h('div', { class: 'wall' }, pl.map((u) => h('div', { class: 'note' + (u === ctx.me.id ? ' me' : '') }, h('b', {}, D[u].first.t), h('br'), D[u].first.hyp, D[u].first.metric ? h('div', { class: 'tag a', style: { marginTop: '6px' } }, D[u].first.metric) : null, h('span', { class: 'who' }, '— ' + ST.nameOf(u))))) : empty()));
        const pr = ST.live.prog || {}; const us = Object.keys(pr);
        root.appendChild(card('실습 완료 현황 — 참가자 × 챕터', us.length ? C.heat({ rows: us.map((u) => ST.nameOf(u) + (u === ctx.me.id ? ' (나)' : '')), cols: ST.chapters.map((c) => String(c.n)), data: us.map((u) => ST.chapters.map((c) => (pr[u] && pr[u][c.key] ? 1 : 0))), max: 1, fmt: () => '✔', color: 'var(--green)' }) : empty()));
      });
      return root;
    },

    quiz: [
      { q: '교재 결론이 강조하는 “성장팀 성공의 열쇠”가 아닌 것은?', opts: ['알맞은 도구', '가벼운 프로세스', '강한 성장 문화', '단 한 번의 바이럴 전술'], a: 3, why: '기발한 한 방이 아니라 단순한 개선의 누적, 그리고 도구·프로세스·문화가 열쇠입니다.' },
      { q: '90일 로드맵에서 첫 30일(Sprint 0)에 우선 할 일은?', opts: ['전사 캠페인 집행', '팀 구성·타깃 KPI 정렬·퍼널과 백로그 만들기', '대규모 제품 개편', '조직 개편'], a: 1, why: 'Sprint 0은 선결 조건을 확인하고 실험 백로그를 만드는 단계입니다.' },
      { q: '내 준비도 진단에서 가장 낮은 영역이 의미하는 것은?', opts: ['포기해야 할 영역', '가장 먼저 손볼 영역', '신경 쓰지 않아도 되는 영역', '다른 팀의 일'], a: 1, why: '가장 약한 고리부터 보완하면 전체 시스템의 복리 효과가 가장 크게 살아납니다.' }
    ]
  });
})();
