/* Chapter 8 · 실험 관리 도구 (ICE · 목표 · 성장 회의) */
(function () {
  const ST = window.ST, { h, P, H3, callout, ul, table, figure, card, grid, empty, esc, charts: C } = ST;
  const SEED = [
    { id: 'seed0', t: '가입 혜택(오퍼) 개선' }, { id: 'seed1', t: '리타기팅 캠페인' }, { id: 'seed2', t: '가입 폼 필드 줄이기' },
    { id: 'seed3', t: '가입 페이지 카피 개선' }, { id: 'seed4', t: '바운스백 넛지 이메일' }, { id: 'seed5', t: '첫 사용 가이드 투어' }
  ];
  const ice = (a) => (a && a.length === 3 ? (a[0] + a[1] + a[2]) / 3 : null);
  ST.CH8 = { SEED, ice };

  const ideasOf = (D) => SEED.concat(Object.keys(D.ideas || {}).map((id) => Object.assign({ id }, D.ideas[id])).sort((a, b) => (a.at || 0) - (b.at || 0)));
  function agg(D) {
    const users = Object.keys(D.ice || {});
    return ideasOf(D).map((i) => {
      const rs = users.map((u) => ST.arr((D.ice[u] || {})[i.id])).filter((a) => a.length === 3).map((a) => a.map(Number));
      const m = (k) => ST.mean(rs.map((r) => r[k]));
      const claps = Object.keys(D.claps || {}).reduce((s, u) => s + (+((D.claps[u] || {})[i.id]) || 0), 0);
      const stars = Object.keys(D.stars || {}).filter((u) => (D.stars[u] || {})[i.id]).length;
      return Object.assign({}, i, { n: rs.length, I: m(0), Cf: m(1), E: m(2), score: rs.length ? (m(0) + m(1) + m(2)) / 3 : 0, claps, stars });
    });
  }
  ST.CH8.agg = agg;

  ST.chapters.push({
    n: 8, key: 'c8', title: '실험 관리 도구와 성장 회의', en: 'Tools — Experiments by GrowthHackers', pages: 'p.104–127',
    tagline: '북극성 지표 → 목표 → 아이디어. ICE 점수로 정렬하고 성장 회의에서 다음 스프린트를 고릅니다.',
    chips: ['ICE 점수', '북극성·목표', '성장 회의'],
    goal: '실험 관리 도구 하나를 쓴다고 가정하고 목표(Objectives), 아이디어, 실험 카드, ICE 점수, 배움 보기, 성장 회의까지 한 바퀴 돕니다. 특정 도구가 없어도 같은 구조를 Trello·Jira·Notion으로 만들 수 있습니다.',

    learn() {
      const tree = ST.fromSvg(`<svg viewBox="0 0 640 260" role="img" aria-label="북극성 지표, 목표, 아이디어 3단 구조"><style>.n{font:700 14px 'Noto Sans KR';fill:#fff}.o{font:700 12.5px 'Noto Sans KR';fill:var(--ink)}.i{font:500 11.5px 'Noto Sans KR';fill:var(--ink2)}</style>
        <rect x="190" y="8" width="260" height="44" rx="12" style="fill:var(--green)"/><text class="n" x="320" y="35" text-anchor="middle">★ North Star Metric</text>
        ${[0, 1, 2].map((k) => `<path d="M320 52 V74 H${110 + k * 210} V92" fill="none" style="stroke:var(--line)" stroke-width="2"/><rect x="${20 + k * 210}" y="92" width="180" height="42" rx="10" style="fill:var(--blue-l);stroke:var(--blue)"/><text class="o" x="${110 + k * 210}" y="118" text-anchor="middle">Objective ${k + 1}</text>`).join('')}
        ${[0, 1, 2, 3, 4, 5].map((k) => `<path d="M${110 + Math.floor(k / 2) * 210} 134 V154 H${60 + k * 105} V172" fill="none" style="stroke:var(--line)" stroke-width="2"/><rect x="${10 + k * 105}" y="172" width="100" height="40" rx="9" style="fill:var(--amber-l);stroke:var(--amber)"/><text class="i" x="${60 + k * 105}" y="196" text-anchor="middle">Idea ${k + 1}</text>`).join('')}
        <text class="i" x="320" y="244" text-anchor="middle">모든 아이디어·실험은 하나의 목표에 연결된다 → 목표별로 진행 상황과 배움을 본다</text></svg>`);
      const agenda = h('div', { class: 'loop', style: { gridTemplateColumns: 'repeat(3,1fr)' } }, [['대시보드', '목표 대비 지표 · 성취 확인'], ['진행 중 실험', '결론을 낼 수 있나? 막힌 곳은? (상세 보고 아님)'], ['스프린트 계획', '⭐로 지명한 아이디어에서 다음 실험 선택']].map(([a, b]) => h('div', {}, h('b', {}, a), h('span', {}, b))));
      return [
        P('이 장은 GrowthHackers의 <b>Experiments</b> 도구를 예로 설명합니다. 핵심은 도구가 아니라 <b>구조</b>입니다 — 어느 도구에서든 목표·아이디어·카드·점수·배움 기록·회의 흐름을 갖추면 됩니다.'),
        H3('1. 목표 세팅 — 북극성 > 목표 > 아이디어'),
        P('성장팀은 하나 또는 소수의 KPI를 맡습니다. <b>북극성 지표(North Star Metric) → 목표(Objectives) → 아이디어</b>의 3단 구조를 만들면 초점과 유연성을 함께 얻습니다. 목표를 도구에 먼저 입력하면 모든 아이디어와 실험이 목표에 매핑되어, 목표별로 아이디어·진행 실험·배움을 한눈에 보고 개선 추이를 길게 추적할 수 있습니다.'),
        figure(tree, '그림. 3단 구조 (도해를 새로 그림)'),
        H3('2. 성장 아이디어'),
        P('시작이 막막하면 5장(Sprint 0)과 6장(그로스 잼)의 방법을 쓰고, 영감이 더 필요하면 커뮤니티가 크라우드소싱한 아이디어를 필터링해 프로젝트로 <b>가져올</b> 수 있습니다.'),
        H3('3. 실험 카드와 ICE 점수'),
        P('카드는 7장의 5요소(제목·통찰·가설·설계·지표)에 더해 다음을 붙입니다.'),
        table(['항목', '설명'], [
          ['ICE 점수', '<b>I</b>mpact(타깃 지표에 미칠 영향) · <b>C</b>onfidence(예상 결과를 얻을 확신) · <b>E</b>ase(실행 용이성)를 각각 점수화. 아이디어가 많거나 이해관계자가 여럿일 때 정렬 기준이 됩니다.'],
          ['목표(Objective)', '이 실험이 어느 목표를 움직이려는가 (가입 증가, MAU 증가, 이탈 감소…)'],
          ['댓글', '회의 밖에서 질문·진행을 이어가는 기록 — 세부 맥락이 남습니다.']
        ]),
        callout('info', '이 프로그램의 ICE', '교재는 ICE의 세부 계산식을 다루지 않습니다. 이 사이트에서는 세 점수(1~10)의 <b>평균</b>으로 계산합니다. 팀에 따라 합계·곱 등을 쓰기도 하니, 팀 안에서 하나로 정해 일관되게 쓰세요.'),
        H3('4. 아이디어 정리 — 기여와 박수'),
        ul(['<b>기여</b> — 이해관계자가 직접 아이디어를 넣거나 도구로 의견을 요청합니다.', '<b>박수(Clap)</b> — 누구나 아이디어에 투표해 점수를 줍니다. 팀과 이해관계자가 꾸준히 박수를 주면 “가장 박수 받은 아이디어”가 위로 올라옵니다.']),
        H3('5. 성장 프로세스 관리 — 열 이름 매핑'),
        table(['도구의 열', '7장의 열', '의미'], [['Up Next', '백로그', '현재 스프린트의 우선순위 실험 목록'], ['In Progress', '진행 중', '팀이 실제로 작업 중'], ['Ready to Analyze', 'Running', '결론이 났는지 주기적으로 점검한 뒤 Learning(플레이백)으로 이동']]),
        P('분석이 끝나고 결정을 내리면 결과를 입력해 <b>Learning(배움)</b> 보기로 옮기고 영원히 기록합니다. 목표 같은 메타데이터로 필터링하면 예컨대 “유지(Retention)” 목표로 해 본 모든 실험을 성공·실패 가리지 않고 한꺼번에 볼 수 있습니다.'),
        H3('6. 성장 회의 = 스프린트 계획 회의'),
        figure(agenda, '그림. 성장 회의의 세 가지 안건'),
        ul(['<b>대시보드</b> — 목표 대비 진행 상황(목표별로 값을 주기적으로 입력). 팀이 지금 어디쯤인지 같이 보고 성장 문화를 키웁니다.', '<b>진행 중 실험</b> — 상세 보고가 아니라 “곧 결론 낼 수 있나, 막혔나”. 가입 폼에 실험이 돌고 있다면 같은 폼의 새 실험은 잡지 않습니다.', '<b>스프린트 계획</b> — 아이디어 카드의 ⭐로 지명(nominate)한 목록에서 다음 실험을 고릅니다.'])
      ];
    },

    practice(ctx) {
      const root = h('div');
      let D = {}; const me = ctx.me.id;
      const nsBox = h('div'), iceBox = h('div'), kpiBox = h('div');
      /* A. 북극성 */
      ctx.ready(`c8/ns/${me}`, (mine) => {
        const ns = ST.text({ placeholder: '북극성 지표 (예: 주간 활성 수강생 수)', value: mine.ns || '', maxlength: 40 });
        const os = [0, 1, 2].map((i) => ST.text({ placeholder: `목표 ${i + 1} (예: 신규 가입 증가)`, value: ST.arr(mine.objs)[i] || '', maxlength: 36 }));
        nsBox.appendChild(card('A. 나의 북극성 지표와 목표 3개', h('p', { class: 'card-sub' }, '팀이 가장 크게 키우고 싶은 지표 하나와, 그것을 움직일 목표 세 가지를 적어 보세요.'), ST.field('북극성 지표', ns), h('div', { class: 'grid g3', style: { marginBottom: '10px' } }, os.map((o, i) => ST.field('목표 ' + (i + 1), o))),
          ST.btn('저장', { kind: 'primary', onclick: () => { if (!ns.value.trim()) return ST.toast('북극성 지표를 적어 주세요'); ctx.put(`ns/${me}`, { ns: ns.value.trim(), objs: os.map((o) => o.value.trim()) }); ctx.done(); ST.toast('저장했어요 ✔'); } })));
      });
      /* B. ICE + 박수 + 별 */
      const rIce = (function () {
        const region = iceBox; let pending = false;
        const run = () => {
          ST.clear(region);
          const ideas = ideasOf(D), myIce = (D.ice || {})[me] || {}, myClaps = (D.claps || {})[me] || {}, myStars = (D.stars || {})[me] || {};
          const used = Object.values(myClaps).reduce((s, v) => s + (+v || 0), 0);
          const rows = ideas.map((i) => {
            const cur = ST.arr(myIce[i.id]).map(Number); const v = cur.length === 3 ? cur : [5, 5, 5];
            const sel = [0, 1, 2].map((k) => { const s = ST.select(Array.from({ length: 10 }, (_, n) => n + 1), v[k], null, { 'aria-label': ['영향', '확신', '용이'][k] }); return s; });
            const out = h('b', { class: 'mono' }, cur.length === 3 ? ice(cur).toFixed(1) : '–');
            const commit = () => { const a = sel.map((s) => +s.value); out.textContent = ice(a).toFixed(1); ctx.put(`ice/${me}/${i.id}`, a); ctx.done(); };
            sel.forEach((s) => s.addEventListener('change', commit));
            const clap = ST.btn('👏 ' + (+myClaps[i.id] || 0), { kind: 'sm', onclick: () => { const n = +myClaps[i.id] || 0; if (used >= 5) return ST.toast('박수는 1인 5번까지예요'); ctx.put(`claps/${me}/${i.id}`, n + 1); ctx.done(); } });
            const star = ST.btn(myStars[i.id] ? '⭐' : '☆', { kind: 'sm', onclick: () => { ctx.put(`stars/${me}/${i.id}`, myStars[i.id] ? null : 1); ctx.done(); } });
            return h('tr', {}, h('th', { scope: 'row' }, i.t), ...sel.map((s) => h('td', {}, s)), h('td', {}, out), h('td', {}, clap), h('td', {}, star));
          });
          const nt = ST.text({ placeholder: '내 아이디어 추가', maxlength: 34 });
          region.appendChild(card('B. 아이디어 점수 매기기 — ICE · 박수 · 성장 회의 지명', h('p', { class: 'card-sub' }, `각 아이디어에 영향(I)·확신(C)·용이(E)를 1~10으로 매기세요. 박수는 총 5번(사용 ${used}/5), ⭐는 다음 스프린트 후보 지명입니다. 점수를 바꾸면 자동 저장돼요.`),
            h('div', { class: 'tbl-wrap' }, h('table', { class: 'tbl' }, h('thead', {}, h('tr', {}, ['아이디어', '영향 I', '확신 C', '용이 E', 'ICE', '박수', '지명'].map((x) => h('th', {}, x)))), h('tbody', {}, rows))),
            h('div', { class: 'row', style: { marginTop: '10px' } }, nt, ST.btn('+ 아이디어 추가', { onclick: () => { if (!nt.value.trim()) return; ctx.put('ideas/' + ST.uid(), { t: nt.value.trim(), by: me, at: Date.now() }); ctx.done(); } }))));
        };
        return () => { const a = document.activeElement; if (region.contains(a) && /INPUT|TEXTAREA/.test(a.tagName)) { pending = true; if (!region._h) { region._h = 1; region.addEventListener('focusout', () => setTimeout(() => { if (pending && !region.contains(document.activeElement)) { pending = false; run(); } }, 0)); } return; } run(); };
      })();
      /* C. KPI 대시보드 */
      ctx.ready(`c8/kpi/${me}`, (mine) => {
        const st = { name: mine.name || '주간 신규 가입', base: mine.base != null ? +mine.base : 100, target: mine.target != null ? +mine.target : 160, weeks: ST.arr(mine.weeks).map(Number) };
        const nm = ST.text({ value: st.name, maxlength: 30 }), bs = h('input', { type: 'number', value: st.base }), tg = h('input', { type: 'number', value: st.target }), wk = h('input', { type: 'number', placeholder: '이번 주 값' });
        const out = h('div');
        const paint = () => {
          st.name = nm.value; st.base = +bs.value || 0; st.target = +tg.value || 0;
          ST.clear(out);
          const last = st.weeks.length ? st.weeks[st.weeks.length - 1] : st.base, prog = st.target !== st.base ? (last - st.base) / (st.target - st.base) : 0;
          out.appendChild(h('div', { class: 'grid g2' }, C.gauge({ value: Math.max(0, Math.min(1, prog)), threshold: 1, thLabel: '목표', text: Math.round(prog * 100) + '%', caption: `${last} / 목표 ${st.target}`, label: '목표 달성률' }),
            C.line({ series: [{ name: st.name, pts: [[0, st.base]].concat(st.weeks.map((v, i) => [i + 1, v])), color: 'var(--green)', dots: true, width: 3 }], refY: st.target, refLabel: '목표', ymin: Math.min(st.base, ...st.weeks, st.target) * 0.8, xFmt: (v) => (v === 0 ? '시작' : v + '주'), xTickVals: Array.from({ length: Math.max(st.weeks.length, 4) + 1 }, (_, i) => i), label: 'KPI 추이' })));
        };
        [nm, bs, tg].forEach((x) => x.addEventListener('input', paint)); paint();
        kpiBox.appendChild(card('C. 성장 회의 대시보드 — 내 KPI 추적', h('p', { class: 'card-sub' }, '시작값과 목표를 정하고 매주 값을 입력해 목표 대비 진행을 보세요. 회의는 항상 이 화면에서 시작합니다.'),
          h('div', { class: 'row' }, ST.field('KPI 이름', nm), ST.field('시작값', bs), ST.field('목표값', tg)), out,
          h('div', { class: 'row', style: { marginTop: '10px' } }, wk, ST.btn('+ 이번 주 값 기록', { onclick: () => { if (wk.value === '') return; st.weeks.push(+wk.value); wk.value = ''; paint(); } }), ST.btn('되돌리기', { kind: 'ghost', onclick: () => { st.weeks.pop(); paint(); } }), ST.btn('공유하기', { kind: 'primary', onclick: () => { ctx.put(`kpi/${me}`, { name: st.name, base: st.base, target: st.target, weeks: st.weeks }); ctx.done(); ST.toast('공유했어요 ✔'); } }))));
      });
      ctx.watch('c8', (d) => { D = d || {}; rIce(); });
      ST.add(root, [nsBox, iceBox, kpiBox]);
      return root;
    },

    together(ctx) {
      const root = h('div');
      ctx.watch('c8', (D) => {
        ST.clear(root);
        const A = agg(D).filter((a) => a.n > 0).sort((a, b) => b.score - a.score);
        root.appendChild(grid(2,
          card('ICE 순위 (우리 반 평균)', A.length ? C.bars({ items: A.map((a, i) => ({ label: a.t, value: a.score, text: a.score.toFixed(1), color: i < 3 ? 'var(--green)' : 'var(--blue)', hl: i < 3 })), max: 10, fmt: (v) => v.toFixed(1) }) : empty()),
          card('영향 × 용이성 (크기 = 확신)', A.length ? C.scatter({ xmin: 0, xmax: 10, ymin: 0, ymax: 10, points: A.map((a, i) => ({ x: a.E, y: a.I, r: 5 + a.Cf * 1.6, label: a.t, color: i < 3 ? 'var(--green)' : 'var(--blue)', title: `${a.t}: I ${a.I.toFixed(1)} · C ${a.Cf.toFixed(1)} · E ${a.E.toFixed(1)}` })), zones: [{ x0: 5, x1: 10, y0: 5, y1: 10, fill: 'var(--green)', label: '지금 하자', op: .12 }], xLabel: '용이성 (Ease)', yLabel: '영향 (Impact)', h: 400, label: 'ICE 버블' }) : empty())));
        const AA = agg(D);
        root.appendChild(grid(2,
          card('👏 가장 박수 받은 아이디어', C.bars({ items: AA.slice().sort((a, b) => b.claps - a.claps).filter((a) => a.claps).slice(0, 6).map((a) => ({ label: a.t, value: a.claps, color: 'var(--amber)' })), fmt: (v) => v + '👏' }).children.length ? C.bars({ items: AA.slice().sort((a, b) => b.claps - a.claps).filter((a) => a.claps).slice(0, 6).map((a) => ({ label: a.t, value: a.claps, color: 'var(--amber)' })), fmt: (v) => v + '👏' }) : empty()),
          card('⭐ 다음 스프린트 후보 (지명 수)', (() => { const L = AA.filter((a) => a.stars).sort((a, b) => b.stars - a.stars).slice(0, 6); return L.length ? C.bars({ items: L.map((a) => ({ label: a.t, value: a.stars, color: 'var(--violet)' })), fmt: (v) => v + '명' }) : empty(); })())));
        const ids = Object.keys(D.ns || {});
        root.appendChild(card('북극성 벽', ids.length ? h('div', { class: 'wall' }, ids.map((u) => h('div', { class: 'note' + (u === ctx.me.id ? ' me' : '') }, h('b', {}, '★ ' + D.ns[u].ns), h('br'), ST.arr(D.ns[u].objs).filter(Boolean).map((o) => '· ' + o).join('  '), h('span', { class: 'who' }, '— ' + ST.nameOf(u))))) : empty()));
        const ks = Object.keys(D.kpi || {}).filter((u) => D.kpi[u] && ST.arr(D.kpi[u].weeks).length);
        const prog = ks.map((u) => { const k = D.kpi[u], w = ST.arr(k.weeks).map(Number); return { u, name: k.name, series: w.map((v) => (k.target !== k.base ? ((v - k.base) / (k.target - k.base)) * 100 : 0)) }; });
        root.appendChild(card('KPI 달성률 추이 (목표 = 100%)', prog.length ? [C.line({ series: prog.map((p, i) => ({ name: ST.nameOf(p.u), pts: [[0, 0]].concat(p.series.map((v, k) => [k + 1, v])), color: p.u === ctx.me.id ? 'var(--green)' : ST.PAL[(i + 1) % ST.PAL.length], width: p.u === ctx.me.id ? 3.4 : 1.8 })), refY: 100, refLabel: '목표', xFmt: (v) => (v === 0 ? '시작' : v + '주'), yFmt: (v) => Math.round(v) + '%', xTickVals: [0, 1, 2, 3, 4, 5, 6], ymin: 0, label: '달성률 추이' })] : empty()));
      });
      return root;
    },

    quiz: [
      { q: '성장팀의 목표 구조로 교재가 제안한 3단 계층은?', opts: ['부서 > 팀 > 개인', 'North Star Metric > Objectives > Ideas', '매출 > 비용 > 이익', '캠페인 > 채널 > 크리에이티브'], a: 1, why: '하나의 북극성 지표 아래 목표들이 있고, 모든 아이디어·실험이 목표에 매핑됩니다.' },
      { q: 'ICE 점수의 세 요소가 아닌 것은?', opts: ['Impact', 'Confidence', 'Ease', 'Cost'], a: 3, why: 'ICE = Impact(영향), Confidence(확신), Ease(실행 용이성)입니다.' },
      { q: '성장 회의의 기본 안건 순서로 알맞은 것은?', opts: ['스프린트 계획 → 대시보드 → 휴식', '대시보드 → 진행 중 실험 → 스프린트 계획', '진행 중 실험 → 회고 → 평가', '아이디어 발표 → 투표 → 해산'], a: 1, why: '목표 대비 현황을 먼저 보고, 돌고 있는 실험을 점검한 뒤 다음 스프린트의 실험을 고릅니다.' }
    ]
  });
})();
