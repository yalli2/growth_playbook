/* Chapter 6 · 그로스 잼 (실시간 브레인스토밍) */
(function () {
  const ST = window.ST, { h, P, H3, callout, ul, table, figure, card, grid, empty, esc, charts: C } = ST;
  const SZ = ['S', 'M', 'L', 'XL'];
  const PHASES = [
    { t: '프레이밍', s: '목표·제약·자원', min: 5 }, { t: '아이디어', s: '조용히·익명', min: 10 }, { t: '투표', s: '1인 3표·익명', min: 5 },
    { t: '반대 의견', s: 'filter-down', min: 10 }, { t: '실행 계획', s: '리드·장애물·기간', min: 20 }
  ];
  const FRAME = [
    ['obj', '목표 (Objective)', '예) 다음 90일 동안 무료체험 → 유료 전환을 끌어올린다'],
    ['kpi', '타깃 KPI와 기간', '예) 전환율 18% → 24%, 12주 안'],
    ['cons', '제약 조건', '예) 개발 공수 2주 이내 · 추가 예산 없음 · 브랜드 가이드 준수'],
    ['assets', '활용할 자산·자원', '예) 뉴스레터 3만 명, 고객 인터뷰 20건, 후기 영상, 체험 후 이메일 시퀀스']
  ];
  const IDEA_LIMIT = 2;
  ST.CH6 = { SZ, PHASES, IDEA_LIMIT };

  function safe(region, fn) {
    return () => {
      const a = document.activeElement;
      if (region.contains(a) && /INPUT|TEXTAREA|SELECT/.test(a.tagName)) {
        if (!region._hook) { region._hook = true; region.addEventListener('focusout', () => setTimeout(() => { if (region._pending && !region.contains(document.activeElement)) { region._pending = false; fn(); } }, 0)); }
        region._pending = true; return;
      }
      region._pending = false; fn();
    };
  }
  function tally(D) {
    const ideas = Object.keys(D.ideas || {}).map((id) => Object.assign({ id }, D.ideas[id])).sort((a, b) => (a.at || 0) - (b.at || 0));
    const votes = D.votes || {};
    const cnt = {}; Object.keys(votes).forEach((u) => ST.arr(votes[u]).forEach((id) => { cnt[id] = (cnt[id] || 0) + 1; }));
    ideas.forEach((i) => { i.v = cnt[i.id] || 0; });
    const rank = ideas.slice().sort((a, b) => b.v - a.v || (a.at || 0) - (b.at || 0));
    return { ideas, rank, top: rank.filter((i) => i.v > 0).slice(0, 3), voters: Object.keys(votes).filter((u) => ST.arr(votes[u]).length).length };
  }
  ST.CH6.tally = tally;

  ST.chapters.push({
    n: 6, key: 'c6', title: '그로스 잼', en: 'The Growth Jam', pages: 'p.76–88',
    tagline: '90분 안에 아이디어 백로그를 만들고 상위 3개를 합의하는 조용한 브레인스토밍. 이 챕터는 실제로 “잼”을 돌립니다.',
    chips: ['실시간 보드', '익명 투표', 'filter-down'],
    goal: '기존 팀에서 새 아이디어가 필요할 때 쓰는 1~2시간짜리 집중 브레인스토밍입니다. 발산(조용히·익명)과 수렴(투표·반대 의견·계획)을 직접 돌려 보세요.',

    learn() {
      const diverge = ST.fromSvg(`<svg viewBox="0 0 640 150" role="img" aria-label="발산과 수렴"><style>.t{font:700 13px 'Noto Sans KR';fill:var(--ink)}.s{font:500 12px 'Noto Sans KR';fill:var(--ink2)}</style>
        <path d="M20 75 L300 15 L300 135 Z" style="fill:var(--blue-l);stroke:var(--blue)" stroke-width="2"/><path d="M620 75 L340 15 L340 135 Z" style="fill:var(--green-l);stroke:var(--green)" stroke-width="2"/>
        <text class="t" x="190" y="78" text-anchor="middle">① 발산 — 아이디어</text><text class="s" x="190" y="98" text-anchor="middle">조용히 · 익명 · 평가 금지</text>
        <text class="t" x="470" y="78" text-anchor="middle">② 수렴 — 해결</text><text class="s" x="470" y="98" text-anchor="middle">투표 · 반대 의견 · 계획</text></svg>`);
      return [
        P('Sprint 0은 새로 시작하는 팀에게 알맞습니다. 이미 굴러가는 팀이 새 아이디어로 <b>전체 성장 또는 특정 목표</b>를 밀어 올려야 할 때는 <b>그로스 잼</b>을 씁니다. 1~2시간의 집중 브레인스토밍으로 아이디어 백로그를 만들고 상위 아이디어를 우선순위화합니다. 게다가 재미있습니다.'),
        figure(diverge, '그림. 전반부는 발산(아이디어 쏟기), 후반부는 수렴(합의·구체화). 최고의 세션은 보통 90분 이상입니다.'),
        H3('프레이밍 — 가장 중요한 사전 준비'),
        ul(['<b>아주 구체적인 목표</b>와 개선할 <b>타깃 KPI·기간</b>', '<b>제약 조건</b> — 사람들은 경계를 모른 채 브레인스토밍하기 쉽습니다.', '팀이 활용할 수 있는 <b>자산·자원</b> 목록 — 성장 리더는 다른 사일로가 못 보는 기회를 압니다.']),
        P('프레임 밖의 아이디어도 나올 수 있지만, <b>투표할 때는</b> 목표와 제약에 맞는 아이디어에 투표하도록 안내합니다.'),
        H3('사전 작업(Pre-work)이 효과를 만든다'),
        P('브레인스토밍은 혼자 생각할 시간이 있을 때 더 잘 됩니다. 협업 문서(Box Note·Google Docs)를 만들어 <b>24~48시간 전</b>에 안건과 프레임을 보내고 아이디어를 미리 적게 하세요. 그래도 현장에서 쓰는 사람이 있으니 <b>조용한 브레인스토밍 시간</b>을 둡니다.'),
        H3('진행 순서'),
        table(['단계', '할 일', '핵심 규칙'], [
          ['아이디어 쓰기', '틀에 맞춰 적는다 — 제목·설명·<b>구현 시간</b>·<b>매출(또는 KPI) 영향 크기</b>', '조용히, 가능하면 익명. 티셔츠 사이즈/피보나치로 대략 크기만. 인원이 많으면 1인 1아이디어.'],
          ['명확화 질문', '모두가 읽고 질문', '해결책을 논하지 않고 “이해”만. 해결로 새면 되돌립니다.'],
          ['투표 (filter-up)', '1인 3표(상황에 맞게)', '“제일 멋진 아이디어”가 아니라 <b>목표·제약에 가장 잘 맞는</b> 아이디어. 조용히·익명으로.'],
          ['반대 의견 (filter-down)', '상위 아이디어에 강하게 반대하는 사람?', '안 되는 이유·실행 불가 이유를 드러내고 합의를 다집니다. 전원 찬성은 필수가 아니지만 결정 후엔 모두 지원.'],
          ['실행 계획', '상위 아이디어마다 리드·도울 사람·장애물·세부사항·중단할 것·기간', '“조직이 아니라 사람 이름”. 이제 비판·해결책을 마음껏 내도 됩니다.']
        ]),
        H3('90분 진행 예시'),
        table(['시간', '내용'], [['5분', '프레이밍 설명'], ['10분', '조용한 아이디어 작성'], ['10분', '명확화 질문'], ['5분', '투표 (1인 3표)'], ['10분', '상위 아이디어 선정 + 반대 의견'], ['40분', '구체화 — 리드·지원·장애물·세부·중단·기간'], ['10분', '정리 — 다시 모일 시점 합의']]),
        callout('tip', '지금 해 보기', '“실습하기” 탭이 바로 그로스 잼 보드입니다. 한 사람이 진행자가 되어 단계 버튼으로 세션을 이끌어 보세요. 투표 수는 3단계 전까지 비공개입니다.')
      ];
    },

    practice(ctx) {
      const root = h('div');
      let D = {};
      const me = ctx.me.id;
      const phaseBar = h('div', { class: 'phases' }), timerBox = h('div'), frameBox = h('div'), ideaBox = h('div'), topBox = h('div'), planBox = h('div');
      let phase = 0, secs = null, tmr = null, run = false;
      const fmtT = (s) => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
      const timerOut = h('div', { class: 'timer' }, '--:--');
      function resetTimer() { clearInterval(tmr); run = false; secs = PHASES[phase].min * 60; timerOut.textContent = fmtT(secs); startBtn.textContent = '▶ 시작'; }
      const startBtn = ST.btn('▶ 시작', { onclick: () => { if (run) { clearInterval(tmr); run = false; startBtn.textContent = '▶ 계속'; return; } run = true; startBtn.textContent = '⏸ 멈춤'; tmr = setInterval(() => { secs = Math.max(0, secs - 1); timerOut.textContent = fmtT(secs); if (!secs) { clearInterval(tmr); run = false; startBtn.textContent = '▶ 시작'; ST.toast('⏰ 시간이 끝났어요'); } }, 1000); } });
      ctx.onLeave(() => clearInterval(tmr));
      timerBox.appendChild(card('진행 도우미 (이 화면에서만 보이는 타이머)', h('div', { class: 'row' }, timerOut, startBtn, ST.btn('↺', { onclick: resetTimer }))));
      PHASES.forEach((p, i) => phaseBar.appendChild(h('button', { type: 'button', onclick: () => { ctx.put('phase', i); } }, `${i + 1}. ${p.t}`, h('small', {}, p.s))));
      const rPhase = () => { Array.from(phaseBar.children).forEach((b, i) => { b.classList.toggle('on', i === phase); b.classList.toggle('past', i < phase); }); };

      /* ① 프레이밍 */
      const rFrame = safe(frameBox, () => {
        ST.clear(frameBox);
        const f = D.frame || {};
        const inputs = FRAME.map(([k, l, ph]) => { const t = ST.area({ rows: 2, placeholder: ph, value: f[k] || '', maxlength: 160 }); t.addEventListener('change', () => ctx.put('frame/' + k, t.value.trim())); return ST.field(l, t); });
        frameBox.appendChild(card('① 프레이밍 — 이번 잼의 목표와 경계', h('p', { class: 'card-sub' }, '누구나 입력하면 모두의 화면에 반영됩니다. 한 사람(진행자)이 채우는 것을 권장해요.'), h('div', { class: 'grid g2', style: { marginBottom: 0 } }, inputs)));
      });

      /* ② 아이디어 + ③ 투표 */
      const rIdeas = safe(ideaBox, () => {
        ST.clear(ideaBox);
        const T = tally(D), mineIdeas = T.ideas.filter((i) => i.by === me), myVotes = ST.arr((D.votes || {})[me]);
        const canAdd = phase <= 1 && mineIdeas.length < IDEA_LIMIT;
        const t = ST.text({ placeholder: '아이디어 제목', maxlength: 34 }), d = ST.area({ rows: 2, placeholder: '어떻게? 왜 효과가 있을까? (한두 문장)', maxlength: 160 });
        const tm = ST.seg(SZ.map((s) => ({ v: s, l: s })), 'M'), sz = ST.seg(SZ.map((s) => ({ v: s, l: s })), 'M');
        const form = h('div', { class: 'grid g2' }, h('div', {}, ST.field('제목', t), ST.field('설명', d)), h('div', {}, h('p', { class: 'fld-l' }, '구현 시간 (S 빠름 ~ XL 오래)'), tm, h('p', { class: 'fld-l', style: { marginTop: '10px' } }, 'KPI 영향 크기 (S 작음 ~ XL 큼)'), sz));
        const add = ST.btn('+ 익명으로 올리기', { kind: 'primary', disabled: !canAdd, onclick: () => { if (!t.value.trim()) return ST.toast('제목을 적어 주세요'); const id = ST.uid(); ctx.put('ideas/' + id, { t: t.value.trim(), d: d.value.trim(), time: tm.get(), size: sz.get(), by: me, at: Date.now() }); ctx.done(); } });
        const list = h('div');
        const T2 = phase >= 3 ? T.rank : T.ideas;
        if (!T2.length) list.appendChild(empty('아직 올라온 아이디어가 없어요.'));
        T2.forEach((i) => {
          const voted = myVotes.includes(i.id), top = phase >= 3 && T.top.some((x) => x.id === i.id);
          const btn = ST.btn(voted ? '✔ 투표함' : '투표', { kind: 'sm ' + (voted ? 'primary' : ''), disabled: phase !== 2 || (!voted && myVotes.length >= 3), onclick: () => { const nv = voted ? myVotes.filter((x) => x !== i.id) : myVotes.concat(i.id); ctx.put('votes/' + me, nv); ctx.done(); } });
          list.appendChild(h('div', { class: 'idea' + (top ? ' top' : '') + (voted ? ' voted' : '') }, h('div', {}, h('h5', {}, i.t, i.by === me ? h('span', { class: 'me-badge' }, '내 아이디어') : null), h('p', {}, i.d || ''), h('p', { style: { marginTop: '4px' } }, h('span', { class: 'tag' }, '구현 ' + i.time), h('span', { class: 'tag g' }, '영향 ' + i.size))),
            h('div', {}, phase >= 3 ? h('div', { class: 'votes' }, i.v, h('small', {}, '표')) : null, btn)));
        });
        ideaBox.appendChild(card('② 아이디어 쓰기 → ③ 투표', h('p', { class: 'card-sub' }, `1인 ${IDEA_LIMIT}개까지, 작성자는 화면에 보이지 않아요(익명). 투표는 2단계에서 1인 3표 — 내 표 ${myVotes.length}/3 · 투표 완료 ${T.voters}명. 투표 수는 3단계부터 공개됩니다.`), phase <= 1 ? [form, add, h('p', { class: 'muted' }, canAdd ? '' : '이번 단계에서 더 올릴 수 없어요(개수 제한 또는 단계 종료).')] : h('p', { class: 'muted' }, '아이디어 작성은 1단계에서 마감됩니다.'), h('div', { style: { marginTop: '14px' } }, list)));
      });

      /* ④ 반대 의견 */
      const rTop = safe(topBox, () => {
        ST.clear(topBox);
        const T = tally(D);
        if (phase < 3) return;
        const myDis = (D.dis || {})[me] || {};
        const body = T.top.length ? T.top.map((i) => {
          const cur = myDis[i.id] && myDis[i.id].v;
          const all = Object.keys(D.dis || {}).map((u) => (D.dis[u][i.id] || {}).v).filter(Boolean);
          const why = ST.text({ placeholder: '이유(선택)', value: (myDis[i.id] && myDis[i.id].r) || '', maxlength: 60 });
          const set = (v) => { ctx.put(`dis/${me}/${i.id}`, { v, r: why.value.trim() }); ctx.done(); };
          why.addEventListener('change', () => { if (cur) set(cur); });
          return h('div', { class: 'idea top', style: { gridTemplateColumns: '1fr' } }, h('div', {}, h('h5', {}, '🏆 ' + i.t + ' — ' + i.v + '표'), h('p', {}, i.d || '')), ST.seg([{ v: 'agree', l: '👍 동의' }, { v: 'cond', l: '🤔 조건부' }, { v: 'against', l: '✋ 반대' }], cur || null, set), why,
            h('p', { class: 'rate' }, `동의 ${all.filter((v) => v === 'agree').length} · 조건부 ${all.filter((v) => v === 'cond').length} · 반대 ${all.filter((v) => v === 'against').length}`));
        }) : [empty('투표 결과가 아직 없어요. 2단계에서 투표해 주세요.')];
        topBox.appendChild(card('④ 상위 아이디어와 반대 의견 (filter-down)', h('p', { class: 'card-sub' }, '상위 3개 아이디어에 대한 내 입장을 표시하세요. 모두가 동의할 필요는 없지만, 결정이 나면 함께 지원합니다.'), body));
      });

      /* ⑤ 실행 계획 */
      const rPlan = safe(planBox, () => {
        ST.clear(planBox);
        if (phase < 4) return;
        const T = tally(D);
        const F = [['lead', '리드(사람 이름)'], ['help', '도울 사람'], ['block', '알려진 장애물'], ['detail', '중요한 세부사항'], ['stop', '이를 위해 멈출 일'], ['when', '잠정 일정']];
        const body = T.top.length ? T.top.map((i) => { const p = (D.plan || {})[i.id] || {}; return h('div', { class: 'idea', style: { gridTemplateColumns: '1fr', alignItems: 'start' } }, h('h5', {}, '🏆 ' + i.t), h('div', { class: 'grid g2', style: { margin: 0 } }, F.map(([k, l]) => { const t = ST.text({ value: p[k] || '', placeholder: l, maxlength: 60 }); t.addEventListener('change', () => { ctx.put(`plan/${i.id}/${k}`, t.value.trim()); ctx.done(); }); return ST.field(l, t); }))); }) : [empty('상위 아이디어가 아직 없어요.')];
        planBox.appendChild(card('⑤ 실행 계획 — 이제 비판도 해결도 마음껏', h('p', { class: 'card-sub' }, '이름을 적는 순간 계획이 진짜가 됩니다. “팀”이 아니라 “사람”으로.'), body));
      });

      function renderAll() {
        phase = +D.phase || 0; rPhase(); if (secs == null) resetTimer();
        rFrame(); rIdeas(); rTop(); rPlan();
      }
      let lastPhase = -1;
      ctx.watch('c6', (d) => { D = d || {}; if ((+D.phase || 0) !== lastPhase) { lastPhase = +D.phase || 0; phase = lastPhase; resetTimer(); } renderAll(); });
      ST.add(root, [phaseBar, timerBox, frameBox, ideaBox, topBox, planBox]);
      return root;
    },

    together(ctx) {
      const root = h('div');
      let peek = false, D0 = {};
      const draw = () => {
        const D = D0;
        ST.clear(root);
        const phase = +D.phase || 0, T = tally(D), show = phase >= 3 || peek;
        root.appendChild(h('div', { class: 'metric-row' },
          h('div', { class: 'metric' }, h('b', {}, T.ideas.length), h('span', {}, '쌓인 아이디어')), h('div', { class: 'metric' }, h('b', {}, T.voters), h('span', {}, '투표 완료')), h('div', { class: 'metric' }, h('b', {}, `${phase + 1}/5`), h('span', {}, PHASES[phase].t + ' 단계'))));
        if (!show) {
          root.appendChild(card('잼 리포트', h('p', { class: 'p' }, '투표 결과는 3단계(반대 의견)부터 공개됩니다. 실습하기 탭에서 진행자가 단계를 넘기면 이 화면이 채워져요.'), ST.btn('결과 미리 보기 (이 화면에서만)', { onclick: () => { peek = true; draw(); } })));
          return;
        }
        root.appendChild(grid(2,
          card('득표 순위', T.rank.length ? C.bars({ items: T.rank.map((i, k) => ({ label: (k < 3 && i.v ? '🏆 ' : '') + i.t, value: i.v, color: k < 3 && i.v ? 'var(--amber)' : 'var(--blue)', hl: k < 3 && i.v })), max: Math.max(1, T.rank[0].v), fmt: (v) => v + '표' }) : empty()),
          card('아이디어 지도 — 구현 시간 × 영향 크기', T.ideas.length ? C.scatter({ xmin: 0.5, xmax: 4.5, ymin: 0.5, ymax: 4.5, points: T.ideas.map((i, k) => ({ x: SZ.indexOf(i.time) + 1 + (k % 3) * 0.12 - 0.12, y: SZ.indexOf(i.size) + 1 + ((k + 1) % 3) * 0.12 - 0.12, r: 6 + i.v * 2.2, color: T.top.some((x) => x.id === i.id) ? 'var(--amber)' : 'var(--blue)', label: i.t, title: `${i.t} · ${i.v}표` })), zones: [{ x0: 0.5, x1: 2.5, y0: 2.5, y1: 4.5, fill: 'var(--green)', label: '빠르고 큰 효과', op: .13 }], xLabel: '구현 시간 (1=S … 4=XL)', yLabel: '영향 크기 (1=S … 4=XL)', h: 380, label: '아이디어 지도' }) : empty())));
        const dis = D.dis || {};
        root.appendChild(card('상위 아이디어의 합의 정도', T.top.length ? C.stack({ items: T.top.map((i) => { const all = Object.keys(dis).map((u) => (dis[u][i.id] || {}).v).filter(Boolean); return { label: i.t, parts: [{ v: all.filter((v) => v === 'agree').length, name: '동의', color: 'var(--green)' }, { v: all.filter((v) => v === 'cond').length, name: '조건부', color: 'var(--amber)' }, { v: all.filter((v) => v === 'against').length, name: '반대', color: 'var(--coral)' }] }; }), legend: [{ name: '동의', color: 'var(--green)' }, { name: '조건부', color: 'var(--amber)' }, { name: '반대', color: 'var(--coral)' }] }) : empty()));
        const plans = T.top.filter((i) => (D.plan || {})[i.id]);
        root.appendChild(card('실행 계획 카드', plans.length ? h('div', { class: 'wall' }, plans.map((i) => { const p = D.plan[i.id]; return h('div', { class: 'note' }, h('b', {}, i.t), h('br'), `리드: ${p.lead || '–'}`, h('br'), `도움: ${p.help || '–'}`, h('br'), `장애물: ${p.block || '–'}`, h('br'), `멈출 일: ${p.stop || '–'}`, h('br'), `일정: ${p.when || '–'}`); })) : empty('아직 작성된 계획이 없어요.')));
      };
      ctx.watch('c6', (d) => { D0 = d || {}; draw(); });
      return root;
    },

    quiz: [
      { q: '그로스 잼에서 아이디어 작성과 투표를 “조용히, 가능하면 익명으로” 하는 이유는?', opts: ['시간을 줄이기 위해', '집단사고와 “직급이 높은 사람의 아이디어 선택”을 줄이기 위해', '회의록을 쓰지 않기 위해', '투표 결과를 숨기기 위해'], a: 1, why: '직급 영향·집단사고를 줄여 다양한 아이디어가 공정하게 평가되도록 합니다.' },
      { q: '프레이밍에 포함시키라고 한 세 가지는?', opts: ['예산·인원·장소', '목표(KPI·기간)·제약 조건·활용할 자산', '참석자 명단·간식·시간', '경쟁사·가격·로고'], a: 1, why: '구체적 목표와 경계(제약), 그리고 쓸 수 있는 자산을 먼저 주어야 아이디어가 실행 가능해집니다.' },
      { q: '상위 아이디어마다 “리드”를 정할 때의 원칙은?', opts: ['부서 이름을 적는다', '팀 전체를 적는다', '사람의 이름을 적는다', '나중에 정한다'], a: 2, why: '조직이나 팀이 아니라 구체적인 사람 이름을 적어야 실행이 시작됩니다.' }
    ]
  });
})();
