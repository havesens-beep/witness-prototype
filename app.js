/* 위트니스 — 하이브리드 프로토타입 (해시 라우팅 SPA, 목업 데이터) */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const won = n => n.toLocaleString('ko-KR') + '원';
const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const today = new Date();
const mmdd = d => `${d.getMonth() + 1}/${d.getDate()}(${DAYS[d.getDay()]})`;
const ymd = d => `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
const isoDate = d => d.toISOString().slice(0, 10);

/* ---------- 아이콘 ---------- */
const I = {
  back: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
  cal: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  filter: '<svg viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
  eyeoff: '<svg viewBox="0 0 24 24"><path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c5 0 9 6 9 6a17 17 0 0 1-3 3.6M6.6 6.6C4.3 8.2 3 12 3 12s4 6 9 6a9 9 0 0 0 4.4-1.1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>',
  doc: '<svg viewBox="0 0 24 24"><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
  wm: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/></svg>',
  cam: '<svg viewBox="0 0 24 24"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3v10l-6-3"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z"/></svg>',
  dl: '<svg viewBox="0 0 24 24"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
  link: '<svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
  gift: '<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="13" rx="1"/><path d="M3 12h18M12 8v13M12 8S10.5 3 8 3.5 7 8 12 8zM12 8s1.5-5 4-4.5S17 8 12 8z"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
  gps: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  flag: '<svg viewBox="0 0 24 24"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>',
};

/* ---------- 목업 데이터 ---------- */
const VIDEOS = [
  { id: 1, time: '18:12:40', place: 'OO사거리', dir: '북→남 방향', device: '전방 블랙박스', type: '블랙박스', q: 'FHD', dur: 45, x: 60, y: 36, dist: 180, scene: '', mood: '야간' },
  { id: 2, time: '18:05:12', place: 'OO사거리 남측 횡단보도', dir: '동→서 방향', device: '후방 블랙박스', type: '블랙박스', q: 'QHD', dur: 60, x: 32, y: 66, dist: 320, scene: 'rain', mood: '비' },
  { id: 3, time: '17:48:03', place: '△△약국 앞', dir: '고정 시점', device: '상가 CCTV', type: 'CCTV', q: 'HD', dur: 120, x: 30, y: 30, dist: 410, scene: 'cctv', mood: 'CCTV' },
  { id: 4, time: '18:20:55', place: 'OO로 버스정류장', dir: '서→동 방향', device: '전방 블랙박스', type: '블랙박스', q: 'FHD', dur: 38, x: 70, y: 62, dist: 260, scene: 'neon', mood: '야간' },
  { id: 5, time: '18:31:10', place: 'OO사거리 편의점 앞', dir: '현장 촬영', device: '휴대폰 촬영', type: '휴대폰', q: '4K', dur: 25, x: 47, y: 56, dist: 90, scene: 'dusk', mood: '노을' },
  { id: 6, time: '17:22:44', place: '□□아파트 정문', dir: '남→북 방향', device: '전방 블랙박스', type: '블랙박스', q: 'HD', dur: 50, x: 76, y: 24, dist: 470, scene: 'garage', mood: '주차장' },
  { id: 7, time: '18:02:31', place: 'OO터널 진입부', dir: '서→동 방향', device: '전방 블랙박스', type: '블랙박스', q: 'QHD', dur: 52, x: 18, y: 48, dist: 450, scene: 'tunnel', mood: '터널' },
  { id: 8, time: '17:56:18', place: 'OO대로 2차로', dir: '남→북 방향', device: '측면 블랙박스', type: '블랙박스', q: 'FHD', dur: 40, x: 54, y: 22, dist: 300, scene: 'dusk', mood: '노을' },
  { id: 9, time: '18:15:02', place: 'OO사거리 북측 상가', dir: '고정 시점', device: '상가 CCTV', type: 'CCTV', q: 'FHD', dur: 180, x: 62, y: 46, dist: 150, scene: 'cctv', mood: 'CCTV' },
  { id: 10, time: '18:09:47', place: 'OO사거리 좌회전 차로', dir: '동→북 방향', device: '전방 블랙박스', type: '블랙박스', q: '4K', dur: 33, x: 44, y: 40, dist: 120, scene: 'neon', mood: '야간' },
  { id: 11, time: '18:40:26', place: 'OO교 북단', dir: '북→남 방향', device: '전방 블랙박스', type: '블랙박스', q: 'FHD', dur: 48, x: 38, y: 78, dist: 390, scene: 'rain', mood: '비' },
  { id: 12, time: '17:35:10', place: 'OO초 앞 횡단보도', dir: '현장 촬영', device: '휴대폰 촬영', type: '휴대폰', q: 'FHD', dur: 22, x: 24, y: 64, dist: 440, scene: 'day', mood: '주간' },
  { id: 13, time: '18:26:39', place: 'OO로 주유소 입구', dir: '서→동 방향', device: '후방 블랙박스', type: '블랙박스', q: 'HD', dur: 55, x: 82, y: 58, dist: 480, scene: '', mood: '야간' },
  { id: 14, time: '18:18:05', place: '대형마트 지하 2층', dir: '고정 시점', device: '주차장 CCTV', type: 'CCTV', q: 'HD', dur: 240, x: 66, y: 30, dist: 380, scene: 'garage', mood: '주차장' },
  { id: 15, time: '17:51:44', place: 'OO고개 내리막', dir: '북→남 방향', device: '전방 블랙박스', type: '블랙박스', q: 'QHD', dur: 41, x: 86, y: 40, dist: 720, scene: 'snow', mood: '눈' },
  { id: 16, time: '18:44:12', place: 'OO역 3번 출구', dir: '현장 촬영', device: '휴대폰 촬영', type: '휴대폰', q: '4K', dur: 30, x: 12, y: 20, dist: 860, scene: 'neon', mood: '야간' },
].map(v => ({ ...v, price: 10000, cat: '교통사고' }));

const REQUESTS = [
  { id: 1, title: 'OO교차로 좌회전 차량 추돌', when: '오늘 17:40 전후', dist: 220, bounty: 30000, x: 40, y: 42, desc: '흰색 SUV가 신호 위반으로 진입해 추돌했습니다. 북쪽 방향 정차 차량 블랙박스를 찾습니다.' },
  { id: 2, title: '대형마트 지하주차장 접촉', when: '오늘 14:10 전후', dist: 380, bounty: 0, x: 66, y: 30, desc: 'B2층 C구역 기둥 근처, 출차 중 접촉 후 상대 차량이 그대로 떠났습니다.' },
  { id: 3, title: 'OO초 앞 횡단보도 자전거 사고', when: '어제 08:20 전후', dist: 450, bounty: 50000, x: 28, y: 70, desc: '등교 시간대 자전거와 승용차 충돌. 맞은편 상가 CCTV 또는 블랙박스 영상을 찾습니다.' },
  { id: 4, title: '골목길 후진 차량 보행자 접촉', when: '11/24 21:05 전후', dist: 140, bounty: 0, x: 58, y: 70, desc: '편의점 옆 일방통행 골목, 후진하던 차량이 보행자와 접촉했습니다.' },
];

const MY = {
  purchases: [{ vid: 1, date: '11/26', left: 29 }, { vid: 3, date: '11/02', left: 5 }],
  sales: [
    { vid: 2, status: '판매 중', sold: 3, earn: 26400 },
    { vid: 4, status: '심사 중', sold: 0, earn: 0 },
    { vid: 6, status: '반려', sold: 0, earn: 0, reason: '얼굴 블러 재처리 필요' },
  ],
};

/* ---------- 상태 ---------- */
const S = {
  q: { date: isoDate(today), hour: 18, range: 1, radius: 500, loc: '현재 위치' },
  filters: new Set(['교통사고']),
  sort: 'time',
  view: 'map',
  sel: null,
  sheetFull: false,
  buy: { step: 1, verified: false, agreed: false, method: 'case', pay: 'card' },
  up: { step: 1, file: null, pledge: false, cat: '교통사고', desc: '' },
  myTab: 'buy',
  admSel: 0,
};

/* ---------- 유틸 ---------- */
let toastT;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2200);
}
/* 해시는 '#video-1' 처럼 단순 이름으로 사용 (공유 링크 호환). 내부 경로 '/video/1' ↔ 해시 'video-1' */
function go(h) { location.hash = h.replace(/^\//, '').replace(/\//g, '-') || 'home'; }
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#/"]');
  if (a) { e.preventDefault(); go(a.getAttribute('href').slice(1)); }
});
function openDrawer() { document.body.classList.add('drawer-open'); }
function closeDrawer() { document.body.classList.remove('drawer-open'); }
const condText = () => {
  const d = new Date(S.q.date);
  return `${d.getMonth() + 1}/${d.getDate()} ${S.q.hour - S.q.range}~${S.q.hour + S.q.range}시 · ${S.q.radius}m`;
};
const thumb = (v, extra = '') => `<div class="thumb">${extra}<div class="scene ${v.scene}"></div><div class="play">${I.play}</div>${v.time ? `<span class="rec">${v.time.slice(0, 5)}</span>` : ''}<span class="dur">${Math.floor(v.dur / 60)}:${String(v.dur % 60).padStart(2, '0')}</span></div>`;
const durText = s => s >= 60 ? `${Math.floor(s / 60)}분 ${s % 60 ? (s % 60) + '초' : ''}`.trim() : `${s}초`;
const trustBadges = () => `<span class="tag ok">${I.check}심사 완료</span><span class="tag ok">${I.check}원본 무편집</span><span class="tag">${I.doc}진본 확인서</span>`;

function mapStreets() {
  return `<svg class="streets" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><pattern id="mg" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="rgba(143,125,255,.07)" stroke-width="1"/></pattern></defs>
    <rect width="400" height="300" fill="#0A0C15"/><rect width="400" height="300" fill="url(#mg)"/>
    <g fill="#11142A"><rect x="20" y="20" width="110" height="80" rx="6"/><rect x="250" y="20" width="130" height="70" rx="6"/><rect x="30" y="190" width="90" height="90" rx="6"/><rect x="270" y="200" width="110" height="80" rx="6"/></g>
    <path d="M0 250 C 80 230, 140 270, 230 255 S 360 240, 400 262" stroke="#0F2440" stroke-width="16" fill="none"/>
    <g stroke="#1E2236" fill="none" stroke-linecap="round">
      <path d="M0 140 H400" stroke-width="18"/><path d="M190 0 V300" stroke-width="18"/>
      <path d="M0 60 L400 100" stroke-width="9"/><path d="M60 0 L110 300" stroke-width="9"/>
      <path d="M300 0 L280 300" stroke-width="9"/><path d="M0 210 H400" stroke-width="7"/>
    </g>
    <g stroke="rgba(255,200,110,.55)" stroke-width="1.2" stroke-dasharray="8 8" fill="none"><path d="M0 140 H400"/><path d="M190 0 V300"/></g>
  </svg>`;
}
function mapHTML(items, { gift = false, numbered = true, radius = true, ctrl = true } = {}) {
  return `<div class="map" style="position:absolute;inset:0">
    ${mapStreets()}
    ${radius ? '<div class="radius"></div><div class="me" title="검색 중심"></div>' : ''}
    ${items.map((it, i) => `<button class="pin ${gift && it.bounty ? 'gift' : ''} ${S.sel === it.id ? 'on' : ''}" data-pin="${it.id}" style="left:${it.x}%;top:${it.y}%" aria-label="${it.place || it.title}">
      <span>${gift ? (it.bounty ? '🎁 ' + it.bounty / 10000 + '만' : '요청') : numbered ? i + 1 : ''}</span></button>`).join('')}
    ${ctrl ? `<div class="map-ctrl"><button aria-label="현재 위치">${I.gps}</button><button aria-label="확대">${I.plus}</button></div>` : ''}
    <div class="map-legend">${radius ? `반경 ${S.q.radius}m` : '지도'}</div>
  </div>`;
}

/* ---------- 라우터 ---------- */
const routes = [
  [/^\/?$/, home, 'home'],
  [/^\/search$/, search, 'search'],
  [/^\/video\/(\d+)$/, video, 'search'],
  [/^\/buy\/(\d+)$/, buy, 'search'],
  [/^\/upload$/, upload, 'upload'],
  [/^\/upload\/done$/, uploadDone, 'upload'],
  [/^\/requests$/, requests, 'requests'],
  [/^\/requests\/new$/, requestNew, 'requests'],
  [/^\/request\/(\d+)$/, requestDetail, 'requests'],
  [/^\/my$/, my, 'my'],
  [/^\/leak$/, leak, 'my'],
  [/^\/admin$/, admin, ''],
];
function render() {
  const raw = location.hash.replace(/^#\/?/, '');
  const path = '/' + (raw === 'home' ? '' : raw.replace(/-/g, '/'));
  closeDrawer();
  for (const [re, fn, tab] of routes) {
    const m = path.match(re);
    if (m) {
      document.body.classList.toggle('has-tab', true);
      $$('.tabbar a').forEach(a => a.classList.toggle('on', a.dataset.tab === tab));
      $$('.gnb-nav a').forEach(a => a.classList.toggle('on', a.dataset.nav === tab));
      $('#app').innerHTML = fn(...m.slice(1).map(Number));
      fn.after && fn.after(...m.slice(1).map(Number));
      window.scrollTo(0, 0);
      return;
    }
  }
  go('/');
}window.addEventListener('hashchange', render);

/* =========================================================
   H-01 홈
   ========================================================= */
function home() {
  const hours = Array.from({ length: 24 }, (_, h) => `<option value="${h}" ${h === S.q.hour ? 'selected' : ''}>${String(h).padStart(2, '0')}:00</option>`).join('');
  const latest = [...VIDEOS].sort((a, b) => b.id - a.id).slice(0, 8);
  const d = new Date(S.q.date);
  const words = ['EVIDENCE', '목격', 'WITNESS', '증거', 'TRUST', '진본'];
  return `
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="bokeh" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
    <div class="road" aria-hidden="true"></div>
    <div class="scanline" aria-hidden="true"></div>
    <div class="hud-corners" aria-hidden="true"></div>
    <div class="hud" aria-hidden="true">
      <span class="r">REC&nbsp;&nbsp;${ymd(d)}&nbsp;<span id="hudClock">18:12:40</span></span>
      <span>N 37.5384° · E 127.0823°&nbsp;&nbsp;|&nbsp;&nbsp;42 km/h</span>
    </div>
    <div class="hero-in">
      <div class="hero-copy">
        <span class="eyebrow">${I.shield}당사자 인증 · 진본 확인서 · 판매자 익명</span>
        <div class="display hero-word">WITNESS</div>
        <h1>내 사고를 찍은 영상,<br><em>가장 빠르고 합법적으로</em> 찾기</h1>
        <p>현수막·커뮤니티 수소문 없이 언제·어디서만 입력하세요. 블랙박스는 며칠이면 덮어써지니, 지금 근처에서 촬영된 영상을 찾아보세요.</p>
      </div>
      <form class="card qs" onsubmit="event.preventDefault();quickSearch()">
        <div class="qs-head"><b>빠른 검색</b><span class="tag ok">${I.check}검색 무료</span></div>
        <label class="qs-row">${I.cal}<div class="grow"><div class="lbl">날짜</div><input type="date" id="qDate" value="${S.q.date}"></div></label>
        <label class="qs-row">${I.clock}<div class="grow"><div class="lbl">시간대</div><select id="qHour">${hours}</select></div>
          <select id="qRange" class="pill" aria-label="시간 범위"><option value="1">±1시간</option><option value="2">±2시간</option><option value="3">±3시간</option></select></label>
        <div class="qs-row">${I.pin}<div class="grow"><div class="lbl">위치</div><b id="qLoc">${S.q.loc}</b></div>
          <select id="qRadius" class="pill" aria-label="반경"><option>300</option><option selected>500</option><option>1000</option></select><span class="small muted">m</span></div>
        <button class="btn" type="submit">${I.search}영상 찾기</button>
        <p class="qs-hint">위치·시간은 현재 기준으로 자동 입력됐어요</p>
      </form>
    </div>
  </section>

  <div class="ticker" aria-label="실시간 현황"><div class="ticker-track">
    ${[0, 1].map(() => `
      <span><i></i>오늘 등록된 영상 <b>128</b>건</span>
      <span><i class="v"></i>심사 완료 <b>96</b>건</span>
      <span><i class="a"></i>진행 중인 목격 요청 <b>34</b>건</span>
      <span><i></i>평균 매칭 <b>2.4</b>일</span>
      <span><i class="v"></i>내 주변 500m 새 영상 <b>${VIDEOS.filter(v => v.dist <= 500).length}</b>건</span>
      <span><i class="a"></i>이번 주 판매자 정산 <b>₩3,872,000</b></span>`).join('')}
  </div></div>

  <div class="wrap">
    <section class="sec">
      <div class="sec-h"><div><div class="kicker">Latest footage</div><h2>방금 등록된 영상</h2></div><a href="#/search">전체 보기 ›</a></div>
      <div class="gallery">
        ${latest.map(v => `<button class="gcard" onclick="go('/video/${v.id}')">
          <div class="frame"><div class="scene ${v.scene}"></div>
            <div class="ov"><div class="top"><span class="r">REC ${v.time}</span><span>${v.q}</span></div>
              <div class="bot"><span class="pv">${I.play}2초 미리보기</span><span class="tag ok" style="font-size:11px">${I.check}심사 완료</span></div></div></div>
          <div class="meta"><b>${v.place}</b><div class="row"><span>${v.device} · ${v.mood} · ${v.dist}m</span><span class="price">${won(v.price)}</span></div></div>
        </button>`).join('')}
      </div>
    </section>

    <section class="sec">
      <div class="sec-h"><div><div class="kicker">How it works</div><h2>세 단계면 증거가 손에</h2></div></div>
      <div class="steps">
        <div class="card stepc"><div class="art search"></div><span class="no">01 / 03</span><div class="word">Search.</div><b>언제·어디서로 찾기</b><p>날짜·시간대와 지도 반경으로 근처 영상을 찾고, 2초 블러 미리보기로 내 사고인지 확인해요.</p></div>
        <div class="card stepc"><div class="art verify"></div><span class="no">02 / 03</span><div class="word">Verify.</div><b>사건 당사자 인증</b><p>사고접수번호·보험 접수번호·서류 중 하나로 당사자임을 인증해요. 원본은 인증된 사람만 구매해요.</p></div>
        <div class="card stepc"><div class="art evidence"></div><span class="no">03 / 03</span><div class="word">Evidence.</div><b>원본 + 진본 확인서</b><p>고유 워터마크가 들어간 원본과 해시값이 적힌 진본 확인서 PDF를 받아요.</p></div>
      </div>
    </section>
  </div>

  <div class="marquee" aria-hidden="true"><div>${[...words, ...words].map(w => `<span>${w}</span>`).join('')}</div></div>

  <div class="wrap">
    <section class="sec" style="margin-top:24px">
      <div class="stackwrap"><div class="stack-grid">
        <div class="stack" aria-hidden="true">
          <div class="s"><div class="scene neon"></div><span>DASHCAM · FRONT</span></div>
          <div class="s"><div class="scene cctv"></div><span>CCTV · FIXED</span></div>
          <div class="s"><div class="scene dusk"></div><span>PHONE · 4K</span></div>
        </div>
        <div class="stack-copy">
          <div class="kicker">Every angle</div>
          <h3>블랙박스, CCTV, 휴대폰까지<br>한 사건을 여러 각도로</h3>
          <p>같은 시각, 같은 장소를 찍은 영상을 기기별로 모아 보여드려요. 전방·후방·측면 블랙박스와 상가·주차장 CCTV, 현장 휴대폰 촬영본을 비교해 가장 결정적인 장면을 고르세요.</p>
          <a class="btn sm light" href="#/search">${I.search}내 주변 영상 보기</a>
        </div>
      </div></div>
    </section>

    <section class="sec">
      <div class="sec-h"><div><div class="kicker">Nearby requests</div><h2>내 주변 목격 요청</h2></div><a href="#/requests">더보기 ›</a></div>
      <div class="hscroll">
        ${REQUESTS.map(r => `<a class="card req-card" href="#/request/${r.id}">
          <div class="badges">${r.bounty ? `<span class="tag gift">${I.gift}현상금 ${r.bounty / 10000}만원</span>` : '<span class="tag">요청</span>'}</div>
          <b>${r.title}</b><span class="meta">${r.when} · ${r.dist}m</span></a>`).join('')}
      </div>
    </section>

    <section class="sec">
      <div class="upsell">
        <div class="ic">${I.cam}</div>
        <div class="grow" style="min-width:220px"><b>목격한 영상이 있나요?</b><p>올리기만 하면 판매·정산 자동. 판매자 정보는 구매자에게 공개되지 않아요.</p></div>
        <div><div class="small muted">피해자·가해자·보험사 2곳이 사면</div><div class="earnbig">₩35,200</div></div>
        <a class="btn light" href="#/upload">${I.plus}영상 올리고 수익 받기</a>
      </div>
    </section>

    <section class="sec">
      <div class="stats">
        <div><b>12<small>%</small></b><span>마켓 수수료 · 나머지는 판매자 몫</span></div>
        <div><b>2<small>초</small></b><span>블러 미리보기로 먼저 확인</span></div>
        <div><b>30<small>일</small></b><span>원본 다운로드 기한</span></div>
        <div><b>7<small>일</small></b><span>구매 확정 후 판매자 정산</span></div>
      </div>
    </section>

    <section class="sec">
      <div class="sec-h"><div><div class="kicker">Trust by design</div><h2>믿을 수 있는 이유</h2></div></div>
      <div class="trust">
        <div class="card">${I.shield}<b>2단계 심사</b><p>AI 1차 + 운영자 2차 심사 후 공개</p></div>
        <div class="card">${I.eyeoff}<b>자동 블러</b><p>얼굴·번호판은 미리보기에서 가려져요</p></div>
        <div class="card">${I.wm}<b>고유 워터마크</b><p>구매자마다 보이지 않는 표식, 유출 시 추적</p></div>
        <div class="card">${I.lock}<b>판매자 익명</b><p>판매자 신원은 구매자에게 공개되지 않아요</p></div>
      </div>
    </section>
  </div>
  <footer class="foot"><div class="display">WITNESS</div>위트니스는 증거 확보 목적의 영상만 거래합니다 · 조회수·인기순 정렬은 제공하지 않습니다<br>
    <a href="#/leak">유출 신고 센터</a> · 고객센터 · 이용약관 · 개인정보처리방침</footer>`;
}
let hudT;
home.after = () => {
  $('#qRange').value = S.q.range;
  clearInterval(hudT); let s = 18 * 3600 + 12 * 60 + 40;
  hudT = setInterval(() => {
    const el = $('#hudClock'); if (!el) return clearInterval(hudT);
    s++; el.textContent = [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60].map(n => String(n).padStart(2, '0')).join(':');
  }, 1000);
};
function quickSearch() {
  S.q.date = $('#qDate').value; S.q.hour = +$('#qHour').value; S.q.range = +$('#qRange').value; S.q.radius = +$('#qRadius').value;
  S.sel = null; go('/search');
}

/* =========================================================
   S-01 검색 결과 (지도 + 리스트)
   ========================================================= */
const FILTERS = ['교통사고', '블랙박스', 'CCTV', '휴대폰', 'FHD+', '전방', '후방'];
function results() {
  const f = S.filters; const types = ['블랙박스', 'CCTV', '휴대폰'].filter(t => f.has(t));
  let r = VIDEOS.filter(v => v.dist <= S.q.radius);
  if (types.length) r = r.filter(v => types.includes(v.type));
  if (f.has('FHD+')) r = r.filter(v => ['FHD', 'QHD', '4K'].includes(v.q));
  if (f.has('전방')) r = r.filter(v => v.device.includes('전방'));
  if (f.has('후방')) r = r.filter(v => v.device.includes('후방'));
  const target = S.q.hour * 60;
  const mins = v => { const [h, m] = v.time.split(':'); return +h * 60 + +m; };
  return r.sort(S.sort === 'time' ? (a, b) => Math.abs(mins(a) - target) - Math.abs(mins(b) - target) : (a, b) => a.dist - b.dist);
}
function vcard(v, i) {
  return `<button class="vcard ${S.sel === v.id ? 'on' : ''}" data-card="${v.id}" onclick="go('/video/${v.id}')">
    ${thumb(v, `<span class="no">${i + 1}</span>`)}
    <div class="info">
      <div class="t"><time>${v.time.slice(0, 5)}</time><span class="p">${v.place}</span></div>
      <div class="m">${v.device} · ${v.q} · ${v.dir} · ${v.dist}m</div>
      <div class="row" style="margin-top:auto"><div class="badges"><span class="tag ok">${I.check}심사 완료</span><span class="tag">원본</span></div><span class="price">${won(v.price)}</span></div>
    </div></button>`;
}
function search() {
  const r = results();
  return `
  <div class="s-bar">
    <div class="s-sum">
      <button class="icon-btn" onclick="go('/')" aria-label="뒤로">${I.back}</button>
      <button class="cond" onclick="openCond()">${I.search}<span>${condText()}</span></button>
      <button class="icon-btn" onclick="openCond()" aria-label="검색 조건">${I.filter}</button>
    </div>
    <div class="chips" role="group" aria-label="필터">
      ${FILTERS.map(t => `<button class="chip ${S.filters.has(t) ? 'on' : ''} ${t === '교통사고' ? 'lock' : ''}" onclick="toggleFilter('${t}')" aria-pressed="${S.filters.has(t)}">${t}</button>`).join('')}
    </div>
  </div>
  <div class="s-layout">
    <div class="s-map" id="sMap">${mapHTML(r)}</div>
    <div class="sheet ${S.sheetFull ? 'full' : ''}" id="sheet">
      <div class="sheet-h" onclick="toggleSheet()">
        <div class="row"><b>영상 ${r.length}건</b>
          <div class="row" onclick="event.stopPropagation()">
            <select class="sort" style="border:0;background:none" onchange="S.sort=this.value;render()" aria-label="정렬">
              <option value="time" ${S.sort === 'time' ? 'selected' : ''}>시간 가까운 순</option><option value="dist" ${S.sort === 'dist' ? 'selected' : ''}>거리 가까운 순</option></select>
            <div class="seg seg-view"><button class="${!S.sheetFull ? 'on' : ''}" onclick="setSheet(false)">지도</button><button class="${S.sheetFull ? 'on' : ''}" onclick="setSheet(true)">리스트</button></div>
          </div></div>
      </div>
      <div class="sheet-body" id="sheetBody">
        ${r.length ? r.map(vcard).join('') + `<div class="notice small">${I.info}<div>찾는 영상이 없나요? <a href="#/requests/new" style="text-decoration:underline;font-weight:700">목격 요청 올리기</a> — 검색 조건이 그대로 채워져요.</div></div>`
      : `<div class="empty"><div class="ic">${I.search}</div><b>조건에 맞는 영상이 아직 없어요</b><p>블랙박스는 며칠 안에 덮어써질 수 있어요.<br>목격 요청을 올리면 주변 업로더에게 바로 알림이 가요.</p>
          <a class="btn" href="#/requests/new">${I.pin}목격 요청 올리기</a><p class="small muted" style="margin-top:10px">${condText()} 조건이 그대로 채워집니다</p></div>`}
      </div>
    </div>
  </div>`;
}
search.after = () => {
  $$('[data-pin]').forEach(p => p.addEventListener('click', () => selectVideo(+p.dataset.pin, true)));
  $$('[data-card]').forEach(c => {
    c.addEventListener('mouseenter', () => highlight(+c.dataset.card));
    c.addEventListener('mouseleave', () => highlight(S.sel));
  });
};
function highlight(id) {
  $$('[data-pin]').forEach(p => p.classList.toggle('on', +p.dataset.pin === id));
  $$('[data-card]').forEach(c => c.classList.toggle('on', +c.dataset.card === id));
}
function selectVideo(id, fromPin) {
  S.sel = id; highlight(id);
  const card = $(`[data-card="${id}"]`);
  if (card && fromPin) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function toggleFilter(t) {
  if (t === '교통사고') { toast('MVP는 교통사고 카테고리만 제공해요'); return; }
  S.filters.has(t) ? S.filters.delete(t) : S.filters.add(t);
  if (t === '전방') S.filters.delete('후방'); if (t === '후방') S.filters.delete('전방');
  render();
}
function toggleSheet() { if (innerWidth >= 1200) return; setSheet(!S.sheetFull); }
function setSheet(v) { S.sheetFull = v; $('#sheet').classList.toggle('full', v); $$('.seg-view button').forEach((b, i) => b.classList.toggle('on', i === (v ? 1 : 0))); }
function openCond() {
  modal(`<h3>검색 조건</h3>
    <div class="field"><label>날짜</label><input class="input" type="date" id="mDate" value="${S.q.date}"></div>
    <div class="row"><div class="field grow"><label>기준 시간</label><select class="select input" id="mHour">${Array.from({ length: 24 }, (_, h) => `<option value="${h}" ${h === S.q.hour ? 'selected' : ''}>${h}시</option>`).join('')}</select></div>
      <div class="field grow"><label>범위</label><select class="select input" id="mRange">${[1, 2, 3].map(n => `<option value="${n}" ${n === S.q.range ? 'selected' : ''}>±${n}시간</option>`).join('')}</select></div></div>
    <div class="field"><label>검색 반경 <b id="mRv">${S.q.radius}m</b></label><input class="range" type="range" min="100" max="1000" step="100" value="${S.q.radius}" id="mRadius" oninput="$('#mRv').textContent=this.value+'m'"></div>
    <button class="btn" onclick="S.q.date=$('#mDate').value;S.q.hour=+$('#mHour').value;S.q.range=+$('#mRange').value;S.q.radius=+$('#mRadius').value;closeModal();render()">적용하기</button>`);
}
function modal(html) {
  const bg = document.createElement('div'); bg.className = 'modal-bg'; bg.id = 'modal';
  bg.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${html}</div>`;
  bg.addEventListener('click', e => { if (e.target === bg) closeModal(); });
  document.body.appendChild(bg);
}
function closeModal() { $('#modal')?.remove(); }

