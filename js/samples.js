/* 단독 모드용 샘플 참가자(12명) 데이터 — 실시간 공유가 켜지면 사용되지 않습니다 */
(function () {
  const ST = window.ST;
  const NAMES = ['지수', '민준', '서연', '도윤', '하은', '시우', '유나', '준서', '채원', '예준', '소율', '건우'];
  const ids = NAMES.map((_, i) => 's' + String(i + 1).padStart(2, '0'));
  let tree = null;

  function build() {
    const R = ST.rng(20261020), rnd = () => R();
    const pick = (a) => a[Math.floor(rnd() * a.length)];
    const ri = (a, b) => a + Math.floor(rnd() * (b - a + 1));
    const T = { users: {}, prog: {} };
    ids.forEach((u, i) => {
      T.users[u] = { name: NAMES[i], t: 1 };
      T.prog[u] = {}; const n = 3 + ((i * 5) % 7);
      for (let c = 1; c <= Math.min(9, n); c++) T.prog[u]['c' + c] = 1;
    });
    const quiz = (qs) => { const o = {}; ids.forEach((u) => { o[u] = {}; qs.forEach((a, k) => { if (rnd() < 0.9) o[u][k] = rnd() < 0.72 ? a : (a + 1 + ri(0, 2)) % 4; }); }); return o; };
    const CH = ST.chapters, qa = (n) => CH.find((c) => c.n === n).quiz.map((q) => q.a);

    /* c1 */
    const c1 = { q: quiz(qa(1)) };
    const KPI = ['무료체험→유료 전환율 18%→24% (12주)', '신규 수강생 월 500명 확보', '3개월 수강 유지율 62%→70%', '앱 첫 주 활성화율 40%→55%', '추천 가입 비중 8%→15%', '온보딩 완료율 60%→80%', '재구매율 25%→32%', '상담→결제 전환 30%→38%'];
    ids.forEach((u, i) => {
      const a = [ri(2, 6), ri(2, 5), 0]; a[2] = 10 - a[0] - a[1]; if (a[2] < 0) { a[1] += a[2]; a[2] = 0; }
      const sort = {}; ST.CH1.TASKS.forEach((t, k) => { sort[k] = rnd() < (k === 5 ? 0.45 : 0.78) ? t.a : 1 - t.a; });
      c1[u] = { alloc: a, sort, kpi: i < 8 ? KPI[i] : undefined };
      if (c1[u].kpi === undefined) delete c1[u].kpi;
    });
    T.c1 = c1;

    /* c2 */
    const c2 = { q: quiz(qa(2)) };
    const LV = ['v', 'c', 's', 'u', 'p', 'r'];
    ids.forEach((u, i) => {
      const k = ri(1, 4), lev = []; while (lev.length < k) { const l = rnd() < 0.35 ? 'r' : pick(LV); if (!lev.includes(l)) lev.push(l); }
      const x = pick([0.15, 0.25, 0.25, 0.35]);
      const own = {}; ST.CH2.STAGES.forEach((_, s) => { const w = [[0, 0, 0, 1], [0, 0, 1], [1, 1, 4], [1, 1, 3, 4], [1, 1, 3], [0, 2, 1, 2, 4], [3, 3, 4, 2]][s]; own[s] = pick(w); });
      c2[u] = { levers: lev, x, result: Math.round(ST.CH2.sim(lev, x)[59]), base: Math.round(ST.CH2.sim([], 0)[59]), own };
    });
    T.c2 = c2;

    /* c3 */
    const c3 = { q: quiz(qa(3)) };
    const prof = [3.4, 2.4, 3.6, 2.6, 3.0, 3.2, 3.5];
    ids.forEach((u) => {
      const radar = prof.map((p) => Math.max(1, Math.min(5, Math.round(p + (rnd() - 0.5) * 2.4))));
      const fail = {}, dec = {};
      ST.CH3.FAIL.forEach((f, k) => { fail[k] = rnd() < 0.75 ? f.a : 1 - f.a; }); ST.CH3.DEC.forEach((d, k) => { dec[k] = rnd() < (k === 3 ? 0.6 : 0.75) ? d.a : 1 - d.a; });
      c3[u] = { radar, fail, dec };
    });
    T.c3 = c3;

    /* c4 */
    const c4 = { q: quiz(qa(4)) };
    const polls = [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3];
    const PM = ['m:온라인 영어 코스|42,38,20', 'm:비즈니스 스페인어 앱|28,40,32', 'm:기업 교육 LMS|51,33,16', 'm:코칭 구독|36,41,23'];
    const MET = { acq: ['신규 체험 신청', '방문자 수', '검색 유입'], act: ['첫 수업 참여율', '설정 완료율'], ret: ['4주 재수강률', '주간 활성 사용자'], rev: ['무료→유료 전환율', 'MRR'], ref: ['추천 가입 수', 'NPS'] };
    const ABS = [['가입 버튼 문구', 2000, 500, 2000, 600], ['체험 신청 폼 간소화', 1500, 210, 1500, 262], ['환영 이메일 제목', 4000, 800, 4000, 828], ['가격표 순서 변경', 900, 90, 900, 99], ['후기 영상 추가', 3000, 360, 3000, 468], ['푸시 알림 시간대', 2500, 300, 2500, 306]];
    ids.forEach((u, i) => {
      const d = { poll: polls[i] };
      if (i < 4) { const [nm, v] = PM[i].slice(2).split('|'); const [a, b, c] = v.split(',').map(Number); d.pmf = { prod: nm, very: a, some: b, not: c }; }
      if (i < 9) { d.aarrr = {}; Object.keys(MET).forEach((k) => { if (rnd() < 0.85) d.aarrr[k] = { m: pick(MET[k]), type: rnd() < 0.5 ? 'lead' : 'lag' }; }); }
      if (i < ABS.length) { const [nm, nA, cA, nB, cB] = ABS[i]; const r = ST.CH4.abTest(nA, cA, nB, cB); d.ab = { name: nm, nA, cA, nB, cB, lift: r.lift, p: r.p, verdict: r.verdict, cls: r.cls }; }
      c4[u] = d;
    });
    T.c4 = c4;

    /* c5 */
    const c5 = { q: quiz(qa(5)) };
    const IDEAS = [['전화번호 칸 제거', '이탈자의 80%가 전화번호 칸에서 멈춘다', '칸을 없애면 전환율 20%→40%'], ['바운스백 이메일', '가입자의 20%가 로그인 없이 이탈', '48시간 내 안내 메일로 이탈 20%→10%'], ['무료 체험 기간 연장', '체험 7일 안에 첫 수업을 못 듣는다', '14일로 늘리면 첫 수업 참여 +15%'], ['후기 영상 노출', '가입 페이지 체류 12초', '후기 영상으로 가입 +20%'], ['리타기팅 광고', '방문자의 70%가 재방문 없음', '리타기팅으로 재방문 +10%'], ['첫 수업 가이드 투어', '설정 단계에서 35% 이탈', '가이드 투어로 완료율 +25%'], ['카카오 알림 리마인드', '수강 중단자가 많음', '주 2회 알림으로 유지 +8%']];
    ids.forEach((u, i) => {
      const f = [1000, 0, 0, 0]; f[1] = Math.round(f[0] * (0.4 + rnd() * 0.3)); f[2] = Math.round(f[1] * (0.3 + rnd() * 0.3)); f[3] = Math.round(f[2] * (0.45 + rnd() * 0.3));
      const names = ST.CH5.DEF_STAGES.map((s) => s.name);
      const ideas = []; const n = ri(2, 4); const used = new Set();
      while (ideas.length < n) { const k = ri(0, IDEAS.length - 1); if (used.has(k)) continue; used.add(k); ideas.push({ t: IDEAS[k][0], stage: ri(0, 3), prob: IDEAS[k][1], hyp: IDEAS[k][2], imp: ri(2, 10), ease: ri(2, 10) }); }
      c5[u] = { metric: ST.CH5.METRICS[i % 5], funnel: f.map((v, k) => ({ name: names[k], n: v })), ideas };
    });
    T.c5 = c5;

    /* c6 */
    const c6 = { ideas: {}, votes: {}, dis: {}, plan: {}, frame: { obj: '다음 90일 동안 무료체험 → 유료 전환을 끌어올린다', kpi: '전환율 18% → 24%, 12주 안', cons: '개발 공수 2주 이내 · 추가 예산 없음', assets: '뉴스레터 3만 명, 고객 인터뷰 20건, 후기 영상' }, q: quiz(qa(6)) };
    const J = [['체험 7일 미션 이메일', '매일 하나씩 따라 하는 미션으로 첫 성공 경험을 만든다', 'S', 'L'], ['후기 영상 랜딩 삽입', '실제 수강생 후기로 신뢰를 높인다', 'S', 'M'], ['체험 중 1:1 코칭 초대', '가입 3일차에 짧은 코칭 통화를 제안', 'M', 'L'], ['가입 폼 3칸으로 축소', '이탈이 큰 폼을 줄인다', 'S', 'M'], ['추천하면 1개월 무료', '추천 보상 프로그램', 'L', 'L'], ['성공 사례 뉴스레터', '월 1회 사례로 재방문 유도', 'S', 'S'], ['AI 학습 플랜 진단', '체험 직후 맞춤 플랜 제시', 'XL', 'XL'], ['결제 직전 리마인드', '카트 이탈자에게 24시간 후 알림', 'S', 'M'], ['기업 교육 패키지', 'B2B 번들 상품 출시', 'XL', 'L']];
    const iid = J.map((_, k) => 'i' + (k + 1));
    J.forEach((j, k) => { c6.ideas[iid[k]] = { t: j[0], d: j[1], time: j[2], size: j[3], by: ids[k], at: 1000 + k }; });
    const wgt = [9, 7, 5, 8, 3, 2, 3, 6, 1]; const tot = wgt.reduce((a, b) => a + b, 0);
    ids.forEach((u) => { const s = new Set(); let g = 0; while (s.size < 3 && g++ < 60) { let r = rnd() * tot, k = 0; for (; k < wgt.length; k++) { r -= wgt[k]; if (r <= 0) break; } s.add(iid[Math.min(k, 8)]); } c6.votes[u] = [...s]; });
    const cnt = {}; Object.values(c6.votes).forEach((a) => a.forEach((x) => { cnt[x] = (cnt[x] || 0) + 1; }));
    const top = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a]).slice(0, 3);
    ids.forEach((u) => { c6.dis[u] = {}; top.forEach((t) => { const r = rnd(); c6.dis[u][t] = { v: r < 0.65 ? 'agree' : r < 0.88 ? 'cond' : 'against', r: '' }; }); });
    c6.plan[top[0]] = { lead: '서연', help: '민준, 도윤', block: '이메일 발송 도구 연동', detail: '7일 미션 문구 먼저 작성', stop: '월간 뉴스레터 1회분 보류', when: '2주 안' };
    T.c6 = c6;

    /* c7 */
    const c7 = { cards: {}, stand: {}, q: quiz(qa(7)) };
    const KC = [['바운스백 넛지', '가입 후 48시간 미로그인자에게 메일 발송 시 이탈 20%→10%', '가입 조회', 4, null], ['후기 영상 삽입', '랜딩에 후기 영상을 넣으면 가입 +20%', '방문', 5, ['win', '영상 노출 후 가입 +18%, 체류시간 2배']], ['폼 3칸 축소', '필드를 줄이면 가입 완료율 +15%', '가입 조회', 5, ['win', '전환 +22%. 전화번호 칸이 핵심 장벽이었음']], ['가격표 순서 변경', '월간을 먼저 보이면 선택 쉬워질 것', '유료 전환', 5, ['flat', '변화 없음 — 가격 구조보다 가치 설명이 문제']], ['푸시 시간대 변경', '저녁 8시에 보내면 재방문 +10%', '유지', 5, ['lose', '오히려 수신 거부 증가. 직장인은 점심이 유리']], ['첫 수업 가이드 투어', '설정 단계 이탈을 줄인다', '설정', 2, null], ['추천 보상 프로그램', '추천 가입 +30%', '유지', 0, null], ['AI 진단 플랜', '체험 직후 맞춤 플랜', '사용', 0, null], ['체험 기간 14일', '첫 수업 참여율 +15%', '사용', 1, null], ['결제 리마인드', '결제 직전 이탈자에게 알림', '유료 전환', 1, null], ['환영 이메일 제목 A/B', '개인화 제목으로 오픈율 +5%', '계정 생성', 3, null], ['앱 설치 유도 배너', '모바일 사용자 유지', '유지', 2, null]];
    KC.forEach((k, i) => { const u = ids[i % 12]; c7.cards['k' + i] = { t: k[0], hyp: k[1], insight: '', design: '', metric: '', stage: k[2], col: k[3], by: u, at: 100 + i }; if (k[4]) { c7.cards['k' + i].result = k[4][0]; c7.cards['k' + i].learn = k[4][1]; c7.cards['k' + i].doneAt = 500 + i; } });
    c7.stand = { a1: { u: ids[0], y: '바운스백 메일 카피 초안 완료', t: '발송 대상 추출', b: '', at: 1 }, a2: { u: ids[2], y: '가입 폼 실험 결과 분석', t: '플레이백 자료 준비', b: '분석 도구 권한 필요', at: 2 } };
    T.c7 = c7;

    /* c8 */
    const c8 = { ideas: { x1: { t: '체험 중 1:1 코칭 초대', by: ids[3], at: 1 }, x2: { t: '결제 직전 리마인드', by: ids[5], at: 2 } }, ice: {}, claps: {}, stars: {}, ns: {}, kpi: {}, q: quiz(qa(8)) };
    const all = ST.CH8.SEED.map((s) => s.id).concat(['x1', 'x2']); const base = { seed0: [7, 6, 6], seed1: [5, 6, 7], seed2: [8, 7, 8], seed3: [4, 5, 9], seed4: [9, 8, 7], seed5: [7, 6, 5], x1: [8, 5, 4], x2: [7, 7, 8] };
    ids.forEach((u) => {
      c8.ice[u] = {}; c8.claps[u] = {}; c8.stars[u] = {};
      all.forEach((id) => { c8.ice[u][id] = base[id].map((v) => Math.max(1, Math.min(10, v + ri(-2, 2)))); });
      for (let k = 0; k < 4; k++) { const id = pick(all); c8.claps[u][id] = (c8.claps[u][id] || 0) + 1; }
      for (let k = 0; k < 2; k++) c8.stars[u][pick(['seed2', 'seed4', 'seed4', 'seed0', 'x2'])] = 1;
    });
    const NS = ['주간 활성 수강생 수', '월 유료 구독자 수', '4주 수강 완료율'];
    ids.slice(0, 7).forEach((u, i) => { c8.ns[u] = { ns: NS[i % 3], objs: ['신규 가입 증가', '첫 수업 활성화', '이탈 감소'] }; });
    ids.slice(0, 7).forEach((u, i) => { const b = 100, t = 160, w = []; let v = b; for (let k = 0; k < 2 + (i % 5); k++) { v += ri(2, 16); w.push(v); } c8.kpi[u] = { name: '주간 신규 가입', base: b, target: t, weeks: w }; });
    T.c8 = c8;

    /* c9 */
    const c9 = { q: quiz(qa(9)) };
    const FI = [['바운스백 이메일', '48시간 내 미로그인자에게 메일을 보내면 이탈이 20%→10%로 줄 것', '계정 생성→로그인 전환율'], ['가입 폼 축소', '전화번호 칸을 없애면 가입 완료율 20%→35%', '가입 완료율'], ['후기 영상', '랜딩에 후기 영상을 넣으면 체험 신청 +20%', '체험 신청 수'], ['환영 미션 메일', '7일 미션으로 첫 수업 참여 +15%', '첫 수업 참여율'], ['결제 리마인드', '카트 이탈 24시간 뒤 알림으로 결제 +8%', '결제 전환율']];
    ids.forEach((u, i) => {
      c9[u] = { ready: [ri(2, 5), ri(2, 4), ri(2, 4), ri(1, 4), ri(2, 4)] };
      if (i < 6) c9[u].first = { t: FI[i % 5][0], hyp: FI[i % 5][1], metric: FI[i % 5][2] };
      if (i < 4) c9[u].plan = [{ a: '타깃 KPI 합의 + 퍼널 분석', who: NAMES[i] }, { a: '실험 2개 출시', who: NAMES[(i + 1) % 12] }, { a: '성장 회의 정례화', who: NAMES[(i + 2) % 12] }];
    });
    T.c9 = c9;
    return T;
  }

  const getAt = (o, path) => { const seg = String(path).split('/').filter(Boolean); for (const s of seg) { if (o == null || typeof o !== 'object') return undefined; o = o[s]; } return o; };
  ST.store.sampleProvider = (base) => { try { if (!tree) tree = build(); return getAt(tree, base); } catch (e) { console.error('sample build failed', e); return undefined; } };
})();
