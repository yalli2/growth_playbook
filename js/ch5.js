/* Chapter 5 · 성장 프로세스 — Sprint 0 */
(function () {
  const ST = window.ST, { h, P, H3, callout, ul, table, figure, card, grid, empty, esc, charts: C } = ST;
  const METRICS = ['획득: 신규 방문/체험 신청', '활성화: 첫 사용·설정 완료', '유지: 재방문·월 유지율', '매출: 무료→유료 전환', '추천: 추천 가입', '직접 입력'];
  const DEF_STAGES = [{ name: '웹페이지 방문', n: 1000 }, { name: '가입 페이지 방문', n: 520 }, { name: '계정 생성', n: 240 }, { name: '로그인(첫 사용)', n: 150 }];
  const wave = (imp, ease) => (imp >= 6 && ease >= 5 ? 1 : imp < 4 ? 3 : 2);
  ST.CH5 = { METRICS, DEF_STAGES, wave };

  ST.chapters.push({
    n: 5, key: 'c5', title: '그로스 프로세스: Sprint 0', en: 'The Growth Process — Build Your Experiment Backlog', pages: 'p.63–75',
    tagline: '지표 하나 → 여정 지도 → 퍼널 → 아이디어 → 우선순위. 실험 백로그를 만드는 5단계.',
    chips: ['Sprint 0', '퍼널 히스토그램', '우선순위 그리드'],
    goal: '성장 프로세스의 본질은 “지표를 조금씩 올리는 실험의 꾸준한 흐름”입니다. 애자일 스프린트와 월간 플레이백으로 학습을 쌓는 구조를 이해하고, Sprint 0에서 실험 백로그를 직접 만들어 봅니다.',

    learn() {
      const loop = h('div', { class: 'flow' }, ['실험 백로그', '실행 중', '분석 · 공유', '완료 실험(배움 아카이브)', '다음 실험 계획'].map((s) => h('div', { class: 'st' }, s)));
      const sprints = table(['', 'Sprint 0', 'Sprint 1', 'Sprint 2', 'Sprint 3'], [
        ['초점', '평가·선결 조건, 팀 구성', '성장 기본기 교육, 첫 실험 계획', '첫 실험 출시', '다음 실험 출시'],
        ['핵심 과제', '교차기능 팀(제품·마케팅·영업·개발 리더) 구성, 도구·측정 확인, 퍼널 심층 분석', '여정 지도 → 퍼널 분석 → 백로그 생성 → 우선순위 → 첫 2개 이상 실험 합의', '진행 상황 모니터, 사용자 행동 분석, 다음 실험 계획, <b>플레이백</b>', '실험 이슈를 기존 애자일 절차(백로그 그루밍·플레이백)에 통합'],
        ['경영진', '타깃 KPI 정렬, 실험 실행 지원', '플레이백 참석 약속', '결과·다음 실험을 함께 확인', '정례화']
      ]);
      const grid5 = ST.fromSvg(`<svg viewBox="0 0 640 300" role="img" aria-label="우선순위 그리드: 영향도와 실행 난이도"><style>.z{font:700 13px 'Noto Sans KR';fill:var(--ink2)}.i{font:600 12px 'Noto Sans KR';fill:var(--ink)}</style>
        <rect x="60" y="10" width="190" height="130" style="fill:var(--line2)"/><rect x="250" y="10" width="190" height="130" style="fill:var(--amber-l)"/><rect x="440" y="10" width="190" height="130" style="fill:var(--green-l)"/>
        <rect x="60" y="140" width="190" height="130" style="fill:var(--line2);opacity:.6"/><rect x="250" y="140" width="190" height="130" style="fill:var(--amber-l);opacity:.6"/><rect x="440" y="140" width="190" height="130" style="fill:var(--green-l);opacity:.6"/>
        <text class="z" x="70" y="30">WAVE 3</text><text class="z" x="260" y="30">WAVE 2</text><text class="z" x="450" y="30">WAVE 1</text>
        <text class="i" x="540" y="70" text-anchor="middle">바운스백 넛지 이메일</text><text class="i" x="345" y="100" text-anchor="middle">가입 혜택 개선</text><text class="i" x="150" y="80" text-anchor="middle">가입 페이지 문구</text>
        <text class="i" x="345" y="190" text-anchor="middle">리타기팅 캠페인</text><text class="i" x="150" y="210" text-anchor="middle">폼 필드 줄이기</text>
        <text class="z" x="345" y="292" text-anchor="middle">낮은 영향 ←──────────→ 높은 영향</text><text class="z" transform="translate(16 140) rotate(-90)" text-anchor="middle">어려움 ←→ 쉬움</text></svg>`);
      return [
        P('성장 프로세스의 기본은 <b>지표를 점진적으로 개선할 실험의 꾸준한 흐름</b>입니다. 이를 위해 실험 백로그를 만들고, <b>주간 스프린트</b>로 새 실험을 출시하며, 진행 중인 실험을 추적하고, 플레이백으로 배움을 공유·기록합니다.'),
        figure(loop, '그림. 실험은 “백로그 → 실행 → 분석·공유 → 아카이브”로 흐릅니다.'),
        ul(['<b>애자일</b> — 주간 스프린트, 주간 지표 리뷰, 이해관계자와 주간 조율(매트릭스 조직이면 별도 조율 시간)', '<b>속도</b> — 월 N개 실험 출시. 결과 지표와 함께 활동 지표를 두면 쉬운 개선과 어려운 개선이 섞입니다. 항상 최소한의 실험이 돌고 있어야 하고 다음 실험을 병행 계획합니다.', '<b>배움 유지</b> — 결과를 게시해 학습 이력을 만들고 월간 플레이백으로 더 넓은 이해관계자와 나눕니다.']),
        H3('시작하기 — 첫 4번의 스프린트'),
        sprints,
        H3('Sprint 0 · 실험 백로그 만들기 5단계'),
        h('div', { class: 'grid g3' }, [
          ['STEP 1', '개선할 프로세스/지표를 고른다', '핵심 지표 하나. 신생 팀이면 30~60일 안에 움직일 수 있는 의미 있는 지표를. 해적 지표를 가이드로 삼되 한꺼번에 많은 지표를 잡지 마세요(이탈 감소는 가장 강력하지만 가장 느립니다).'],
          ['STEP 2', '사용자가 되어 체험하고 시각적으로 기록한다', '신규 사용자를 모집해 관찰하거나 직접 체험합니다. “우리는 이미 안다”며 건너뛰지 마세요. 여정 지도는 팀이 함께 보는 공유 자료가 됩니다.'],
          ['STEP 3', '단계별 데이터를 모은다', '단계마다 이탈 규모를 보여주는 히스토그램(퍼널)을 만들어 어디에 집중할지 정합니다.'],
          ['STEP 4', '실험 백로그를 만든다', '퍼널 위에 아이디어를 얹고 GitHub·Trello 같은 도구에 <b>문제 · 가설 · 실험 · 지표</b>로 기록합니다.'],
          ['STEP 5', '우선순위를 정한다', '영향도(높음~낮음) × 실행 난이도(쉬움~어려움)로 그룹핑하고 첫 스프린트에 출시할 실험에 합의합니다.']
        ].map(([a, b, c]) => card(null, h('span', { class: 'tag' }, a), h('h4', { class: 'card-t', style: { margin: '8px 0 6px', fontSize: '16px' } }, b), h('p', { class: 'muted', style: { margin: 0 } }, c)))),
        H3('아이디어를 쓰는 틀'),
        table(['항목', '무엇을 쓰나', '예시'], [
          ['문제 (Problem)', '정성/정량 데이터에서 얻은 통찰', '가입 폼 전환율이 20%. 이탈자의 80%가 전화번호 칸에서 멈춘다.'],
          ['가설 (Hypothesis)', '일어날 일. 가능하면 수치로', '전화번호 칸을 없애면 전환율이 20% → 40%가 될 것이다.'],
          ['실험 (Experiment)', '설계. 원본·변형 스크린샷, 대상 비율', '트래픽 20%에 변형안 노출. 번역이 필요 없는 모든 대상.'],
          ['지표 (Metric)', '개선하려는 지표. <b>출시 전에 리포트를 먼저</b> 만든다', '측정 가능한지 미리 확인해야 설계를 조정할 수 있다.']
        ]),
        figure(grid5, '그림. 우선순위 그리드 (교재의 예시를 다시 그림). 오른쪽 위일수록 먼저 합니다.'),
        callout('tip', '다음 실습', '“실습하기”에서 5단계를 그대로 따라가며 나만의 퍼널과 우선순위 그리드를 그려 보세요.')
      ];
    },

    practice(ctx) {
      const root = h('div');
      ctx.ready(`c5/${ctx.me.id}`, (mine) => {
        const stages = (ST.arr(mine.funnel).length >= 2 ? ST.arr(mine.funnel) : DEF_STAGES).map((s) => ({ name: s.name, n: +s.n }));
        const ideas = ST.arr(mine.ideas).map((i) => ({ t: i.t, stage: +i.stage, prob: i.prob || '', hyp: i.hyp || '', imp: +i.imp || 5, ease: +i.ease || 5 }));
        let metric = mine.metric || METRICS[0], custom = mine.custom || '';
        let step = 0;
        const body = h('div');
        const tabs = h('div', { class: 'phases' });
        const NAMES = ['① 지표 고르기', '② 여정 지도', '③ 퍼널 데이터', '④ 아이디어 백로그', '⑤ 우선순위'];
        const save = () => { ctx.putMine('metric', metric); ctx.putMine('custom', custom); ctx.putMine('funnel', stages); ctx.putMine('ideas', ideas); ctx.done(); ST.toast('Sprint 0 저장 ✔'); };
        const go = (n) => { step = Math.max(0, Math.min(4, n)); draw(); };
        const nextBar = () => h('div', { class: 'pager', style: { marginTop: '16px' } }, ST.btn('← 이전', { onclick: () => go(step - 1), disabled: step === 0 }), h('div', { class: 'row' }, ST.btn('저장', { onclick: save }), step < 4 ? ST.btn('다음 →', { kind: 'primary', onclick: () => { save(); go(step + 1); } }) : ST.btn('저장하고 마치기', { kind: 'primary', onclick: save })));
        function funnelChart() {
          const items = stages.map((s, i) => ({ label: s.name.replace(/ /, '\n'), value: s.n, drop: i ? '-' + Math.round((1 - s.n / (stages[i - 1].n || 1)) * 100) + '%' : null, color: 'var(--blue)' }));
          let worst = -1, w = 0; items.forEach((it, i) => { if (i) { const d = 1 - stages[i].n / (stages[i - 1].n || 1); if (d > w) { w = d; worst = i; } } });
          if (worst >= 0) items[worst].color = 'var(--coral)';
          return { chart: C.vbars({ items, pins: ideas.map((i) => ({ at: Math.min(i.stage, stages.length - 1), label: i.t })), label: '퍼널' }), worst, w };
        }
        function draw() {
          tabs.childNodes.forEach((b, i) => { b.classList.toggle('on', i === step); b.classList.toggle('past', i < step); });
          ST.clear(body);
          if (step === 0) {
            const sg = ST.seg(METRICS.map((m) => ({ v: m, l: m })), metric, (v) => { metric = v; cu.hidden = v !== '직접 입력'; }, 'v');
            const cu = ST.text({ placeholder: '예) 무료체험 신청 후 7일 내 수강 시작률', value: custom, maxlength: 50, hidden: metric !== '직접 입력' });
            cu.addEventListener('input', () => { custom = cu.value; });
            body.appendChild(card('STEP 1. 개선할 핵심 지표 한 가지', h('p', { class: 'card-sub' }, '30~60일 안에 움직일 수 있는 의미 있는 지표를 하나만 고르세요. 처음부터 여러 개를 잡지 않는 게 원칙입니다.'), sg, h('div', { style: { marginTop: '10px' } }, cu), callout('tip', '', '유지(이탈 감소)는 가장 강력한 레버지만 가장 느립니다. 신생 팀은 빠르게 움직이는 지표로 동기를 만든 뒤 확장하세요.')));
          } else if (step === 1) {
            const list = h('div');
            const redraw = () => {
              ST.clear(list);
              stages.forEach((s, i) => { const t = ST.text({ value: s.name, maxlength: 18 }); t.addEventListener('input', () => { s.name = t.value; }); list.appendChild(h('div', { class: 'row', style: { marginBottom: '6px' } }, h('b', { class: 'mono' }, i + 1), t, ST.btn('삭제', { kind: 'sm ghost', disabled: stages.length <= 2, onclick: () => { stages.splice(i, 1); redraw(); } }))); });
              list.appendChild(ST.btn('+ 단계 추가', { kind: 'sm', disabled: stages.length >= 6, onclick: () => { stages.push({ name: '새 단계', n: Math.round(stages[stages.length - 1].n * 0.6) }); redraw(); } }));
              flowBox.innerHTML = ''; flowBox.appendChild(h('div', { class: 'flow' }, stages.map((s) => h('div', { class: 'st' }, s.name))));
            };
            const flowBox = h('div', { style: { marginTop: '14px' } });
            body.appendChild(card('STEP 2. 개선할 사용자 여정을 단계로 적기', h('p', { class: 'card-sub' }, '실제로 직접 체험하며 단계를 적어 보세요(2~6단계). 팀이 함께 보는 공유 지도가 됩니다.'), list, flowBox));
            redraw();
          } else if (step === 2) {
            const chartBox = h('div'), note = h('div');
            const rows = stages.map((s, i) => { const inp = h('input', { type: 'number', min: 0, value: s.n }); inp.addEventListener('input', () => { s.n = Math.max(0, +inp.value || 0); paint(); }); return h('div', { class: 'row', style: { marginBottom: '6px' } }, h('div', { style: { flex: '0 0 160px' } }, h('b', {}, s.name)), h('div', { style: { flex: '0 0 130px' } }, inp), h('span', { class: 'muted' }, i ? '' : '(시작 단계)')); });
            const paint = () => { ST.clear(chartBox); const f = funnelChart(); chartBox.appendChild(f.chart); ST.clear(note); if (f.worst > 0) note.appendChild(callout('warn', '가장 큰 이탈', `“${esc(stages[f.worst - 1].name)}” → “${esc(stages[f.worst].name)}” 구간에서 <b>${Math.round(f.w * 100)}%</b>가 떨어집니다. 여기부터 파고들어 보세요.`)); };
            body.appendChild(card('STEP 3. 단계별 사용자 수 (최근 한 달 등)', h('p', { class: 'card-sub' }, '실제 데이터 또는 추정치를 넣으면 히스토그램에 이탈률이 표시됩니다.'), rows, chartBox, note));
            paint();
          } else if (step === 3) {
            const f = funnelChart();
            const list = h('div');
            const t = ST.text({ placeholder: '실험 아이디어 제목 (예: 전화번호 칸 제거)', maxlength: 30 });
            const st = ST.select(stages.map((s, i) => ({ v: i, l: s.name })), 0);
            const pr = ST.area({ rows: 2, placeholder: '문제: 어떤 데이터/통찰이 있나? (예: 이탈자의 80%가 전화번호 칸에서 멈춘다)' });
            const hy = ST.area({ rows: 2, placeholder: '가설: 무엇을 바꾸면 무엇이 얼마나 달라질까? (예: 칸을 없애면 전환율 20%→40%)' });
            const chartBox = h('div', {}, f.chart);
            const redraw = () => {
              ST.clear(list);
              if (!ideas.length) list.appendChild(empty('아이디어를 1~5개 추가해 보세요.'));
              ideas.forEach((i, k) => list.appendChild(h('div', { class: 'idea' }, h('div', {}, h('h5', {}, i.t), h('p', {}, `[${esc(stages[Math.min(i.stage, stages.length - 1)].name)}] ${esc(i.hyp || i.prob || '')}`)), ST.btn('삭제', { kind: 'sm ghost', onclick: () => { ideas.splice(k, 1); redraw(); } }))));
              ST.clear(chartBox); chartBox.appendChild(funnelChart().chart);
            };
            body.appendChild(card('STEP 4. 퍼널 위에 아이디어 얹기', h('p', { class: 'card-sub' }, '아이디어를 어느 구간에 얹을지 고르고 문제·가설을 적으세요. 퍼널 위에 핀으로 표시됩니다.'), chartBox,
              h('div', { class: 'grid g2', style: { marginTop: '12px' } }, ST.field('제목', t), ST.field('어느 단계의 아이디어?', st)), ST.field('문제', pr), ST.field('가설', hy),
              ST.btn('+ 아이디어 추가', { kind: 'primary', disabled: false, onclick: () => { if (!t.value.trim()) return ST.toast('제목을 적어 주세요'); if (ideas.length >= 5) return ST.toast('최대 5개까지예요'); ideas.push({ t: t.value.trim(), stage: +st.value, prob: pr.value.trim(), hyp: hy.value.trim(), imp: 5, ease: 5 }); t.value = pr.value = hy.value = ''; redraw(); } }), h('div', { style: { marginTop: '12px' } }, list)));
            redraw();
          } else {
            const chartBox = h('div');
            const paint = () => {
              ST.clear(chartBox);
              chartBox.appendChild(C.scatter({ zones: [{ x0: 4, x1: 10, y0: 0, y1: 10, fill: 'var(--amber)', label: 'WAVE 2', op: .14 }, { x0: 0, x1: 4, y0: 0, y1: 10, fill: 'var(--ink3)', label: 'WAVE 3', op: .12 }, { x0: 6, x1: 10, y0: 5, y1: 10, fill: 'var(--green)', label: 'WAVE 1', op: .22 }], points: ideas.map((i, k) => ({ x: i.imp, y: i.ease, label: i.t, color: wave(i.imp, i.ease) === 1 ? 'var(--green)' : wave(i.imp, i.ease) === 2 ? 'var(--amber)' : 'var(--ink3)', r: 9 })), xLabel: '영향도 (낮음 → 높음)', yLabel: '실행 용이성 (어려움 → 쉬움)', label: '우선순위 그리드' }));
            };
            const sls = ideas.map((i) => h('div', { class: 'idea', style: { gridTemplateColumns: '1fr' } }, h('h5', {}, i.t), ST.slider({ label: '영향도', min: 1, max: 10, value: i.imp, onInput: (v) => { i.imp = v; paint(); } }), ST.slider({ label: '실행 용이성', min: 1, max: 10, value: i.ease, onInput: (v) => { i.ease = v; paint(); } })));
            body.appendChild(card('STEP 5. 영향도 × 실행 용이성', h('p', { class: 'card-sub' }, 'Wave 1 = 영향도 6 이상 & 용이성 5 이상 → 첫 스프린트 후보. Wave 3 = 영향도 4 미만 → 보류.'), ideas.length ? h('div', { class: 'grid g2' }, h('div', {}, sls), chartBox) : empty('먼저 ④단계에서 아이디어를 추가해 주세요.')));
            if (ideas.length) paint();
          }
          body.appendChild(nextBar());
        }
        NAMES.forEach((n, i) => tabs.appendChild(h('button', { type: 'button', onclick: () => go(i) }, n)));
        ST.clear(root); ST.add(root, [tabs, body]); draw();
      });
      return root;
    },

    together(ctx) {
      const root = h('div');
      ctx.watch('c5', (d) => {
        ST.clear(root);
        const ids = Object.keys(d).filter((u) => u !== 'q' && d[u] && d[u].funnel);
        const mc = {}; ids.forEach((u) => { const m = d[u].metric === '직접 입력' ? (d[u].custom || '직접 입력') : d[u].metric; mc[m] = (mc[m] || 0) + 1; });
        const L = Object.keys(mc).map((k) => ({ label: k, value: mc[k], color: 'var(--blue)' })).sort((a, b) => b.value - a.value);
        const conv = ids.map((u) => { const f = ST.arr(d[u].funnel); let w = 0, wi = 1; for (let i = 1; i < f.length; i++) { const dr = 1 - f[i].n / (f[i - 1].n || 1); if (dr > w) { w = dr; wi = i; } } return { u, total: f[0].n ? f[f.length - 1].n / f[0].n : 0, worst: `${f[wi - 1] ? f[wi - 1].name : ''}→${f[wi].name}`, w }; });
        root.appendChild(grid(2, card('우리가 고른 핵심 지표', L.length ? C.bars({ items: L, max: Math.max(1, ids.length), fmt: (v) => v + '명' }) : empty()),
          card('퍼널 전체 전환율 (처음→마지막)', conv.length ? C.bars({ items: conv.map((c) => ({ label: ST.nameOf(c.u), value: c.total * 100, text: (c.total * 100).toFixed(1) + '%', color: c.u === ctx.me.id ? 'var(--green)' : 'var(--blue)', hl: c.u === ctx.me.id })), max: 100, fmt: (v) => v.toFixed(0) + '%' }) : empty())));
        root.appendChild(card('가장 크게 새는 구간', conv.length ? h('div', { class: 'pill-row' }, conv.map((c) => h('span', { class: 'tag r', title: ST.nameOf(c.u) }, `${c.worst} (-${Math.round(c.w * 100)}%)`))) : empty()));
        const pts = []; ids.forEach((u, k) => ST.arr(d[u].ideas).forEach((i) => pts.push({ x: +i.imp, y: +i.ease, label: i.t, color: u === ctx.me.id ? 'var(--green)' : ST.PAL[(k + 1) % ST.PAL.length], r: u === ctx.me.id ? 10 : 7, title: `${i.t} · ${ST.nameOf(u)} (영향 ${i.imp}, 용이 ${i.ease})` })));
        root.appendChild(card('모두의 우선순위 그리드', pts.length ? [C.scatter({ zones: [{ x0: 4, x1: 10, y0: 0, y1: 10, fill: 'var(--amber)', label: 'WAVE 2', op: .14 }, { x0: 0, x1: 4, y0: 0, y1: 10, fill: 'var(--ink3)', label: 'WAVE 3', op: .12 }, { x0: 6, x1: 10, y0: 5, y1: 10, fill: 'var(--green)', label: 'WAVE 1', op: .22 }], points: pts, xLabel: '영향도', yLabel: '실행 용이성', h: 440, label: '모두의 아이디어' }), h('p', { class: 'muted' }, '초록 큰 점이 내 아이디어입니다. 점에 마우스를 올리면 제목과 작성자가 보여요.')] : empty()));
        const w1 = []; ids.forEach((u) => ST.arr(d[u].ideas).forEach((i) => { if (wave(+i.imp, +i.ease) === 1) w1.push({ u, ...i, s: +i.imp * +i.ease }); }));
        w1.sort((a, b) => b.s - a.s);
        root.appendChild(card('Wave 1 후보 — 첫 스프린트에 올릴 만한 아이디어', w1.length ? h('div', {}, w1.slice(0, 8).map((i) => h('div', { class: 'idea' }, h('div', {}, h('h5', {}, i.t), h('p', {}, (i.hyp || i.prob || '') + ' — ' + ST.nameOf(i.u))), h('div', { class: 'votes' }, i.s, h('small', {}, '영향×용이'))))) : empty('아직 Wave 1에 오른 아이디어가 없어요.')));
      });
      return root;
    },

    quiz: [
      { q: 'Sprint 0의 가장 중요한 산출물은?', opts: ['월간 리포트', '우선순위가 정해진 실험 백로그', '새 광고 캠페인', '조직도 개편안'], a: 1, why: 'Sprint 0에서 지표 선정 → 여정 지도 → 퍼널 → 아이디어 → 우선순위를 거쳐 실험 백로그와 첫 실험을 합의합니다.' },
      { q: '실험 아이디어를 쓸 때 “출시 전에” 먼저 해 두라고 한 일은?', opts: ['디자인 시안을 확정한다', '지표를 측정할 리포트/대시보드를 만든다', '경영진 보고를 마친다', '경쟁사 가격을 조사한다'], a: 1, why: '측정이 불가능하다는 사실을 출시 후에 알면 늦습니다. 먼저 리포트를 만들어 설계를 조정합니다.' },
      { q: '우선순위 그리드에서 가장 먼저 착수할 실험은?', opts: ['영향도 낮음 · 실행 어려움', '영향도 높음 · 실행 쉬움', '영향도 낮음 · 실행 쉬움', '영향도 높음 · 실행 어려움'], a: 1, why: '영향이 크고 빠르게 할 수 있는 Wave 1부터 시작해 동기와 배움을 만듭니다.' }
    ]
  });
})();