/* =========================================================
   S-02 영상 상세
   ========================================================= */
function video(id) {
  const v = VIDEOS.find(x => x.id === id); if (!v) return notFound();
  const d = new Date(S.q.date);
  return `
  <div class="topbar"><button class="icon-btn" onclick="history.length>1?history.back():go('/search')" aria-label="뒤로">${I.back}</button><h1>영상 상세</h1>
    <button class="btn sm sec2" onclick="reportVideo()">${I.flag}신고</button></div>
  <div class="wrap detail-wrap">
    <div class="detail">
      <div class="stage" id="stage">
        <div class="scene ${v.scene}"></div>
        <span class="priv">${I.eyeoff}얼굴·번호판 블러</span><span class="shud">REC ${v.time} · ${v.q}</span>
        <button class="cover" onclick="playPreview()" aria-label="2초 미리보기 재생"><span class="pb">${I.play}</span><small>2초 미리보기 (블러)</small></button>
        <div class="bar"></div>
        <div class="end"><b>미리보기가 끝났어요</b><span>원본은 인증된 사건 당사자만 구매할 수 있어요</span>
          <button class="btn sm light" style="margin-top:6px" onclick="playPreview()">다시 보기</button></div>
      </div>
      <div>
        <div class="when">${ymd(d)} ${v.time}</div>
        <div class="row small muted" style="margin-top:4px">${I.pin}<span>${v.place} · ${v.dir} · 검색 중심에서 ${v.dist}m</span></div>
      </div>
      <div class="badges">${trustBadges()}</div>
      <div class="card" style="padding:16px">
        <dl class="kv">
          <dt>촬영 기기</dt><dd>${v.device}</dd>
          <dt>화질</dt><dd>${v.q}</dd>
          <dt>길이</dt><dd>${durText(v.dur)}</dd>
          <dt>카테고리</dt><dd>${v.cat}</dd>
          <dt>메타데이터</dt><dd>GPS·시간 자동 추출 (기기 기록)</dd>
        </dl>
      </div>
      <div class="anon">${I.lock}<div><b>판매자 정보는 비공개입니다</b><br><span class="muted">구매 가능: 인증된 사건 당사자 (본인·대리인·보험사)</span></div></div>
      <div class="notice">${I.info}<div>원본에는 구매자 고유의 보이지 않는 워터마크가 삽입돼요. 증거 목적 외 사용·재배포는 이용계약 위반이에요.</div></div>
      <div style="height:80px" class="mo-spacer"></div>
    </div>
    <aside class="card aside-buy">
      <div class="small muted">영상 1건</div>
      <div class="price-big">${won(v.price)}</div>
      <ul class="contract" style="padding:0 0 16px">
        <li>${I.shield}당사자 인증 후 구매</li><li>${I.dl}워터마크 원본 + 진본 확인서 PDF</li><li>${I.clock}다운로드 기한 30일</li>
      </ul>
      <button class="btn" onclick="startBuy(${v.id})">구매하기</button>
    </aside>
  </div>
  <div class="buybar"><div class="pr">${won(v.price)}<small>인증된 당사자만 구매</small></div><button class="btn" onclick="startBuy(${v.id})">구매하기</button></div>`;
}
function playPreview() {
  const s = $('#stage'); s.classList.remove('ended', 'playing'); void s.offsetWidth;
  s.classList.add('playing'); setTimeout(() => { s.classList.add('ended'); }, 2000);
}
function reportVideo() {
  modal(`<h3>영상 신고</h3><div class="radio-list">
    ${['내 얼굴·차량이 블러 처리되지 않았어요', '조작·편집된 영상 같아요', '타인의 영상을 무단으로 올렸어요', '사건과 무관한 감시·미행 영상이에요'].map((t, i) => `<label class="radio"><input type="radio" name="rp" ${i ? '' : 'checked'}>${t}</label>`).join('')}
    </div><button class="btn" style="margin-top:16px" onclick="closeModal();toast('신고가 접수됐어요. 운영자가 24시간 내 검토합니다')">신고하기</button>`);
}
function startBuy(id) { S.buy = { step: S.buy.verified ? 2 : 1, verified: S.buy.verified, agreed: false, method: 'case', pay: 'card' }; go('/buy/' + id); }

