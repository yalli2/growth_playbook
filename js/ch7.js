/* Chapter 7 · 애자일로 계속 움직이기 — 실험 칸반 */
(function () {
  const ST = window.ST, { h, P, H3, callout, ul, table, figure, card, grid, empty, esc, charts: C } = ST;
  const COLS = [
    { t: '아이스박스', d: '더 살펴볼 아이디어' }, { t: '백로그', d: '이번 스프린트 후보' }, { t: '진행 중', d: '만드는 중 (1인 WIP ≤ 3)' },
    { t: '테스트', d: '검수·리뷰' }, { t: '실행 중 (Running)', d: '출시됨 · 데이터 수집' }, { t: '완료', d: '분석 끝 · 배움 기록' }
  ];
  const STAGES = ['방문', '가입 조회', '계정 생성', '설정', '사용', '유료 전환', '유지'];
  const WIP = 3;
  const RES = { win: ['🟢 성공', 'var(--green)'], flat: ['⚪ 변화 없음', 'var(--ink3)'], lose: ['🔴 실패(배움)', 'var(--coral)'] };
  ST.CH7 = { COLS, STAGES, RES };

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
  const cardsOf = (D) => Object.keys(D.cards || {}).map((id) => Object.assign({ id }, D.cards[id])).sort((a, b) => (a.at || 0) - (b.at || 0));

  ST.chapters.push({
    n: 7, key: 'c7', title: '애자일로 계속 움직이기', en: 'Keep It Moving — The Ongoing Agile Process', pages: 'p.89–103',
    tagline: '기존 스프린트에 딱 세 가지만 더하면 됩니다 — 실험 카드, Running 열, 배움의 기록.',
    chips: ['실험 칸반', 'WIP 제한', '배움 아카이브'],
    goal: '백로그가 생기면 이제 실험을 출시하고 계속 개선합니다. 이미 있는 애자일 프로세스에 가벼운 변화 세 가지를 얹고, 우리 반 공용 칸반 보드에서 실험 카드를 직접 굴려 봅니다.',

    learn() {
      const board = h('div', { class: 'flow amber' }, ['아이스박스', '백로그', '진행 중', '테스트', 'Running ★', '완료'].map((s) => h('div', { class: 'st' }, s)));
      const loop = h('div', { class: 'loop' }, [['Launch', '백로그의 첫 실험 묶음을 출시한다'], ['Monitor', '실행 중인 실험이 결론 낼 만큼 데이터가 쌓였는지 확인'], ['Plan', '학습과 임의 분석으로 다음 실험을 계획, 아이스박스·백로그 채우기'], ['Playback', '결과를 성공이든 실패든 팀에 공유하고 기록']].map(([a, b]) => h('div', {}, h('b', {}, a), h('span', {}, b))));
      const ex = card('실험 카드 예시 (교재의 “바운스백 넛지”를 요약)', table(['항목', '내용'], [
        ['제목', '바운스백 넛지'], ['통찰', '가입한 사용자의 20%가 한 번도 로그인하지 않고 떠난다.'], ['가설', '가입 후 48시간 내 미로그인 사용자에게 시작 가이드+로그인 링크 메일을 보내면 이탈이 20% → 10%로 줄 것이다.'],
        ['실험 설계', '대상: 계정 생성 후 48시간 동안 로그인하지 않은 영어 브라우저 사용자. 가능하면 시안 이미지 첨부.'], ['타깃 지표', '계정 생성 → 로그인 전환율 (측정 리포트는 출시 전에 먼저 만든다)']]));
      return [
        P('이제 백로그가 있으니 실험을 출시하고 반복합니다. 이미 마케팅·제품 팀이 쓰는 애자일에 합류한다면, <b>가벼운 변화 세 가지</b>만 더하면 됩니다.'),
        ol(['스프린트에 <b>실험 작업(카드)</b>을 포함한다', '진행 중인 실험을 보여 주는 <b>“Running” 열</b>을 추가한다', '<b>배움을 공유하고 기록</b>한다 (플레이백과 아카이브)']),
        H3('애자일 아주 간단 요약'),
        grid(3, card('Focus', h('p', { class: 'muted', style: { margin: 0 } }, '진행 중인 일(WIP)을 제한할수록 더 많이 끝냅니다.')), card('Prioritization', h('p', { class: 'muted', style: { margin: 0 } }, '가장 중요하고 영향이 큰 일부터.')), card('Adjust', h('p', { class: 'muted', style: { margin: 0 } }, '배우거나 새 일이 생기면 우선순위를 조정합니다.'))),
        P('스프린트는 보통 1~2주이며 기간 중에는 새 일을 가져오지 않는 것이 원칙입니다(예외는 있음). 백로그는 중요도순으로 정렬하고, 담당자는 한 번에 1~3개의 “진행 중” 작업만 끌어옵니다.'),
        table(['의식(Ceremony)', '무엇을 하나'], [['스프린트 계획', '백로그 우선순위를 정하고 이번 스프린트의 일을 정한다'], ['데일리 스탠드업', '어제 한 일 · 오늘 할 일 · 막힌 일 — 상세 보고가 아니다'], ['회고/플레이백', '끝낸 일을 보여 주고(데모 환영) 잘 된 것·안 된 것을 나눈다']]),
        H3('① 실험 카드를 스프린트에 넣는다'),
        P('카드는 <b>제목 · 통찰 · 가설 · 실험 설계 · 타깃 지표</b> 다섯 가지를 담습니다. 디자인·개발 작업과 같은 보드에 올려야 가시성과 자원 확보가 됩니다.'),
        ex,
        H3('② “Running” 열 추가'),
        figure(board, '그림. 칸반 열: 아이스박스(검토할 아이디어) → 백로그(단기 계획) → 진행 중 → 테스트 → ★Running(출시되어 결과 대기) → 완료'),
        ul(['<b>겹치거나 충돌하는 실험</b>의 동시 출시를 막아 줍니다. (예: 가입 폼에서 실험이 돌고 있으면 같은 폼의 새 실험은 대기)', '“테스트를 돌렸다”에서 끝나지 않도록, <b>분석을 해야 한다는 사실을 상기</b>시킵니다. 학습은 분석에서 나옵니다.']),
        H3('③ 배움을 공유하고 기록한다'),
        P('배운 것을 혼자 갖고 있으면 최선의 경우 암묵지, 최악의 경우 담당자가 떠나며 사라집니다. 완료된 실험은 <b>스프린트 플레이백에서 성공이든 실패든 공유</b>하고, 위키/DB에 <b>짧게</b> 남깁니다. 형식은 “무엇을 바꿨나 + 결과 한 줄” (예: 행동 유도 문구 변경 → 전환 50%↑)이면 충분합니다.'),
        H3('Sprint 1~N : 반복'),
        figure(loop, '그림. Launch → Monitor → Plan → Playback을 계속 돌립니다.'),
        callout('tip', '지금 해 보기', '“실습하기”의 칸반 보드는 반 전체가 같이 쓰는 보드입니다. 카드를 만들고 열 사이로 옮겨 보세요. 진행 중 3개를 넘기면 경고가 나오고, 같은 단계 실험이 Running에서 겹치면 충돌 표시가 뜹니다.')
      ];
      function ol(items) { return h('ol', { class: 'ul' }, items.map((i) => h('li', { html: i }))); }
    },

    practice(ctx) {
      const root = h('div');
      let D = {}; const me = ctx.me.id;
      const finishing = new Set();
      const boardBox = h('div'), formBox = h('div'), standBox = h('div');

      const conflicts = (cards) => { const run = cards.filter((c) => +c.col === 4); const by = {}; run.forEach((c) => { (by[c.stage] = by[c.stage] || []).push(c.id); }); const bad = new Set(); Object.values(by).forEach((a) => { if (a.length > 1) a.forEach((x) => bad.add(x)); }); return bad; };
      function move(c, to, cards) {
        to = Math.max(0, Math.min(5, to));
        if (to === 2) { const mineWip = cards.filter((x) => +x.col === 2 && x.by === c.by && x.id !== c.id).length; if (mineWip >= WIP) return ST.toast(`${ST.nameOf(c.by)}님의 “진행 중”이 ${WIP}개예요. 먼저 끝내거나 옮겨 주세요.`); }
        if (to === 4) { const same = cards.filter((x) => +x.col === 4 && x.stage === c.stage && x.id !== c.id); if (same.length) ST.toast(`⚠️ 같은 단계(${c.stage})에서 이미 실행 중인 실험이 있어요 — 결과가 섞일 수 있어요.`); }
        if (to === 5) { finishing.add(c.id); rBoard(); return; }
        ctx.put(`cards/${c.id}/col`, to); ctx.done();
      }
      const rBoard = safe(boardBox, () => {
        ST.clear(boardBox);
        const cards = cardsOf(D), bad = conflicts(cards);
        const wrap = h('div', { class: 'kanban' });
        COLS.forEach((col, ci) => {
          const items = cards.filter((c) => +c.col === ci);
          const over = ci === 2 && Object.values(items.reduce((m, c) => { m[c.by] = (m[c.by] || 0) + 1; return m; }, {})).some((n) => n > WIP);
          const colEl = h('div', { class: 'kcol' + (ci === 4 ? ' run' : '') + (over ? ' over' : '') }, h('h4', {}, col.t, h('span', {}, items.length)), h('div', { class: 'muted', style: { fontSize: '11.5px', margin: '-4px 0 8px' } }, col.d));
          items.forEach((c) => {
            if (finishing.has(c.id)) {
              let res = 'win';
              const sg = ST.seg(Object.keys(RES).map((k) => ({ v: k, l: RES[k][0] })), res, (v) => { res = v; });
              const lr = ST.area({ rows: 2, placeholder: '배운 점 한 줄 — 무엇을 바꿨고 결과가 어땠나', maxlength: 120 });
              colEl.appendChild(h('div', { class: 'kcard' }, h('b', {}, c.t), sg, lr, h('div', { class: 'row', style: { marginTop: '6px' } }, ST.btn('기록하고 완료', { kind: 'sm primary', onclick: () => { if (!lr.value.trim()) return ST.toast('배움을 한 줄 적어 주세요 (실패여도 OK!)'); ctx.put(`cards/${c.id}`, Object.assign({}, D.cards[c.id], { col: 5, result: res, learn: lr.value.trim(), doneAt: Date.now() })); finishing.delete(c.id); ctx.done(); } }), ST.btn('취소', { kind: 'sm ghost', onclick: () => { finishing.delete(c.id); rBoard(); } }))));
              return;
            }
            colEl.appendChild(h('div', { class: 'kcard' + (bad.has(c.id) ? ' warn' : '') },
              h('b', {}, c.t), c.hyp ? h('div', {}, c.hyp) : null,
              h('div', { class: 'm' }, h('span', {}, h('span', { class: 'tag' }, c.stage), ST.nameOf(c.by)), c.result ? h('span', { class: 'tag ' + (c.result === 'win' ? 'g' : c.result === 'lose' ? 'r' : 'a') }, RES[c.result][0]) : h('span', { class: 'mv' }, ci > 0 ? h('button', { type: 'button', 'aria-label': '왼쪽 열로', onclick: () => move(c, ci - 1, cards) }, '◀') : null, ci < 5 ? h('button', { type: 'button', 'aria-label': '오른쪽 열로', onclick: () => move(c, ci + 1, cards) }, '▶') : null)),
              bad.has(c.id) ? h('div', { class: 'tag r', style: { marginTop: '6px' } }, '⚠ 같은 단계 충돌') : null,
              c.learn ? h('div', { class: 'why' }, '💡 ' + c.learn) : null,
              c.by === me && ci !== 5 ? h('div', { style: { marginTop: '4px' } }, h('button', { type: 'button', class: 'btn sm ghost', onclick: () => { ctx.put('cards/' + c.id, null); } }, '삭제')) : null));
          });
          wrap.appendChild(colEl);
        });
        boardBox.appendChild(card('공용 실험 칸반', h('p', { class: 'card-sub' }, `반 전체가 함께 쓰는 보드입니다. ◀ ▶ 로 카드를 옮기세요. “진행 중”은 1인 ${WIP}개까지, 완료로 옮길 땐 배움을 한 줄 남겨야 합니다.`), wrap));
      });

      const rForm = safe(formBox, () => {
        ST.clear(formBox);
        const t = ST.text({ placeholder: '제목 (예: 바운스백 넛지)', maxlength: 30 }), ins = ST.area({ rows: 2, placeholder: '통찰: 어떤 데이터/관찰에서 나왔나', maxlength: 120 }), hyp = ST.area({ rows: 2, placeholder: '가설: 무엇을 바꾸면 지표가 어떻게 달라질까', maxlength: 120 }), des = ST.area({ rows: 2, placeholder: '실험 설계: 대상·방법·비율', maxlength: 120 }), met = ST.text({ placeholder: '타깃 지표 (예: 계정 생성→로그인 전환율)', maxlength: 50 });
        const st = ST.select(STAGES, '가입 조회'), col = ST.select([{ v: 0, l: '아이스박스' }, { v: 1, l: '백로그' }], 1);
        formBox.appendChild(card('실험 카드 만들기', h('div', { class: 'grid g2', style: { marginBottom: 0 } }, h('div', {}, ST.field('제목', t), ST.field('통찰', ins), ST.field('가설', hyp)), h('div', {}, ST.field('실험 설계', des), ST.field('타깃 지표', met), h('div', { class: 'row' }, ST.field('어느 단계', st), ST.field('시작 열', col)))),
          ST.btn('+ 카드 올리기', { kind: 'primary', onclick: () => { if (!t.value.trim() || !hyp.value.trim()) return ST.toast('제목과 가설은 꼭 필요해요'); ctx.put('cards/' + ST.uid(), { t: t.value.trim(), insight: ins.value.trim(), hyp: hyp.value.trim(), design: des.value.trim(), metric: met.value.trim(), stage: st.value, col: +col.value, by: me, at: Date.now() }); ctx.done(); ST.toast('카드를 올렸어요 ✔'); } })));
      });

      const rStand = safe(standBox, () => {
        ST.clear(standBox);
        const y = ST.text({ placeholder: '어제 한 일', maxlength: 60 }), t = ST.text({ placeholder: '오늘 할 일', maxlength: 60 }), b = ST.text({ placeholder: '막힌 일 (없으면 비워 두세요)', maxlength: 60 });
        const posts = Object.keys(D.stand || {}).map((id) => D.stand[id]).sort((a, c) => (c.at || 0) - (a.at || 0)).slice(0, 6);
        standBox.appendChild(card('데일리 스탠드업 (3문장만)', h('div', { class: 'grid g3', style: { marginBottom: '10px' } }, ST.field('어제', y), ST.field('오늘', t), ST.field('막힘', b)), ST.btn('스탠드업 올리기', { kind: 'primary', onclick: () => { if (!y.value.trim() && !t.value.trim()) return ST.toast('한 줄이라도 적어 주세요'); ctx.put('stand/' + ST.uid(), { u: me, y: y.value.trim(), t: t.value.trim(), b: b.value.trim(), at: Date.now() }); ctx.done(); } }),
          posts.length ? h('div', { class: 'wall', style: { marginTop: '14px' } }, posts.map((p) => h('div', { class: 'note' }, h('b', {}, ST.nameOf(p.u)), h('br'), '어제: ' + (p.y || '–'), h('br'), '오늘: ' + (p.t || '–'), h('br'), p.b ? '🚧 ' + p.b : '막힘 없음'))) : null));
      });

      ctx.watch('c7', (d) => { D = d || {}; rBoard(); rForm(); rStand(); });
      ST.add(root, [formBox, boardBox, standBox]);
      return root;
    },

    together(ctx) {
      const root = h('div');
      let filter = '전체', D0 = {};
      const draw = () => {
        const cards = cardsOf(D0);
        ST.clear(root);
        const launched = cards.filter((c) => +c.col >= 4).length;
        root.appendChild(grid(2,
          card('열별 카드 수', cards.length ? C.bars({ items: COLS.map((c, i) => ({ label: c.t, value: cards.filter((x) => +x.col === i).length, color: i === 4 ? 'var(--green)' : i === 5 ? 'var(--blue)' : 'var(--ink3)' })), max: Math.max(1, ...COLS.map((c, i) => cards.filter((x) => +x.col === i).length)), fmt: (v) => v + '개' }) : empty()),
          card('실험 속도 (목표: 반 전체 6개 출시)', C.gauge({ value: Math.min(1, launched / 6), threshold: 1, thLabel: '목표', text: launched + '/6', caption: 'Running + 완료', label: '실험 속도' }))));
        const done = cards.filter((c) => +c.col === 5 && c.result);
        const per = {}; cards.forEach((c) => { per[c.by] = per[c.by] || { run: 0, done: 0, all: 0 }; per[c.by].all++; if (+c.col === 4) per[c.by].run++; if (+c.col === 5) per[c.by].done++; });
        root.appendChild(grid(2,
          card('실험 결과', done.length ? C.donut({ parts: Object.keys(RES).map((k) => ({ v: done.filter((c) => c.result === k).length, color: RES[k][1], name: RES[k][0] })), center: done.length + '건', sub: '완료', label: '결과 분포' }) : empty('아직 완료된 실험이 없어요.')),
          card('사람별 카드 흐름', Object.keys(per).length ? C.stack({ items: Object.keys(per).map((u) => ({ label: ST.nameOf(u), hl: u === ctx.me.id, parts: [{ v: per[u].all - per[u].run - per[u].done, name: '준비·진행', color: 'var(--ink3)' }, { v: per[u].run, name: 'Running', color: 'var(--green)' }, { v: per[u].done, name: '완료', color: 'var(--blue)' }] })), legend: [{ name: '준비·진행', color: 'var(--ink3)' }, { name: 'Running', color: 'var(--green)' }, { name: '완료', color: 'var(--blue)' }] }) : empty())));
        const sg = ST.seg(['전체'].concat(STAGES).map((s) => ({ v: s, l: s })), filter, (v) => { filter = v; draw(); });
        const list = done.filter((c) => filter === '전체' || c.stage === filter).sort((a, b) => (b.doneAt || 0) - (a.doneAt || 0));
        root.appendChild(card('배움 아카이브', h('p', { class: 'card-sub' }, '완료된 실험은 성공이든 실패든 이곳에 남습니다. 단계로 걸러서 “이 구간에서 무엇이 통했나”를 찾아보세요.'), sg, h('div', { style: { marginTop: '12px' } }, list.length ? list.map((c) => h('div', { class: 'idea', style: { gridTemplateColumns: '1fr auto' } }, h('div', {}, h('h5', {}, c.t), h('p', {}, c.hyp || ''), h('p', { style: { marginTop: '4px' } }, '💡 ' + c.learn)), h('div', {}, h('span', { class: 'tag' }, c.stage), h('br'), h('span', { class: 'tag ' + (c.result === 'win' ? 'g' : c.result === 'lose' ? 'r' : 'a') }, RES[c.result][0]), h('div', { class: 'rate' }, ST.nameOf(c.by))))) : empty('이 조건의 기록이 아직 없어요.'))));
      };
      ctx.watch('c7', (d) => { D0 = d || {}; draw(); });
      return root;
    },

    quiz: [
      { q: '교재가 기존 애자일에 더하라고 한 “Running” 열의 목적으로 알맞은 것은?', opts: ['개발자의 작업량을 줄이기 위해', '출시된 실험을 한눈에 보이게 해 충돌을 막고 분석을 상기시키기 위해', '완료된 일을 숨기기 위해', '고객에게 보여 주기 위해'], a: 1, why: '출시 후 결과를 기다리는 실험을 보이게 해, 겹치는 실험을 막고 분석 단계를 잊지 않게 합니다.' },
      { q: '실험이 끝난 뒤 배움을 남기는 가장 좋은 형식은?', opts: ['긴 보고서', '실험 설명 + 결과 한 줄 같은 짧은 기록', '개인 노트', '구두 공유만'], a: 1, why: '간결함이 핵심입니다. 짧게 위키/DB에 남기고 플레이백에서 팀과 공유합니다.' },
      { q: '데일리 스탠드업에서 다루는 질문이 아닌 것은?', opts: ['어제 무엇을 끝냈나', '오늘 무엇을 할 건가', '막힌 일이 있는가', '지난 분기 재무 상세 보고'], a: 3, why: '스탠드업은 상세 상태 보고가 아니라 어제·오늘·막힘 세 가지를 짧게 나누는 자리입니다.' }
    ]
  });
})();
