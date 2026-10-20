/* Chapter 1 · 성장팀의 일 */
(function () {
  const ST = window.ST, { h, P, H3, callout, ul, table, figure, card, grid, empty, esc, charts: C } = ST;
  const FUN = [
    { k: 'kpi', t: '지표 성장', c: 'var(--green)', d: '획득·활성·매출·유지 같은 핵심 KPI를 직접 움직입니다.' },
    { k: 'learn', t: '인사이트·학습', c: 'var(--blue)', d: '숫자 속을 걸어 다니며 “무엇이 지표를 움직이는지” 알아냅니다.' },
    { k: 'pmf', t: 'PMF 검증', c: 'var(--amber)', d: '제품-시장 적합성이 있는지 지표로 확인하고 함께 고칩니다.' }
  ];
  const TASKS = [
    { t: '가입 전환율을 높이기 위해 랜딩 문구 A/B 테스트를 설계한다', a: 1, why: '지표를 직접 움직이려는 가설·실험 → 성장 업무' },
    { t: '매주 월요일 임원 보고용 매출 대시보드를 갱신한다', a: 0, why: '정해진 숫자를 정기적으로 알리는 일 → 리포팅(운영) 업무' },
    { t: '이탈 고객 인터뷰로 이탈 원인 가설을 세운다', a: 1, why: '인사이트를 얻어 지표 개선 가설로 잇는 일 → 성장 업무' },
    { t: '월말 마감 실적 리포트를 정리해 배포한다', a: 0, why: '결과를 보고하는 운영 업무 → 리포팅' },
    { t: '가입 후 3일간 접속 없는 사용자에게 이메일 넛지를 실험한다', a: 1, why: '이탈 구간을 줄이는 실험 → 성장 업무' },
    { t: '부서별 요청에 맞춰 분기 KPI 현황 슬라이드를 가공한다', a: 0, why: '요청 기반의 보고서 제작 → 리포팅. 성장팀을 리포팅에 묶어 두면 손해예요.' },
    { t: '신규 사이트 전면 개편 전, 작은 테스트로 방향을 검증한다', a: 1, why: '“총알로 확신을 얻고 대포알을 쏜다” → 성장 업무' },
    { t: '감사 대응용 데이터를 추출해 전달한다', a: 0, why: '컴플라이언스·운영 지원 → 리포팅' }
  ];
  ST.CH1 = { FUN, TASKS };

  ST.chapters.push({
    n: 1, key: 'c1', title: '성장팀의 일', en: 'The Job of Growth', pages: 'p.8–12',
    tagline: '성장팀이 하는 세 가지 일과, 하지 말아야 할 한 가지(리포팅).',
    chips: ['3가지 기능', '성장 vs 리포팅', '총알과 대포알'],
    goal: '성장팀은 마케팅 부서의 다른 이름이 아닙니다. 교차기능·애자일·데이터 기반으로 핵심 지표를 움직이는 팀이 맡는 세 가지 기능을 구분해 봅니다.',

    learn() {
      const fcards = grid(3, ...FUN.map((f, i) => card(null, h('div', { class: 'big-n', style: { color: f.c } }, '0' + (i + 1)), h('h3', { class: 'card-t' }, f.t), h('p', { class: 'muted', style: { margin: 0 } }, f.d))));
      const bullets = h('div', { class: 'fig-bullets' },
        ST.fromSvg(`<svg viewBox="0 0 640 170" role="img" aria-label="작은 실험(총알)이 큰 투자(대포알)의 위험을 줄이는 흐름"><style>.t{font:600 12px 'Noto Sans KR',sans-serif;fill:var(--ink2)}.s{font:700 13px 'Noto Sans KR';fill:var(--ink)}</style>
          ${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${50 + i * 62}" cy="${90 - (i % 2) * 14}" r="9" style="fill:var(--green)"/><path d="M${28 + i * 62} ${90 - (i % 2) * 14}h-14" style="stroke:var(--green);opacity:.4" stroke-width="3"/>`).join('')}
          <text class="t" x="200" y="136" text-anchor="middle">작은 실험(총알) — 학습이 쌓인다</text>
          <path d="M385 90 H470" style="stroke:var(--ink3)" stroke-width="2" stroke-dasharray="5 5"/><path d="M462 83 l10 7 -10 7" fill="none" style="stroke:var(--ink3)" stroke-width="2"/>
          <circle cx="545" cy="84" r="44" style="fill:var(--coral)"/><text class="s" x="545" y="82" text-anchor="middle" style="fill:#fff">큰 투자</text><text class="t" x="545" y="100" text-anchor="middle" style="fill:#fff">(대포알)</text>
          <text class="t" x="545" y="152" text-anchor="middle">낮은 위험으로 발사</text></svg>`));
      return [
        P('성장팀(Growth Team)은 <b>교차기능 애자일 팀 + 데이터 기반 의사결정</b>으로 사업을 키우는 팀입니다. 최종 목표는 사용자 수, 매출, 사용량, 유지율처럼 <b>하나의 핵심 KPI</b>를 빠르게 끌어올리는 것이지만, 그 과정에서 조직에 세 가지 기능을 제공합니다.'),
        fcards,
        H3('① 특정 KPI에 집중해 사업을 키운다'),
        P('성장팀은 획득-활성화-매출-유지 같은 숫자를 속속들이 알고, 이를 개선할 계획을 세워 부서를 가로질러 실행합니다. 제품관리·마케팅·개발·데이터·애자일 역량이 한 팀에 모이는 이유입니다.'),
        callout('warn', '성장팀 ≠ 리포팅 팀', '숫자를 <b>알리는</b> 일과 숫자를 <b>움직이는</b> 일은 다릅니다. 성장팀을 리포트 제작에 묶어 두면 사업을 만드는 시간이 사라집니다.'),
        table(['구분', '성장 (Growth)', '리포팅 (Reporting)'], [
          ['성격', '사업을 <b>만드는</b> 일', '운영을 <b>돌리는</b> 일'],
          ['질문', '“어떻게 이 숫자를 올릴까?”', '“이 숫자는 지금 얼마인가?”'],
          ['산출물', '가설 · 실험 · 학습', '대시보드 · 보고서 · 데이터 추출'],
          ['담당', '교차기능 성장 스쿼드', '리포팅/분석 팀']
        ]),
        H3('② 인사이트와 학습을 만든다'),
        P('좋은 성장팀은 데이터 안에서 “걸어 다닙니다”. 양파 껍질을 벗기듯 핵심 숫자를 파고들고, 작은 승리·실패·가끔의 대박을 통해 <b>무엇이 지표를 움직이는지</b>를 이해합니다. 이 지식은 세 가지 이득으로 돌아옵니다.'),
        ul(['지표를 움직이는 레버를 당겨 사업이 자랍니다.', '무엇이 통하고 안 통하는지를 조직 전체에 공유해 의사결정이 좋아집니다.', '대형 전환 프로젝트의 위험을 줄입니다 — <b>총알(작은 실험)로 방향을 확인한 뒤 대포알(큰 투자)</b>을 쏩니다.']),
        figure(bullets, '그림. 총알과 대포알 (교재의 Jim Collins 인용을 도해로 다시 그림)'),
        callout('info', '교재 사례', '웹사이트 전환율을 몇 달간 실험으로 크게 끌어올린 뒤, “지금 최적화하는 게 맞는가?”를 되묻고 새 사이트를 만들었더니 이미 최적화된 사이트보다 <b>50% 더 좋은 성과</b>가 나왔습니다. 수십 번의 실험이 새 사이트의 위험을 낮춘 셈입니다.'),
        H3('③ 제품-시장 적합성(PMF)을 검증하거나 찾는다'),
        P('PMF를 찾는 일은 보통 제품관리의 몫입니다. 그러나 <b>PMF 없이는 성장팀도 작동하지 않습니다</b> — 구멍 난 양동이에 물을 붓는 격이기 때문입니다. 성장팀은 핵심 KPI를 벤치마크하고 개선하며 PMF를 확인하고, 아직 부족하다면 제품팀과 함께 기초부터 고칩니다.'),
        callout('tip', '다음 장으로', '성장팀이 “어디서” 힘을 쓰는지 — 사용자 여정 <b>전체 시스템</b>과 복리 효과 — 를 2장에서 직접 계산해 봅니다.')
      ];
    },

    practice(ctx) {
      const root = h('div');
      ctx.ready(`c1/${ctx.me.id}`, (mine) => {
        const alloc = (ST.arr(mine.alloc).length === 3 ? ST.arr(mine.alloc) : [4, 3, 3]).map(Number);
        const sorted = Object.assign({}, mine.sort || {});
        /* A. 코인 배분 */
        const aBox = card('A. 우리 조직에 지금 가장 필요한 성장팀의 역할은?', h('p', { class: 'card-sub' }, '코인 10개를 세 가지 기능에 나눠 주세요. (합계 10)'));
        const left = h('div', { class: 'metric', style: { maxWidth: '200px' } });
        const rows = FUN.map((f, i) => {
          const n = h('b', { class: 'mono', style: { minWidth: '28px', textAlign: 'center', fontSize: '20px' } }, String(alloc[i]));
          const minus = ST.btn('−', { kind: 'sm', onclick: () => { if (alloc[i] > 0) { alloc[i]--; paint(); } } });
          const plus = ST.btn('+', { kind: 'sm', onclick: () => { if (alloc.reduce((a, b) => a + b, 0) < 10) { alloc[i]++; paint(); } } });
          const bar = h('div', { class: 'hb-t', style: { flex: 1, minWidth: '80px' } }, h('i', { style: { background: f.c, width: '0%' } }));
          const row = h('div', { class: 'row', style: { marginBottom: '8px' } }, h('div', { style: { flex: '0 0 140px' } }, h('b', {}, f.t), h('div', { class: 'muted', style: { fontSize: '12.5px' } }, f.d.slice(0, 22) + '…')), minus, n, plus, bar);
          row.upd = () => { n.textContent = alloc[i]; bar.firstChild.style.width = alloc[i] * 10 + '%'; };
          return row;
        });
        function paint() { rows.forEach((r) => r.upd()); const rem = 10 - alloc.reduce((a, b) => a + b, 0); left.innerHTML = `<b>${rem}</b><span>남은 코인</span>`; saveBtn.disabled = rem !== 0; }
        const saveBtn = ST.btn('배분 저장', { kind: 'primary', onclick: () => { ctx.putMine('alloc', alloc.slice()); ctx.done(); ST.toast('저장했어요 ✔'); } });
        ST.add(aBox, [rows, left, h('div', { style: { marginTop: '10px' } }, saveBtn)]);
        paint();

        /* B. 분류 */
        const bBox = card('B. 이 업무, 성장일까 리포팅일까?', h('p', { class: 'card-sub' }, '8개 업무를 분류해 보세요. 답하면 바로 해설이 나옵니다.'));
        const score = h('p', { class: 'rate' });
        const upScore = () => { const k = Object.keys(sorted); const ok = k.filter((i) => +sorted[i] === TASKS[i].a).length; score.textContent = k.length ? `${k.length}/8 응답 · ${ok}개 정답` : ''; };
        TASKS.forEach((t, i) => {
          const fb = h('div', { class: 'why', hidden: true });
          const sg = ST.seg([{ v: 1, l: '🌱 성장' }, { v: 0, l: '📊 리포팅' }], sorted[i] == null ? null : +sorted[i], (v) => { sorted[i] = v; show(v); ctx.putMine('sort/' + i, v); ctx.done(); upScore(); });
          function show(v) { fb.hidden = false; fb.innerHTML = (v === t.a ? '✅ ' : '❌ ') + esc(t.why); }
          if (sorted[i] != null) show(+sorted[i]);
          bBox.appendChild(h('div', { style: { padding: '10px 0', borderTop: '1px dashed var(--line)' } }, h('p', { style: { margin: '0 0 8px' } }, h('b', { class: 'mono' }, (i + 1) + '. '), t.t), sg, fb));
        });
        bBox.appendChild(score); upScore();

        /* C. KPI 한 줄 */
        const kpi = ST.text({ placeholder: '예) 신규 교육과정의 무료체험→유료 전환율 20% 달성', value: mine.kpi || '', maxlength: 70 });
        const cBox = card('C. 내가(우리 팀이) 책임지고 싶은 KPI 한 줄', h('p', { class: 'card-sub' }, '지표 하나, 숫자와 기간이 보이게. 함께 보기에서 모두의 KPI가 벽에 붙습니다.'), kpi, h('div', { style: { marginTop: '10px' } }, ST.btn('벽에 붙이기', { kind: 'primary', onclick: () => { if (!kpi.value.trim()) return ST.toast('한 줄을 적어 주세요'); ctx.putMine('kpi', kpi.value.trim()); ctx.done(); ST.toast('벽에 붙였어요 ✔'); } })));
        ST.clear(root); ST.add(root, [aBox, bBox, cBox]);
      });
      return root;
    },

    together(ctx) {
      const root = h('div');
      ctx.watch('c1', (d) => {
        const ids = Object.keys(d).filter((k) => k !== 'q');
        ST.clear(root);
        const users = ids.filter((u) => d[u] && d[u].alloc);
        const A = users.map((u) => ({ u, a: ST.arr(d[u].alloc).map(Number) }));
        const avg = FUN.map((_, i) => ST.mean(A.map((x) => x.a[i] || 0)));
        const donut = A.length ? C.donut({ parts: FUN.map((f, i) => ({ v: avg[i], color: f.c, name: f.t, text: avg[i].toFixed(1) + '코인' })), center: A.length + '명', sub: '평균 배분', label: '평균 코인 배분' }) : empty();
        const stack = A.length ? C.stack({ items: A.map((x) => ({ label: ST.nameOf(x.u) + (x.u === ctx.me.id ? ' (나)' : ''), hl: x.u === ctx.me.id, parts: FUN.map((f, i) => ({ v: x.a[i], color: f.c, name: f.t })) })), legend: FUN.map((f) => ({ name: f.t, color: f.c })) }) : empty();
        root.appendChild(grid(2, card('우리 반이 원하는 성장팀의 역할', donut), card('참가자별 코인 배분', stack)));

        /* 분류 정답률 */
        const per = TASKS.map((t, i) => { const r = ids.map((u) => d[u] && d[u].sort && d[u].sort[i]).filter((v) => v != null); return { n: r.length, ok: r.filter((v) => +v === t.a).length, g: r.filter((v) => +v === 1).length }; });
        root.appendChild(card('업무 분류 — 모두의 선택과 정답률', C.heat({ rows: TASKS.map((t, i) => `${i + 1}. ${t.t.slice(0, 24)}…`), cols: ['정답', '“성장” 응답', '응답 수'], data: per.map((p, i) => [p.n ? Math.round((p.ok / p.n) * 100) : 0, p.g, p.n]), max: 100, fmt: (v) => v, color: 'var(--green)' }),
          h('p', { class: 'muted', style: { marginTop: '8px' } }, '※ 색이 진할수록 값이 큽니다(정답률 %). 정답률이 낮은 업무가 우리 조직이 헷갈리기 쉬운 “성장 vs 리포팅” 경계예요.')));

        /* KPI 벽 */
        const wall = h('div', { class: 'wall' });
        ids.filter((u) => d[u] && d[u].kpi).forEach((u) => wall.appendChild(h('div', { class: 'note' + (u === ctx.me.id ? ' me' : '') }, h('b', {}, d[u].kpi), h('span', { class: 'who' }, '— ' + ST.nameOf(u)))));
        root.appendChild(card('KPI 벽', wall.children.length ? wall : empty('아직 붙은 KPI가 없어요.')));
      });
      return root;
    },

    quiz: [
      { q: '교재가 말하는 성장팀의 정의에 가장 가까운 것은?', opts: ['A/B 테스트를 돌리는 마케팅 팀', '교차기능·애자일·데이터 기반으로 핵심 KPI를 키우는 팀', '매주 경영 보고서를 만드는 분석 팀', '신제품을 기획하는 제품 팀'], a: 1, why: '성장팀은 마케팅·A/B 테스트에 국한되지 않고 교차기능 팀이 KPI를 움직이는 방식을 말합니다.' },
      { q: '“총알과 대포알”이 뜻하는 바는?', opts: ['작은 실험으로 방향을 검증한 뒤 큰 투자를 한다', '큰 프로젝트를 먼저 하고 작은 실험은 생략한다', '실험은 많이 할수록 비용이 줄어든다', '실패한 실험은 공유하지 않는다'], a: 0, why: '작은 실험(총알)이 쌓여 확신이 생기면 큰 투자(대포알)를 낮은 위험으로 쏠 수 있습니다.' },
      { q: '성장팀이 제품-시장 적합성(PMF)에 대해 해야 할 일로 알맞은 것은?', opts: ['PMF는 제품팀 일이므로 전혀 관여하지 않는다', 'PMF 없이도 규모를 키우는 데 집중한다', 'KPI 벤치마크와 개선으로 PMF를 확인하고, 부족하면 제품팀과 함께 고친다', 'PMF가 있으면 실험은 필요 없다'], a: 2, why: '구멍 난 양동이에 물을 붓지 않도록, PMF를 검증·보완한 뒤 확장합니다.' }
    ]
  });
})();