/* =========================================================
   P-01 ~ P-03 구매 흐름
   ========================================================= */
function buy(id) {
  const v = VIDEOS.find(x => x.id === id); if (!v) return notFound();
  const b = S.buy; const steps = ['당사자 인증', '이용계약·결제', '다운로드'];
  const stepper = `<div class="stepper">${steps.map((s, i) => `<div class="${i + 1 === b.step ? 'on' : i + 1 < b.step ? 'done' : ''}"><i></i><span>${i + 1}. ${s}</span></div>`).join('')}</div>`;
  const mini = `<div class="file-ok" style="margin-bottom:18px">${thumb(v)}<div class="grow"><b>${v.time.slice(0, 5)} ${v.place}</b><div class="small muted">${v.device} · ${v.q}</div></div><b>${won(v.price)}</b></div>`;
  let body = '';
  if (b.step === 1) body = `
    <h2 class="h1" style="font-size:22px">사건 당사자 인증</h2>
    <p class="lead small" style="margin-bottom:18px">원본은 사건 당사자(본인·변호사·보험사)만 구매할 수 있어요. 최초 1회 본인인증 + 사건별 증빙이 필요해요.</p>
    <div class="flabel" style="margin-bottom:8px">증빙 유형</div>
    <div class="radio-list" id="vMethod">
      <label class="radio"><input type="radio" name="vm" value="case" ${b.method === 'case' ? 'checked' : ''}><div>사고접수번호<small>경찰 사고 접수 후 받은 번호</small></div></label>
      <label class="radio"><input type="radio" name="vm" value="ins" ${b.method === 'ins' ? 'checked' : ''}><div>보험 접수번호<small>보험사 사고 접수번호</small></div></label>
      <label class="radio"><input type="radio" name="vm" value="doc" ${b.method === 'doc' ? 'checked' : ''}><div>서류 업로드<small>진단서·고소장 접수증·위임장 등</small></div></label>
    </div>
    <div class="field" style="margin-top:14px" id="vInput"></div>
    <div class="notice small">${I.lock}<div>제출한 정보는 인증 심사에만 쓰이고 판매자에게 공개되지 않아요.</div></div>
    <div class="sticky-cta"><button class="btn" id="vBtn" onclick="verify(${id})">인증 요청</button></div>`;
  if (b.step === 2) body = `
    <h2 class="h1" style="font-size:22px">이용계약 확인 및 결제</h2>
    <div class="notice small" style="margin:12px 0 16px;background:var(--ok-bg);color:var(--ok)">${I.check}<div><b>당사자 인증 완료</b> · 사고접수번호 확인됨</div></div>
    <div class="card"><ul class="contract">
      <li>${I.shield}<div><b>증거 목적으로만 사용</b><br><span class="muted small">수사·소송·보험 청구 등 사건 해결 목적</span></div></li>
      <li>${I.x}<div><b>재배포·SNS 게시 금지</b><br><span class="muted small">위반 시 손해배상 및 위약금이 청구될 수 있어요</span></div></li>
      <li>${I.wm}<div><b>고유 워터마크 삽입</b><br><span class="muted small">유출 시 워터마크로 유출자를 특정해요</span></div></li>
    </ul></div>
    <label class="check" style="margin-top:12px"><input type="checkbox" id="agree" ${b.agreed ? 'checked' : ''} onchange="S.buy.agreed=this.checked;$('#payBtn').disabled=!this.checked">
      <span><b>위 이용계약에 동의합니다</b> <a class="small muted" style="text-decoration:underline" onclick="event.preventDefault();toast('이용계약 전문 (프로토타입)')">전문 보기</a></span></label>
    <div class="flabel" style="margin:18px 0 8px">결제수단</div>
    <div class="radio-list">
      ${[['card', '신용·체크카드'], ['easy', '간편결제'], ['bank', '계좌이체']].map(([k, t]) => `<label class="radio"><input type="radio" name="pay" ${b.pay === k ? 'checked' : ''} onchange="S.buy.pay='${k}'">${t}</label>`).join('')}
    </div>
    <div class="card pay-sum" style="margin-top:14px"><div class="row"><span class="muted">영상 1건</span><span>${won(v.price)}</span></div>
      <div class="row tot"><span>결제 금액</span><span>${won(v.price)}</span></div></div>
    <div class="sticky-cta"><button class="btn" id="payBtn" ${b.agreed ? '' : 'disabled'} onclick="pay(${id})">${won(v.price)} 결제</button></div>`;
  if (b.step === 3) body = `
    <div class="done-hero"><div class="ic">${I.check}</div><h2 class="h1" style="font-size:22px">구매 완료</h2><p class="lead small">원본과 진본 확인서를 내려받으세요</p></div>
    <div class="dl" style="margin-top:16px">
      <button class="btn" onclick="toast('원본 다운로드 시작 (프로토타입)')">${I.dl}원본 다운로드 · ${v.q} ${durText(v.dur)}</button>
      <button class="btn sec2" onclick="toast('영상 진본 확인서 PDF (프로토타입)')">${I.doc}진본 확인서 PDF</button>
    </div>
    <div class="card" style="padding:16px;margin-top:16px">
      <dl class="kv"><dt>다운로드 기한</dt><dd>30일 (${mmdd(new Date(Date.now() + 30 * 864e5))}까지)</dd><dt>워터마크 ID</dt><dd>WT-${id}A7-${Math.floor(Math.random() * 9000 + 1000)}</dd></dl>
      <div class="flabel" style="margin:12px 0 6px">원본 해시값 (SHA-256)</div>
      <div class="hash">9f2c4e1ab07d3355e8c1f0a6b2d94e7c51a3f80e6d2b7c94a1e05f3d8b6c2a71</div>
    </div>
    <div class="notice warn small" style="margin-top:14px">${I.info}<div>증거 목적 외 사용·재배포 시 이용계약에 따라 손해배상 및 위약금이 청구될 수 있어요.</div></div>
    <div class="row" style="margin-top:16px"><a class="btn sec2" href="#/my">구매 내역 보기</a><a class="btn ghost" href="#/search">다른 영상 찾기</a></div>`;
  return `<div class="topbar"><button class="icon-btn" onclick="${b.step === 3 ? "go('/my')" : `buyBack(${id})`}" aria-label="뒤로">${I.back}</button><h1>구매하기</h1><span class="step">${b.step}/3</span></div>
    <div class="narrow">${stepper}${b.step < 3 ? mini : ''}${body}</div>`;
}
buy.after = id => {
  if (S.buy.step !== 1) return;
  const draw = () => {
    const m = $('input[name=vm]:checked').value; S.buy.method = m;
    $('#vInput').innerHTML = m === 'doc'
      ? `<label class="flabel">서류 첨부</label><label class="drop" style="padding:18px"><input type="file" hidden accept="image/*,.pdf" onchange="this.closest('.drop').querySelector('b').textContent=this.files[0]?.name||'파일 선택'"><b>파일 선택</b><small>JPG·PNG·PDF · 10MB 이하</small></label>`
      : `<label class="flabel" for="vNum">${m === 'case' ? '사고접수번호' : '보험 접수번호'}</label><input class="input" id="vNum" inputmode="numeric" placeholder="${m === 'case' ? '예) 2026-112-0001234' : '예) A2611260012'}">`;
  };
  $$('input[name=vm]').forEach(r => r.addEventListener('change', draw)); draw();
};
function buyBack(id) { if (S.buy.step > 1) { S.buy.step--; render(); } else go('/video/' + id); }
function verify(id) {
  const btn = $('#vBtn'); btn.disabled = true; btn.textContent = '인증 확인 중…';
  setTimeout(() => { S.buy.verified = true; S.buy.step = 2; render(); toast('당사자 인증이 완료됐어요'); }, 1100);
}
function pay(id) {
  const btn = $('#payBtn'); btn.disabled = true; btn.textContent = '결제 진행 중…';
  setTimeout(() => { S.buy.step = 3; if (!MY.purchases.find(p => p.vid === id)) MY.purchases.unshift({ vid: id, date: mmdd(today).split('(')[0], left: 30 }); render(); }, 1000);
}

