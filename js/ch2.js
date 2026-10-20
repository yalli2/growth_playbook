/* Chapter 2 · 성장의 원칙 — 시스템 전체 */
(function () {
  const ST = window.ST, { h, P, H3, callout, ul, table, figure, card, grid, empty, esc, charts: C } = ST;
  const STAGES = ['웹사이트 방문', '가입 페이지 조회', '계정 생성', '설정·세팅', '제품 사용', '유료 전환', '지속 사용·결제'];
  const OWNERS = ['마케팅', '제품관리', '영업', '고객성공', '주인 없음'];
  const LEVERS = [
    { k: 'v', t: '가입 페이지 조회율', base: 0.10 }, { k: 'c', t: '계정 생성률', base: 0.90 }, { k: 's', t: '설정·세팅 완료율', base: 0.80 },
    { k: 'u', t: '제품 사용률', base: 0.80 }, { k: 'p', t: '유료 전환율', base: 0.30 }, { k: 'r', t: '월 유지율(이탈 감소)', base: 0.98 }
  ];
  const VISITORS = 1000, MONTHS = 60;
  /* 매달 방문자 → 유료 전환 → 월 유지율 모델. sel: 개선할 레버 키 배열, x: 개선율(0.25=25%) */
  function sim(sel, x) {
    const g = (k) => { const l = LEVERS.find((l) => l.k === k); let r = l.base; if (sel.includes(k)) r = k === 'r' ? 1 - (1 - l.base) * (1 - x) : Math.min(1, l.base * (1 + x)); return r; };
    const f = g('v') * g('c') * g('s') * g('u') * g('p'), ret = g('r');
    const out = []; let n = 0;
    for (let m = 1; m <= MONTHS; m++) { n = n * ret + VISITORS * f; out.push(n); }
    return out;
  }
  ST.CH2 = { sim, LEVERS, STAGES, OWNERS, VISITORS };

  ST.chapters.push({
    n: 2, key: 'c2', title: '시스템 전체를 보라', en: 'Tenets of Growth — Where Growth Works Best', pages: 'p.13–23',
    tagline: '한 곳만 고치면 덧셈, 여러 곳을 함께 고치면 곱셈 — 복리의 힘을 직접 계산해 봅니다.',
    chips: ['고객 여정', '복리 시뮬레이터', '교차기능 스쿼드'],
    goal: '마케팅 페이지만 최적화하면 사업의 일부만 개선됩니다. 방문부터 결제 지속까지 전체 시스템을 보고, 여러 구간의 개선이 곱해지는 복리 효과를 체감합니다.',

    learn() {
      const flow = h('div', { class: 'flow' }, STAGES.map((s) => h('div', { class: 'st' }, s)));
      const lanes = h('div', { class: 'lanes' },
        [['마케팅', 0, 2, 'var(--green)'], ['제품관리', 2, 3, 'var(--blue)'], ['영업(선택)', 3, 3, 'var(--amber)'], ['고객성공', 3, 4, 'var(--violet)']].map(([n, a, b, c]) => h('div', { class: 'lane' }, h('b', {}, n), h('span', { style: { '--c': c, marginLeft: (a / 7) * 100 + '%', width: ((b - a + 1) / 7) * 100 + '%' } }, n + '의 영역'))));
      const base = sim([], 0), one = sim(['v'], 0.25), three = sim(['v', 'p', 'r'], 0.25);
      const chart = C.line({ series: [{ name: '현재', ys: base, color: 'var(--ink3)', dash: '6 5' }, { name: '조회율만 +25%', ys: one, color: 'var(--blue)' }, { name: '조회율·유료전환·유지 각 +25%', ys: three, color: 'var(--green)', width: 3.2 }], xmin: 1, xmax: 60, xTickVals: [1, 12, 24, 36, 48, 60], xLabel: '개월', yLabel: '유료 고객 수', label: '복리 효과 비교' });
      const year = [];
      for (let d = 0; d <= 365; d += 5) year.push([d, Math.pow(1.01, d)]);
      return [
        P('인터넷 서비스(SaaS)의 전형적인 셀프서비스 여정은 <b>방문 → 가입 → 설정 → 사용 → 결제 → 지속</b>입니다. 필요에 따라 영업 프로세스와 고객성공(온보딩·확장) 프로세스가 곁들여집니다. 성장팀은 이 <b>전체 시스템</b>을 하나의 대상으로 봅니다.'),
        figure(h('div', {}, flow, lanes), '그림. 고객 여정과 기능별 담당 구간 (교재의 도식을 다시 그림)'),
        H3('원칙 1. 시스템 전체에 집중한다'),
        P('마케팅 페이지만 보면 “유입·체험”이라는 한 구간만 개선합니다. 한 구간의 개선은 다른 구간의 개선과 <b>곱해집니다</b>. 이것이 성장팀의 진짜 힘, 복리입니다.'),
        figure(chart, '그림. 교재와 같은 전환율(조회 10% · 생성 90% · 설정 80% · 사용 80% · 유료 30% · 월 유지 98%)에 월 방문자 1,000명을 가정한 5년 시뮬레이션. 유지율 “+25%”는 이탈률 2%를 25% 줄이는 것으로 계산했습니다.'),
        callout('key', '핵심', '조회율 하나를 25% 올리면 5년 뒤 고객이 25% 늘어납니다. 세 구간을 각각 25% 올리면 곱셈이라 훨씬 더 큽니다. 아래 “실습”에서 직접 확인해 보세요.'),
        H3('원칙 2. 가벼운 지속 개선 프로세스'),
        P('교재가 말하는 비결은 기발한 한 방(핫메일·드롭박스 같은 사례)이 아니라 <b>“프로세스”</b>입니다. 매주 돌아가는 단순한 절차로 단타(싱글)를 꾸준히 치고, 가끔 2루타·3루타·홈런이 나옵니다.'),
        figure(C.line({ series: [{ name: '매일 1%씩 (1.01^일)', pts: year, color: 'var(--green)', width: 3.2, endLabel: '≈ 37.8배' }, { name: '1년 뒤 한 번에 10배', pts: [[0, 1], [365, 10]], color: 'var(--coral)', dash: '6 5', endLabel: '10배' }], xmin: 0, xmax: 365, xTickVals: [0, 73, 146, 219, 292, 365], xLabel: '일', yLabel: '배수', yFmt: (v) => v.toFixed(0) + '배', label: '매일 1% 대 10배' }), '그림. “매일 1% 좋아지기”와 “연말에 10배”의 비교'),
        H3('원칙 3. 기능의 경계를 넘어 일한다'),
        P('마케팅은 “방문자를 데려오면 끝”, 그다음은 제품팀 몫이라는 식의 <b>벽 넘기기</b>는 복리를 끊습니다. 마케팅·제품·영업·고객성공의 오너를 한 스쿼드로 묶어야 모든 접점을 함께 고칠 수 있습니다.'),
        ul(['예) 고객성공: “이 화면에서 사용자를 더 추가하면 프리미엄 구매 확률이 높아요 → 업그레이드 링크를 넣죠.”', '예) 제품/개발이 마케팅 데모에 고객 니즈 이해를 더해 결과를 크게 개선']),
        callout('tip', '“우리”의 언어', '교차기능 팀은 “남의 공을 가로챈다”는 우려를 살 수 있습니다. <b>“나/저” 대신 “우리/그분들”</b>로 말하고, 팀 밖의 기여는 넉넉히 칭찬하세요.')
      ];
    },

    practice(ctx) {
      const root = h('div');
      ctx.ready(`c2/${ctx.me.id}`, (mine) => {
        /* A. 복리 시뮬레이터 */
        const sel = new Set(ST.arr(mine.levers).length ? ST.arr(mine.levers) : ['v']);
        let x = mine.x != null ? +mine.x : 0.25;
        const out = h('div'), solo = h('div');
        const checks = LEVERS.map((l) => {
          const cb = h('input', { type: 'checkbox', checked: sel.has(l.k) });
          cb.addEventListener('change', () => { cb.checked ? sel.add(l.k) : sel.delete(l.k); paint(); });
          return h('label', { class: 'chk' }, cb, h('span', {}, h('b', {}, l.t), h('br'), h('span', { class: 'muted' }, l.k === 'r' ? '현재 98% (월 이탈 2%)' : '현재 ' + Math.round(l.base * 100) + '%')));
        });
        const sl = ST.slider({ label: '레버당 개선 폭', min: 5, max: 50, step: 5, value: Math.round(x * 100), fmt: (v) => '+' + v + '%', onInput: (v) => { x = v / 100; paint(); } });
        function paint() {
          const base = sim([], 0), cur = sim([...sel], x), n0 = base[MONTHS - 1], n1 = cur[MONTHS - 1];
          ST.clear(out);
          out.appendChild(h('div', { class: 'metric-row' },
            h('div', { class: 'metric' }, h('b', {}, ST.fmt(n0)), h('span', {}, '현재 5년 후 유료 고객')),
            h('div', { class: 'metric' }, h('b', {}, ST.fmt(n1)), h('span', {}, `선택한 레버 ${sel.size}개 개선 후`)),
            h('div', { class: 'metric' + (n1 < n0 ? ' bad' : '') }, h('b', {}, '+' + ST.fmt((n1 / n0 - 1) * 100, 0) + '%'), h('span', {}, '개선 효과'))));
          out.appendChild(C.line({ series: [{ name: '현재', ys: base, color: 'var(--ink3)', dash: '6 5' }, { name: '내 선택', ys: cur, color: 'var(--green)', width: 3.2 }], xmin: 1, xmax: 60, xTickVals: [1, 12, 24, 36, 48, 60], xLabel: '개월', yLabel: '유료 고객 수', label: '내 시뮬레이션' }));
          ST.clear(solo);
          solo.appendChild(C.bars({ items: LEVERS.map((l) => { const r = sim([l.k], x)[MONTHS - 1] / n0 - 1; return { label: l.t, value: r * 100, text: r * 100 > 0.5 ? '+' + (r * 100).toFixed(0) + '%' : '0%', color: sel.has(l.k) ? 'var(--green)' : 'var(--ink3)' }; }), fmt: (v) => v.toFixed(0) + '%' }));
        }
        paint();
        const aBox = card('A. 복리 시뮬레이터 — 어느 레버를 당길까?', h('p', { class: 'card-sub' }, `월 방문자 ${ST.fmt(VISITORS)}명을 가정합니다. 개선할 레버를 고르고 개선 폭을 조절해 5년 뒤 유료 고객을 비교하세요. 전환율은 100%를 넘지 않게 계산합니다.`),
          h('div', { class: 'g2 grid' }, h('div', {}, checks, sl), h('div', {}, h('h4', { class: 'card-t', style: { fontSize: '14px' } }, '레버 하나만 개선했을 때의 효과'), solo)), out,
          h('div', { style: { marginTop: '12px' } }, ST.btn('내 선택 저장', { kind: 'primary', onclick: () => { if (!sel.size) return ST.toast('레버를 하나 이상 골라 주세요'); const r = sim([...sel], x)[MONTHS - 1]; ctx.putMine('levers', [...sel]); ctx.putMine('x', x); ctx.putMine('result', Math.round(r)); ctx.putMine('base', Math.round(sim([], 0)[MONTHS - 1])); ctx.done(); ST.toast('저장했어요 ✔'); } })));

        /* B. 1% 계산기 */
        const dly = ST.slider({ label: '하루 개선율', min: 0.1, max: 3, step: 0.1, value: 1, fmt: (v) => v.toFixed(1) + '%', onInput: (v) => upd(v) });
        const bOut = h('div');
        function upd(v) {
          const r = Math.pow(1 + v / 100, 365), pts = [];
          for (let d = 0; d <= 365; d += 5) pts.push([d, Math.pow(1 + v / 100, d)]);
          ST.clear(bOut);
          bOut.appendChild(h('div', { class: 'metric-row' }, h('div', { class: 'metric' }, h('b', {}, ST.fmt(r, 1) + '배'), h('span', {}, '1년 뒤 누적 개선')), h('div', { class: 'metric' }, h('b', {}, ((Math.pow(10, 1 / 365) - 1) * 100).toFixed(2) + '%'), h('span', {}, '“10배”에 필요한 하루 개선율'))));
          bOut.appendChild(C.line({ series: [{ name: `매일 ${v.toFixed(1)}%`, pts, color: 'var(--green)', width: 3 }, { name: '10배 목표', pts: [[0, 10], [365, 10]], color: 'var(--coral)', dash: '6 5' }], xmin: 0, xmax: 365, ymin: 0, xTickVals: [0, 73, 146, 219, 292, 365], xLabel: '일', yFmt: (y) => y.toFixed(0) + '배', label: '매일 개선 곡선' }));
        }
        upd(1);
        const bBox = card('B. 매일 1%의 힘', h('p', { class: 'card-sub' }, '하루 개선율을 바꿔 보세요. 10배를 만들기 위해 필요한 하루 개선율은 생각보다 작습니다.'), dly, bOut);

        /* C. 소유권 지도 */
        const own = Object.assign({}, mine.own || {});
        const cBox = card('C. 우리 조직의 “누가 이 구간을 책임지나?”', h('p', { class: 'card-sub' }, '지금 우리 조직에서 각 구간의 주 책임 기능을 골라 보세요. “주인 없음”이 많으면 시스템에 틈이 있다는 신호예요.'));
        STAGES.forEach((s, i) => {
          const sg = ST.seg(OWNERS.map((o, j) => ({ v: j, l: o })), own[i] == null ? null : +own[i], (v) => { own[i] = v; });
          cBox.appendChild(h('div', { style: { display: 'grid', gridTemplateColumns: 'minmax(120px,170px) 1fr', gap: '10px', alignItems: 'center', padding: '6px 0', borderTop: '1px dashed var(--line)' } }, h('b', {}, s), sg));
        });
        cBox.appendChild(h('div', { style: { marginTop: '12px' } }, ST.btn('지도 저장', { kind: 'primary', onclick: () => { if (Object.keys(own).length < STAGES.length) return ST.toast('모든 구간을 골라 주세요'); ctx.putMine('own', own); ctx.done(); ST.toast('저장했어요 ✔'); } })));
        ST.clear(root); ST.add(root, [aBox, bBox, cBox]);
      });
      return root;
    },

    together(ctx) {
      const root = h('div');
      ctx.watch('c2', (d) => {
        ST.clear(root);
        const ids = Object.keys(d).filter((u) => u !== 'q' && d[u] && d[u].levers);
        const cnt = LEVERS.map((l) => ({ label: l.t, value: ids.filter((u) => ST.arr(d[u].levers).includes(l.k)).length, color: 'var(--green)' }));
        root.appendChild(grid(2,
          card('모두가 고른 레버', ids.length ? C.bars({ items: cnt, max: Math.max(1, ids.length), fmt: (v) => v + '명' }) : empty()),
          card('몇 개 레버를 당겼나?', ids.length ? C.bars({ items: [1, 2, 3, 4, 5, 6].map((n) => ({ label: n + '개', value: ids.filter((u) => ST.arr(d[u].levers).length === n).length, color: 'var(--blue)' })), max: Math.max(1, ids.length), fmt: (v) => v + '명' }) : empty())));
        if (ids.length) {
          const base = ids[0] && d[ids[0]].base ? +d[ids[0]].base : sim([], 0)[MONTHS - 1];
          const all = sim(LEVERS.map((l) => l.k), 0.25)[MONTHS - 1];
          const vals = ids.map((u, i) => ({ v: +d[u].result, color: ST.PAL[i % ST.PAL.length], title: `${ST.nameOf(u)} · ${ST.fmt(d[u].result)}명 (레버 ${ST.arr(d[u].levers).length}개, +${Math.round(d[u].x * 100)}%)` }));
          const mx = Math.max(...vals.map((v) => v.v), all) * 1.05;
          root.appendChild(card('5년 뒤 유료 고객 — 우리 반의 분포', h('p', { class: 'card-sub' }, '점 하나가 한 사람입니다. 점에 마우스를 올리면 선택한 조건이 보여요. 모든 레버를 +25% 했을 때와 비교해 보세요.'), C.dots({ values: vals, min: Math.floor(base * 0.9), max: mx, markers: [{ v: base, label: '현재', color: 'var(--ink3)' }, { v: all, label: '전 레버 +25%', color: 'var(--green)' }], fmt: (v) => ST.fmt(v), label: '5년 뒤 고객 분포' })));
        }
        /* 소유권 히트맵 */
        const oids = Object.keys(d).filter((u) => u !== 'q' && d[u] && d[u].own);
        const data = STAGES.map((_, i) => OWNERS.map((_, j) => oids.filter((u) => d[u].own[i] != null && +d[u].own[i] === j).length));
        root.appendChild(card('구간별 책임 기능 히트맵', oids.length ? [C.heat({ rows: STAGES, cols: OWNERS, data, max: Math.max(1, oids.length), fmt: (v) => v, color: 'var(--blue)' }), h('p', { class: 'muted', style: { marginTop: '8px' } }, '한 구간에 여러 기능이 흩어져 있거나 “주인 없음” 칸이 진하다면, 벽 넘기기가 일어나는 구간입니다.')] : empty()));
      });
      return root;
    },

    quiz: [
      { q: '조회율 +25%, 유료 전환율 +25%, 유지율 개선을 동시에 했을 때 하나만 개선한 경우보다 효과가 큰 이유는?', opts: ['개선 효과가 더해지기 때문', '각 구간의 개선이 서로 곱해지며 복리로 쌓이기 때문', '유지율은 효과가 없기 때문', '방문자 수가 자동으로 늘어나기 때문'], a: 1, why: '여정의 각 단계 전환율은 곱으로 연결되어 한 구간의 개선이 다른 구간의 개선과 복리로 합쳐집니다.' },
      { q: '매일 1%씩 개선하면 1년 뒤 대략 몇 배가 될까?', opts: ['약 3.7배', '약 10배', '약 37.8배', '약 365배'], a: 2, why: '1.01^365 ≈ 37.8. “한 번에 10배”보다 꾸준한 1%가 더 큽니다.' },
      { q: '교차기능 스쿼드를 만들 때 교재가 권하는 말하기 습관은?', opts: ['“제가 해냈습니다”라고 성과를 분명히 한다', '“우리”를 쓰고 팀 밖의 기여를 넉넉히 칭찬한다', '성장팀의 공만 강조한다', '다른 팀과 말을 섞지 않는다'], a: 1, why: '“공을 가로챈다”는 우려를 막기 위해 “나” 대신 “우리/그분들”로 말합니다.' }
    ]
  });
})();