/* =========================================================
   U-01 / U-02 영상 올리기
   ========================================================= */
function upload() {
  const u = S.up; const steps = ['영상·정보', '정책 확인', '확인·제출'];
  const stepper = `<div class="stepper">${steps.map((s, i) => `<div class="${i + 1 === u.step ? 'on' : i + 1 < u.step ? 'done' : ''}"><i></i><span>${s}</span></div>`).join('')}</div>`;
  let body = '';
  if (u.step === 1) body = `
    ${u.file ? `<div class="file-ok">${thumb({ scene: '', dur: 45 })}<div class="grow"><b style="word-break:break-all">${u.file}</b><div class="small muted">업로드 준비 완료 · 원본은 암호화 보관</div></div><button class="btn sm sec2" onclick="S.up.file=null;render()">변경</button></div>
      <div class="auto" style="margin-top:14px">
        <div class="auto-h">${I.check}자동으로 읽은 정보</div>
        <div class="auto-row">${I.clock}<span class="v">${ymd(today)} 18:12</span><button onclick="toast('시간 직접 수정 (프로토타입)')">수정</button></div>
        <div class="auto-row">${I.pin}<span class="v">OO사거리 인근 · GPS 기록</span><button onclick="toast('지도에서 핀을 끌어 위치를 수정하세요')">수정</button></div>
        <div class="mini-map" style="position:relative">${mapHTML([{ id: 0, x: 55, y: 45, place: '촬영 위치' }], { radius: false, numbered: false, ctrl: false })}</div>
      </div>
      <div class="field" style="margin-top:16px"><label>카테고리</label><select class="select input" onchange="S.up.cat=this.value">
        <option>교통사고</option><option disabled>폭행·시비 (2단계 오픈)</option><option disabled>재해·시설사고 (2단계 오픈)</option></select></div>
      <div class="field"><label>한 줄 설명</label><input class="input" maxlength="60" placeholder="예) 사거리 진입 중 우측 차량 신호위반 추돌" value="${u.desc}" oninput="S.up.desc=this.value"><span class="small muted">사람·차량번호 등 개인정보는 적지 마세요</span></div>
      <div class="field"><label>가격</label><div class="price-box"><b>10,000원</b><span class="tag ok">추천</span><span class="grow"></span><span class="small muted">기본 가격</span></div>
        <div class="earn">1건 판매 시 정산 <b>8,800원</b> (수수료 12%) · 피해자·가해자·보험사 2곳이 각각 사면 <b>35,200원</b></div></div>
      <div class="sticky-cta"><button class="btn" onclick="S.up.step=2;render()">다음</button></div>`
    : `<label class="drop" id="drop"><input type="file" accept="video/*" hidden onchange="pickFile(this.files[0])">
        <div class="ic">${I.plus}</div><b>영상 선택</b><small>블랙박스·CCTV·휴대폰 영상 · 최대 2GB</small></label>
      <button class="btn ghost" style="margin-top:10px" onclick="pickFile({name:'REC_20261126_181240_F.mp4'})">샘플 영상으로 체험하기</button>
      <div class="notice small" style="margin-top:16px">${I.info}<div>업로드하면 서버에서 시간·GPS를 자동으로 읽고, 얼굴·번호판을 블러 처리한 2초 미리보기를 만들어요. 휴대폰에서는 데이터 대신 Wi-Fi 업로드를 권장해요.</div></div>`}`;
  if (u.step === 2) body = `
    <h2 class="h1" style="font-size:22px">올릴 수 있는 영상인지 확인해 주세요</h2>
    <div class="policy" style="margin-top:16px">
      <div class="card yes"><h3>올릴 수 있어요</h3><ul>
        <li>${I.check}본인 차량 블랙박스, 본인이 소유·관리하는 CCTV</li><li>${I.check}본인이 현장에서 직접 촬영한 영상</li>
        <li>${I.check}편집하지 않은 원본 (편집 시 표시 필요)</li><li>${I.check}촬영 후 1년 이내 영상</li></ul></div>
      <div class="card no"><h3>올릴 수 없어요</h3><ul>
        <li>${I.x}타인의 블랙박스·CCTV를 몰래 복사한 영상</li><li>${I.x}조작·짜깁기, 방송·SNS에서 퍼온 영상</li>
        <li>${I.x}성적 영상, 아동이 주인공인 영상, 자해 장면</li><li>${I.x}사건과 무관한 특정인 미행·감시 영상</li></ul></div>
    </div>
    <label class="check" style="margin-top:14px"><input type="checkbox" ${u.pledge ? 'checked' : ''} onchange="S.up.pledge=this.checked;$('#nx').disabled=!this.checked">
      <span><b>직접 촬영했거나 적법하게 보유한 영상임을 서약합니다</b><br><span class="small muted">허위일 경우 판매 정지 및 정산이 보류돼요</span></span></label>
    <div class="sticky-cta"><div class="row"><button class="btn sec2" style="width:35%" onclick="S.up.step=1;render()">이전</button><button class="btn" id="nx" ${u.pledge ? '' : 'disabled'} onclick="S.up.step=3;render()">다음</button></div></div>`;
  if (u.step === 3) body = `
    <h2 class="h1" style="font-size:22px">이대로 제출할까요?</h2>
    <div class="card" style="padding:16px;margin-top:16px"><dl class="kv">
      <dt>파일</dt><dd style="word-break:break-all">${u.file}</dd><dt>촬영 일시</dt><dd>${ymd(today)} 18:12</dd><dt>위치</dt><dd>OO사거리 인근</dd>
      <dt>카테고리</dt><dd>${u.cat}</dd><dt>설명</dt><dd>${u.desc || '<span class="muted">(없음)</span>'}</dd><dt>가격</dt><dd>10,000원</dd><dt>서약</dt><dd style="color:var(--ok)">동의함</dd></dl></div>
    <div class="notice small" style="margin-top:14px">${I.lock}<div>판매자 닉네임·프로필은 구매자에게 공개되지 않아요. 정산 계좌는 마이 › 정산에서 등록해요.</div></div>
    <div class="sticky-cta"><div class="row"><button class="btn sec2" style="width:35%" onclick="S.up.step=2;render()">이전</button><button class="btn" onclick="go('/upload/done')">제출하기</button></div></div>`;
  return `<div class="topbar"><button class="icon-btn" onclick="${u.step > 1 ? 'S.up.step--;render()' : "go('/')"}" aria-label="뒤로">${I.back}</button><h1>영상 올리기</h1><span class="step">${u.step}/3</span></div>
    <div class="narrow">${stepper}${body}</div>`;
}
upload.after = () => {
  const d = $('#drop'); if (!d) return;
  ['dragenter', 'dragover'].forEach(e => d.addEventListener(e, ev => { ev.preventDefault(); d.classList.add('drag'); }));
  ['dragleave', 'drop'].forEach(e => d.addEventListener(e, ev => { ev.preventDefault(); d.classList.remove('drag'); }));
  d.addEventListener('drop', ev => pickFile(ev.dataTransfer.files[0]));
};
function pickFile(f) { if (!f) return; S.up.file = f.name; render(); toast('시간·GPS 정보를 자동으로 읽었어요'); }

function uploadDone() {
  const steps = [['업로드 완료', '원본 암호화 보관'], ['얼굴·번호판 자동 블러', '2초 미리보기 생성'], ['포렌식 워터마크 준비', '구매 시 구매자별 삽입'], ['AI 1차 심사', '유해성·중복 확인'], ['운영자 2차 심사', '보통 24시간 이내']];
  return `<div class="topbar"><button class="icon-btn" onclick="go('/')" aria-label="닫기">${I.x}</button><h1>업로드 완료 · 심사 대기</h1></div>
  <div class="narrow">
    <div class="done-hero"><div class="ic">${I.check}</div><h2 class="h1" style="font-size:22px">영상이 접수됐어요</h2><p class="lead small">처리가 끝나면 알림으로 알려드려요. 이 화면을 닫아도 계속 진행돼요.</p></div>
    <ol class="card prog" id="prog" style="margin-top:18px">${steps.map(([t, s]) => `<li><span class="st"></span><div><b>${t}</b><small>${s}</small></div></li>`).join('')}</ol>
    <div class="card" style="padding:16px;margin-top:14px"><div class="small muted">예상 수익 (1건 판매 기준)</div><div class="money">8,800원</div>
      <div class="small muted">구매 확정 7일 후 정산 · 같은 영상이 여러 당사자에게 팔리면 건마다 정산돼요</div></div>
    <div class="row" style="margin-top:16px"><a class="btn sec2" href="#/my" onclick="S.myTab='sell'">판매 관리</a><a class="btn" href="#/upload" onclick="S.up={step:1,file:null,pledge:false,cat:'교통사고',desc:''}">다른 영상 올리기</a></div>
  </div>`;
}
uploadDone.after = () => {
  const lis = $$('#prog li'); let i = 0;
  const tick = () => {
    if (!document.body.contains(lis[0])) return;
    lis.forEach((li, k) => { li.className = k < i ? 'done' : k === i ? 'doing' : ''; li.querySelector('.st').innerHTML = k < i ? I.check : ''; });
    if (i < lis.length - 1) { i++; setTimeout(tick, 900); }
  };
  tick();
  if (!MY.sales.find(s => s.vid === 5)) MY.sales.unshift({ vid: 5, status: '심사 중', sold: 0, earn: 0 });
};

/* =========================================================
   R-01 / R-02 목격 요청 (2단계)
   ========================================================= */
function requests() {
  return `
  <div class="s-bar"><div class="s-sum"><button class="icon-btn" onclick="go('/')" aria-label="뒤로">${I.back}</button>
    <button class="cond" onclick="toast('알림 반경은 마이 › 알림 설정에서 바꿀 수 있어요')">${I.pin}<span>내 주변 500m 목격 요청</span></button></div>
    <div class="row" style="justify-content:space-between"><span class="tag phase">R-01 · 2단계 기능</span><a class="btn sm" href="#/requests/new">${I.plus}요청 올리기</a></div></div>
  <div class="s-layout">
    <div class="s-map">${mapHTML(REQUESTS, { gift: true })}</div>
    <div class="sheet ${S.sheetFull ? 'full' : ''}" id="sheet">
      <div class="sheet-h" onclick="toggleSheet()"><div class="row"><b>목격 요청 ${REQUESTS.length}건</b>
        <div class="seg seg-view" onclick="event.stopPropagation()"><button class="${!S.sheetFull ? 'on' : ''}" onclick="setSheet(false)">지도</button><button class="${S.sheetFull ? 'on' : ''}" onclick="setSheet(true)">리스트</button></div></div></div>
      <div class="sheet-body">${REQUESTS.map(r => `<a class="vcard" data-card="${r.id}" href="#/request/${r.id}"><div class="info">
        <div class="row" style="justify-content:space-between"><b>${r.title}</b>${r.bounty ? `<span class="tag gift">${I.gift}${won(r.bounty)}</span>` : ''}</div>
        <div class="m">${r.when} · ${r.dist}m</div><div class="p">${r.desc}</div></div></a>`).join('')}</div>
    </div>
  </div>`;
}
requests.after = () => {
  $$('[data-pin]').forEach(p => p.addEventListener('click', () => go('/request/' + p.dataset.pin)));
};
function requestDetail(id) {
  const r = REQUESTS.find(x => x.id === id); if (!r) return notFound();
  return `<div class="topbar"><button class="icon-btn" onclick="go('/requests')" aria-label="뒤로">${I.back}</button><h1>목격 요청</h1></div>
  <div class="narrow">
    <div class="badges">${r.bounty ? `<span class="tag gift">${I.gift}현상금 ${won(r.bounty)}</span>` : ''}<span class="tag">교통사고</span></div>
    <h2 class="h1" style="font-size:22px;margin-top:10px">${r.title}</h2>
    <div class="card" style="height:180px;position:relative;overflow:hidden;margin:16px 0">${mapHTML([r], { gift: true, ctrl: false })}</div>
    <dl class="kv card" style="padding:16px"><dt>발생 시각</dt><dd>${r.when}</dd><dt>거리</dt><dd>내 위치에서 ${r.dist}m</dd><dt>상황</dt><dd style="font-weight:500">${r.desc}</dd></dl>
    <div class="notice small" style="margin-top:14px">${I.lock}<div>요청자 정보와 응답한 판매자 정보는 서로 공개되지 않아요. 응답한 영상은 일반 영상과 같은 심사를 거쳐요.</div></div>
    <div class="sticky-cta"><button class="btn" onclick="go('/upload')">${I.cam}내 영상으로 응답하기</button></div>
  </div>`;
}
function requestNew() {
  return `<div class="topbar"><button class="icon-btn" onclick="history.back()" aria-label="뒤로">${I.back}</button><h1>목격 요청 올리기</h1><span class="tag phase">R-02 · 2단계</span></div>
  <div class="narrow">
    <div class="notice small" style="margin-bottom:16px;background:var(--ok-bg);color:var(--ok)">${I.check}<div>검색 조건 <b>${condText()}</b>이 그대로 채워졌어요</div></div>
    <div class="row"><div class="field grow"><label>날짜</label><input class="input" type="date" value="${S.q.date}"></div><div class="field grow"><label>시간</label><input class="input" type="time" value="${String(S.q.hour).padStart(2, '0')}:00"></div></div>
    <div class="field"><label>위치</label><div class="card" style="height:160px;position:relative;overflow:hidden">${mapHTML([], { ctrl: false })}</div></div>
    <div class="field"><label>사고 설명</label><textarea class="input" placeholder="차종·진행 방향 등 영상 찾기에 필요한 정보만 적어 주세요. 이름·연락처·차량번호는 적지 마세요."></textarea></div>
    <div class="field"><label>현상금 (선택)</label><div class="chips" id="bnt">${['없음', '1만원', '3만원', '5만원'].map((t, i) => `<button class="chip ${i ? '' : 'on'}" onclick="$$('#bnt .chip').forEach(c=>c.classList.remove('on'));this.classList.add('on')">${t}</button>`).join('')}</div>
      <span class="small muted">현상금은 영상 구매 확정 시 지급되며 수수료 12%가 포함돼요</span></div>
    <label class="check"><input type="checkbox"><span><b>긴급 요청</b> · 상단 노출 + 반경 1km 알림 확대 <span class="tag">유료 옵션</span></span></label>
    <div class="sticky-cta"><button class="btn" onclick="toast('주변 업로더 23명에게 알림을 보냈어요');setTimeout(()=>go('/requests'),900)">요청 올리기</button></div>
  </div>`;
}

/* =========================================================
   M-01~03 마이페이지
   ========================================================= */
function my() {
  const t = S.myTab;
  const tabs = [['buy', '구매 내역'], ['sell', '판매 관리'], ['settle', '정산'], ['req', '내 목격 요청'], ['set', '알림·인증']];
  let body = '';
  if (t === 'buy') body = MY.purchases.map(p => { const v = VIDEOS.find(x => x.id === p.vid); return `<div class="list-row">${thumb(v)}<div class="grow"><b>${v.time.slice(0, 5)} ${v.place}</b>
      <div class="small muted">${p.date} 구매 · 다운로드 기한 <b style="color:${p.left <= 7 ? 'var(--warn)' : 'inherit'}">${p.left}일 남음</b></div></div>
      <button class="btn sm sec2" onclick="toast('원본 다운로드 (프로토타입)')" aria-label="다운로드">${I.dl}</button></div>`; }).join('');
  if (t === 'sell') body = MY.sales.map(s => { const v = VIDEOS.find(x => x.id === s.vid); const cls = s.status === '판매 중' ? 'ok' : s.status === '반려' ? 'warn' : '';
    return `<div class="list-row">${thumb(v)}<div class="grow"><div class="row"><b>${v.place}</b><span class="tag ${cls}">${s.status}</span></div>
      <div class="small muted">${s.reason ? '반려 사유: ' + s.reason : `판매 ${s.sold}건 · 수익 ${won(s.earn)}`}</div></div></div>`; }).join('');
  if (t === 'settle') body = `
    <div class="card" style="padding:18px;margin:16px 0"><div class="small muted">정산 예정</div><div class="money">17,600원</div><div class="small muted">12/03 지급 예정 · 구매 확정 후 7일</div>
      <div class="row" style="margin-top:14px;justify-content:space-between;font-size:14px"><span class="muted">누적 정산 완료</span><b>8,800원</b></div></div>
    <div class="list-row"><div class="grow"><b>정산 계좌</b><div class="small muted">등록된 계좌가 없어요</div></div><button class="btn sm" onclick="toast('계좌 등록은 본인 명의 계좌만 가능해요')">등록</button></div>
    <div class="list-row"><div class="grow"><b>세금 정보</b><div class="small muted">원천징수 정책 확정 후 안내 예정</div></div></div>
    <div class="list-row"><div class="grow"><b>11/19</b><div class="small muted">OO사거리 남측 · 1건</div></div><b>+8,800원</b></div>`;
  if (t === 'req') body = `<div class="list-row"><div class="grow"><b>${REQUESTS[0].title}</b><div class="small muted">응답 영상 2건 도착 · 현상금 ${won(REQUESTS[0].bounty)}</div></div><a class="btn sm" href="#/request/1">보기</a></div>`;
  if (t === 'set') body = `
    <div class="field" style="margin-top:16px"><label>내 주변 목격 요청 알림 반경 <b id="nr">500m</b></label><input class="range" type="range" min="100" max="2000" step="100" value="500" oninput="$('#nr').textContent=this.value+'m'"></div>
    <label class="check" style="margin-bottom:10px"><input type="checkbox" checked><span>판매·심사 결과 알림</span></label>
    <label class="check"><input type="checkbox" checked><span>내 주변 목격 요청 푸시 (PWA·앱)</span></label>
    <div class="list-row" style="margin-top:10px"><div class="grow"><b>본인인증</b><div class="small muted">휴대폰 본인인증 완료</div></div><span class="tag ok">${I.check}완료</span></div>
    <div class="list-row"><div class="grow"><b>당사자 인증 서류</b><div class="small muted">사건별 증빙 1건</div></div><button class="btn sm sec2">관리</button></div>`;
  return `<div class="narrow">
    <div class="card"><div class="me-head"><div class="av">${I.user}</div><div class="grow"><b style="font-size:17px">내 계정</b><div class="small muted">본인인증 완료 · 판매자 익명 보호 중</div></div></div>
      <div class="me-stats"><div><b>${MY.purchases.length}</b><small>구매</small></div><div><b>${MY.sales.length}</b><small>판매 영상</small></div><div><b>17,600</b><small>정산 예정</small></div></div></div>
    <div class="tabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" class="${t === k ? 'on' : ''}" onclick="S.myTab='${k}';render()">${l}</button>`).join('')}</div>
    <div>${body}</div>
    <a class="card row" href="#/leak" style="padding:16px;margin-top:20px">${I.link}<div class="grow"><b>유출 신고 센터</b><div class="small muted">내 영상이 SNS에 퍼졌다면 워터마크로 추적해요</div></div>›</a>
  </div>`;
}

/* =========================================================
   L-01 유출 신고 센터 (2단계)
   ========================================================= */
function leak() {
  return `<div class="topbar"><button class="icon-btn" onclick="go('/my')" aria-label="뒤로">${I.back}</button><h1>유출 신고 센터</h1><span class="tag phase">L-01 · 2단계</span></div>
  <div class="narrow" id="leakBox">
    <h2 class="h1" style="font-size:22px">유출된 영상을 신고하세요</h2>
    <p class="lead small">워터마크를 판독해 유출 사본의 구매자를 특정하고, 유출 추적 리포트를 발급해요.</p>
    <div class="field" style="margin-top:18px"><label>유출된 게시물 URL</label><input class="input" id="lkUrl" type="url" placeholder="https://"></div>
    <div class="field"><label>내 영상 선택</label><select class="select input">${MY.sales.map(s => { const v = VIDEOS.find(x => x.id === s.vid); return `<option>${v.place} (${v.time.slice(0, 5)})</option>`; }).join('')}</select></div>
    <div class="sticky-cta"><button class="btn" onclick="leakGo()">신고 접수</button></div>
  </div>`;
}
function leakGo() {
  const box = $('#leakBox');
  box.innerHTML = `<ol class="card prog" id="prog">${[['신고 접수', '방금'], ['워터마크 판독', '유출 사본 분석'], ['유출 추적 리포트 발급', '구매 이력·워터마크 ID 정리']].map(([t, s]) => `<li><span class="st"></span><div><b>${t}</b><small>${s}</small></div></li>`).join('')}</ol>
    <div id="leakRes"></div>`;
  const lis = $$('#prog li'); let i = 0;
  const tick = () => {
    lis.forEach((li, k) => { li.className = k < i ? 'done' : k === i ? 'doing' : ''; li.querySelector('.st').innerHTML = k < i ? I.check : ''; });
    if (i < lis.length) { i++; setTimeout(tick, 900); } else {
      $('#leakRes').innerHTML = `<div class="card" style="padding:16px;margin-top:14px"><b>추적 결과</b><dl class="kv" style="margin-top:10px"><dt>워터마크 ID</dt><dd>WT-2B9-4471</dd><dt>구매 일시</dt><dd>11/19 21:03</dd><dt>구매 유형</dt><dd>개인 당사자</dd></dl>
        <button class="btn sec2" style="margin-top:14px" onclick="toast('유출 추적 리포트 PDF (프로토타입)')">${I.doc}유출 추적 리포트 다운로드</button></div>
        <div class="card" style="padding:16px;margin-top:12px"><b>제휴 변호사 안내</b><p class="small muted" style="margin:4px 0 12px">아래는 정액 광고형 제휴 목록이에요. 위트니스는 사건을 알선하지 않으며, 수임 여부는 직접 선택·상담하세요.</p>
          ${['법률사무소 A', '법무법인 B', '법률사무소 C'].map(n => `<div class="list-row"><div class="grow"><b>${n}</b><div class="small muted">계약 위반·손해배상 · 광고</div></div><button class="btn sm sec2">정보 보기</button></div>`).join('')}</div>`;
    }
  };
  tick();
}

/* =========================================================
   A-01 관리자 심사 큐 (웹 전용)
   ========================================================= */
function admin() {
  const q = VIDEOS.slice(0, 5).map((v, i) => ({ ...v, ai: ['통과', '통과', '중복 의심', '통과', '얼굴 블러 누락 의심'][i], up: ['5분 전', '12분 전', '40분 전', '1시간 전', '2시간 전'][i] }));
  const s = q[S.admSel];
  return `<div class="wrap adm">
    <div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:8px"><h2 class="h1" style="font-size:24px">심사 큐 <span class="muted" style="font-size:16px">${q.length}건 대기</span></h2><span class="tag phase">A-01 · 관리자 · 웹 전용</span></div>
    <div class="notice small mo-only">${I.info}<div>관리자 화면은 데스크톱(1200px 이상) 사용을 기준으로 설계됐어요.</div></div>
    <div style="display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(320px,1fr))">
      <div class="card" style="overflow:auto"><table><thead><tr><th>#</th><th>영상</th><th>AI 1차</th><th>접수</th></tr></thead><tbody>
        ${q.map((v, i) => `<tr class="${i === S.admSel ? 'on' : ''}" onclick="S.admSel=${i};render()"><td>${v.id}</td><td><b>${v.place}</b><br><span class="muted small">${v.device} · ${v.q}</span></td>
          <td><span class="tag ${v.ai === '통과' ? 'ok' : 'warn'}">${v.ai}</span></td><td class="muted">${v.up}</td></tr>`).join('')}</tbody></table></div>
      <div class="card" style="padding:16px;display:grid;gap:14px">
        <div class="stage"><div class="scene ${s.scene}"></div><span class="priv">${I.eyeoff}블러 적용본</span></div>
        <div class="row" style="flex-wrap:wrap;gap:8px"><label class="check" style="padding:10px"><input type="checkbox" checked>얼굴 블러 확인</label><label class="check" style="padding:10px"><input type="checkbox" ${s.ai === '얼굴 블러 누락 의심' ? '' : 'checked'}>번호판 블러 확인</label><label class="check" style="padding:10px"><input type="checkbox" checked>메타데이터 일치</label></div>
        <div class="field" style="margin:0"><label>반려 사유</label><select class="select input"><option>선택 안 함 (승인)</option><option>블러 재처리 필요</option><option>중복 영상</option><option>정책 위반 (불가 콘텐츠)</option><option>메타데이터 불일치</option></select></div>
        <div class="row"><button class="btn sec2" onclick="toast('반려 처리 · 판매자에게 사유 알림')">반려</button><button class="btn" onclick="toast('승인 · 공개 처리되었어요')">승인</button></div>
      </div>
    </div></div>`;
}

function notFound() { return `<div class="narrow empty"><b>화면을 찾을 수 없어요</b><p><a href="#/">홈으로</a></p></div>`; }

/* ---------- 전체 메뉴(화면 목록) ---------- */
$('#drawerBody').innerHTML = [
  ['서비스', [['H-01', '홈', '#/'], ['S-01', '영상 찾기 (검색 결과)', '#/search'], ['S-02', '영상 상세', '#/video/1'], ['R-01', '목격 요청 목록', '#/requests', '2단계'], ['R-02', '목격 요청 등록', '#/requests/new', '2단계']]],
  ['판매', [['U-01', '영상 올리기', '#/upload'], ['U-02', '업로드 완료·심사 대기', '#/upload/done']]],
  ['구매', [['P-01', '당사자 인증 → 결제 → 다운로드', '#/buy/1']]],
  ['마이', [['M-01', '구매 내역 · 판매 관리 · 정산', '#/my'], ['L-01', '유출 신고 센터', '#/leak', '2단계']]],
  ['운영', [['A-01', '관리자 – 심사 큐', '#/admin', '웹 전용']]],
].map(([g, items]) => `<h4>${g}</h4>` + items.map(([id, t, h, tag]) => `<a href="${h}"><code>${id}</code>${t}${tag ? `<span class="tag phase">${tag}</span>` : ''}</a>`).join('')).join('');

/* PWA: 서비스워커 등록 (http(s)에서만) */
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});

render();
