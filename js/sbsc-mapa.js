// Mapa interativo 'SBSC pelo Brasil' – Rafael Parizi, 2026
const K = 0.9702957262759965, SC = 15.615358020453002, LON0 = -74.2, LAT0 = 5.6;
const proj = (lat, lon) => [(lon - LON0) * K * SC, (LAT0 - lat) * SC];

const CITIES = {
  "Salvador": ["BA", -12.97, -38.50], "Ribeirão Preto": ["SP", -21.18, -47.81], "Juiz de Fora": ["MG", -21.76, -43.35],
  "Natal": ["RN", -5.79, -35.21], "Rio de Janeiro": ["RJ", -22.91, -43.17], "Vila Velha": ["ES", -20.33, -40.29],
  "Fortaleza": ["CE", -3.73, -38.52], "Belo Horizonte": ["MG", -19.92, -43.94], "Paraty": ["RJ", -23.22, -44.71],
  "São Paulo": ["SP", -23.55, -46.63], "Manaus": ["AM", -3.12, -60.02], "Curitiba": ["PR", -25.43, -49.27],
  "Porto Alegre": ["RS", -30.03, -51.23], "Belém": ["PA", -1.46, -48.49], "Recife": ["PE", -8.05, -34.88]
};
const ONLINE = proj(-17.5, -30.6);

const E = [
  { y: 2003, c: "Salvador", ed: "Trilha de CSCW", k: "trilha", n: "I Trilha de CSCW realizada dentro do WebMedia 2003. É o ponto de partida da comunidade." },
  { y: 2004, c: "Ribeirão Preto", ed: "I WCSCW", k: "workshop", n: "I Workshop Brasileiro de Tecnologias para Colaboração." },
  { y: 2005, c: "Juiz de Fora", ed: "II WCSCW", k: "workshop", m: true, n: "II Workshop Brasileiro de Tecnologias para Colaboração. Ano de criação da CESC." },
  { y: 2006, c: "Natal", ed: "III SBSC", k: "simposio", n: "Já com o nome de Simpósio Brasileiro de Sistemas Colaborativos." },
  { y: 2007, c: "Rio de Janeiro", ed: "IV SBSC", k: "simposio", n: "Primeira das três edições no Rio de Janeiro." },
  { y: 2008, c: "Vila Velha", ed: "V SBSC", k: "simposio", n: "A única edição no Espírito Santo." },
  { y: 2009, c: "Fortaleza", ed: "VI SBSC", k: "simposio", n: "Primeira edição no Ceará." },
  { y: 2010, u: "https://www.ufmg.br/swib?p=123", c: "Belo Horizonte", ed: "VII SBSC", k: "simposio", n: "Volta a Minas Gerais, cinco anos depois de Juiz de Fora." },
  { y: 2011, u: "https://www.addlabs.uff.br/sbsc_site/", c: "Paraty", ed: "VIII SBSC", k: "simposio", n: "Edição na cidade histórica do litoral fluminense." },
  { y: 2012, u: "http://sws2012.ime.usp.br/sbsc/", c: "São Paulo", ed: "IX SBSC", k: "simposio", n: "Primeira edição na capital paulista." },
  { y: 2013, c: "Manaus", ed: "X SBSC", k: "simposio", mm: ["◆ 10ª edição", "Dez edições desde o I WCSCW, em 2004."], n: "A décima edição leva o simpósio à região Norte pela primeira vez." },
  { y: 2014, u: "http://www.inf.ufpr.br/sbbd-sbsc2014/sbsc/index.htm", c: "Curitiba", ed: "XI SBSC", k: "simposio", n: "Primeira edição na região Sul, realizada junto ao SBBD." },
  { y: 2015, u: "http://ihc2015.unifacs.br/index.php/pt-BR/", c: "Salvador", ed: "XII SBSC", k: "simposio", n: "Retorno a Salvador, onde tudo começou em 2003." },
  { y: 2016, u: "https://csbc2016.wixsite.com/home", c: "Porto Alegre", ed: "XIII SBSC", k: "simposio", n: "Primeira edição no Rio Grande do Sul." },
  { y: 2017, u: "http://csbc2017.mackenzie.br/eventos/14-sbsc", c: "São Paulo", ed: "XIV SBSC", k: "simposio", n: "Segunda edição na capital paulista." },
  { y: 2018, c: "Belém", ed: "Trilha no IHC 2018", k: "trilha", n: "Não ocorreu como evento independente. Foi realizado como trilha no IHC 2018." },
  { y: 2019, u: "https://sites.google.com/ppgi.ufrj.br/sbsc-2019", c: "Rio de Janeiro", ed: "XV SBSC", k: "simposio", n: "Segunda edição no Rio de Janeiro." },
  { y: 2020, u: "http://www.wco2020.nce.ufrj.br/", c: null, ed: "WCO 2020", k: "online", n: "Sem evento presencial por causa da pandemia. Realizado como Workshop de Colaboração Online (WCO 2020)." },
  { y: 2021, u: "https://sbsc2021.uniriotec.br/", c: null, ed: "XVI SBSC", k: "online", n: "Edição realizada online." },
  { y: 2022, u: "http://www.sbsc2022.nce.ufrj.br/", c: null, ed: "XVII SBSC", k: "online", n: "Segunda edição consecutiva realizada online." },
  { y: 2023, u: "http://sbsc.sbc.org.br/2023/", c: "Rio de Janeiro", ed: "XVIII SBSC", k: "simposio", n: "Retorno ao formato presencial, no Rio de Janeiro pela terceira vez." },
  { y: 2024, u: "https://sbsc.sbc.org.br/2024/", c: "Salvador", ed: "XIX SBSC", k: "simposio", n: "Terceira passagem por Salvador." },
  { y: 2025, u: "https://sbsc.sbc.org.br/2025/", c: "Manaus", ed: "XX SBSC", k: "simposio", mm: ["◆ 20ª edição", "Vinte edições desde o I WCSCW, em 2004."], n: "A vigésima edição volta a Manaus, doze anos depois." },
  { y: 2026, u: "http://sbsc.sbc.org.br/2026/", c: "Porto Alegre", ed: "XXI SBSC", k: "simposio", n: "Realizado no Instituto de Informática da UFRGS, com organização do IFFar e da UFRGS." },
  { y: 2027, u: "https://sbsc.sbc.org.br/2027/", c: "Recife", ed: "XXII SBSC", k: "futuro", n: "Próxima edição, prevista para Recife." }
];
// Edições numeradas (I WCSCW em 2004 até o SBSC atual). Trilhas e o WCO ficam fora da contagem.
const NUMERADA = e => /^[IVXL]+ /.test(e.ed);
// WCO – Workshop de Colaboração Online, contado à parte
const WCO_ANOS = [2020, 2021, 2022];
const KIND = { simposio: "Simpósio", workshop: "Workshop", trilha: "Trilha", online: "Online", futuro: "Prevista" };
E.forEach(e => { e.p = e.c ? proj(CITIES[e.c][1], CITIES[e.c][2]) : ONLINE; e.uf = e.c ? CITIES[e.c][0] : null; });

const $ = id => document.getElementById(id);
const NS = "http://www.w3.org/2000/svg";
const svgEl = (t, a) => { const el = document.createElementNS(NS, t); for (const k in a) el.setAttribute(k, a[k]); return el; };
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

$("online").setAttribute("transform", `translate(${ONLINE[0]},${ONLINE[1]})`);

// Cidades
const cityG = {};
Object.entries(CITIES).forEach(([name, [uf, lat, lon]]) => {
  const [x, y] = proj(lat, lon);
  const g = svgEl("g", { class: "city pending", tabindex: "0", role: "button", "aria-label": name });
  g.appendChild(svgEl("circle", { class: "dot", cx: x, cy: y, r: 5 }));
  const left = ["Manaus", "Ribeirão Preto", "São Paulo", "Curitiba", "Porto Alegre", "Belém", "Paraty"].includes(name);
  const t = svgEl("text", { x: left ? x - 10 : x + 10, y: y + 4, "text-anchor": left ? "end" : "start" });
  t.textContent = name;
  g.appendChild(t);
  const go = () => { const last = E.map((e, i) => [e, i]).filter(([e, i]) => e.c === name && i <= Math.max(cur, 0)).pop(); jump(last ? last[1] : E.findIndex(e => e.c === name)); };
  g.addEventListener("click", go);
  g.addEventListener("keydown", ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); go(); } });
  $("cities").appendChild(g);
  cityG[name] = g;
});

// Linha do tempo e lista
E.forEach((e, i) => {
  const b = document.createElement("button");
  b.className = `tick k-${e.k}${e.m ? " milestone" : ""}${e.mm ? " minor" : ""}`; b.id = `t${e.y}`;
  b.innerHTML = `${e.m ? '<em class="star" aria-hidden="true">★</em>' : ""}${e.mm ? '<em class="star" aria-hidden="true">◆</em>' : ""}<i></i><span>${String(e.y).slice(2)}</span>`;
  b.setAttribute("aria-label", `${e.y}: ${e.ed}, ${e.c || "online"}`);
  b.onclick = () => jump(i);
  $("ticks").appendChild(b);
  const r = document.createElement("button");
  r.className = `row k-${e.k}`;
  r.innerHTML = `<span class="y">${e.y}</span><span class="c">${e.c ? `${e.c} · ${e.uf}` : "Online"}${e.m ? '<span class="badge">★ Criação da CESC</span>' : ""}${e.mm ? `<span class="badge minor">${e.mm[0]}</span>` : ""}</span><span class="e">${e.ed}. ${e.n}</span>`;
  r.onclick = () => { jump(i); $("map").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }); };
  const item = document.createElement("div");
  item.className = `item${e.m ? " milestone" : ""}`;
  item.appendChild(r);
  if (e.u) {
    const a = document.createElement("a");
    a.className = "row-link"; a.href = e.u; a.target = "_blank"; a.rel = "noopener";
    a.textContent = "Visitar o site ↗";
    a.setAttribute("aria-label", `Visitar o site do ${e.ed} (${e.y})`);
    item.appendChild(a);
  }
  $("list").prepend(item);
});
{
  const real = E.filter(e => e.k !== "futuro" && NUMERADA(e));
  const cities = new Set(real.filter(e => e.c).map(e => e.c));
  const ufs = new Set(real.filter(e => e.c).map(e => e.uf));
  const co = ["MT", "MS", "GO", "DF"].some(u => ufs.has(u));
  $("subList").textContent = `Até 2026 foram ${real.length} edições numeradas (I WCSCW a ${real[real.length - 1].ed}), em ${cities.size} cidades de ${ufs.size} estados${co ? "" : ", e o evento ainda não chegou ao Centro-Oeste"}. À parte dessa numeração, a CESC realizou ${WCO_ANOS.length} edições do WCO (${WCO_ANOS[0]} a ${WCO_ANOS[WCO_ANOS.length - 1]}). Toque em uma edição para vê-la no mapa.`;
}

function arcPath(a, b, i) {
  const [x1, y1] = a, [x2, y2] = b;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1;
  const s = (i % 2 ? 1 : -1) * 0.22;
  return `M${x1},${y1} Q${mx - dy * s},${my + dx * s} ${x2},${y2}`;
}

let cur = -1, playing = false, gen = 0;

function setUI(i) {
  const e = E[i];
  $("cYear").textContent = e.y;
  $("cEd").textContent = e.ed;
  const kp = $("cKind"); kp.textContent = KIND[e.k]; kp.className = `pill k-${e.k}`;
  $("cPlace").innerHTML = e.c ? `${e.c}<small>${e.uf} · ${regionOf(e.uf)}</small>` : `Online<small>sem sede presencial</small>`;
  $("cNote").textContent = e.n;
  const lk = $("cLink");
  if (e.u) { lk.href = e.u; lk.hidden = false; lk.textContent = `Visitar o site do ${e.ed.replace(/^Trilha.*/, "evento")} ↗`; }
  else lk.hidden = true;
  const ms = $("milestone");
  if (e.m && ms.hidden) { ms.hidden = false; ms.classList.remove("shine"); void ms.offsetWidth; ms.classList.add("shine"); }
  else if (!e.m) ms.hidden = true;
  $("pulse").classList.toggle("gold", !!e.m);
  $("minorMs").hidden = !e.mm;
  if (e.mm) { $("minorK").textContent = e.mm[0]; $("minorT").textContent = e.mm[1]; }
  const upto = E.slice(0, i + 1).filter(x => x.k !== "futuro" && NUMERADA(x));
  $("sEd").textContent = upto.length;
  $("sWco").textContent = WCO_ANOS.filter(a => a <= e.y).length;
  $("sCity").textContent = new Set(upto.filter(x => x.c).map(x => x.c)).size;
  $("sUf").textContent = new Set(upto.filter(x => x.c).map(x => x.uf)).size;
  const visits = {}; E.slice(0, i + 1).forEach(x => { if (x.c) visits[x.c] = (visits[x.c] || 0) + 1; });
  Object.entries(cityG).forEach(([n, g]) => {
    g.classList.toggle("pending", !visits[n]);
    g.classList.toggle("current", n === e.c);
    g.querySelector(".dot").setAttribute("r", 3.5 + 2 * (visits[n] || 1));
  });
  const vis = new Set(E.slice(0, i + 1).filter(x => x.uf).map(x => x.uf));
  document.querySelectorAll(".uf").forEach(p => {
    p.classList.toggle("visited", vis.has(p.dataset.uf));
    p.classList.toggle("here", p.dataset.uf === e.uf);
  });
  $("online").classList.toggle("on", !e.c);
  E.forEach((x, j) => { const t = $(`t${x.y}`); t.classList.toggle("done", j <= i); t.classList.toggle("now", j === i); });
  const t = $(`t${e.y}`), tl = t.parentElement.parentElement;
  tl.scrollLeft = t.offsetLeft - tl.clientWidth / 2;
  placeTraveler(e.p);
  $("pulse").classList.toggle("go", !reduce);
}
function regionOf(uf) {
  return ({ AM: "Norte", PA: "Norte", BA: "Nordeste", CE: "Nordeste", RN: "Nordeste", PE: "Nordeste",
    SP: "Sudeste", MG: "Sudeste", RJ: "Sudeste", ES: "Sudeste", PR: "Sul", RS: "Sul" })[uf] || "";
}
function placeTraveler([x, y]) {
  $("traveler").setAttribute("cx", x); $("traveler").setAttribute("cy", y);
  $("pulse").setAttribute("cx", x); $("pulse").setAttribute("cy", y);
}
function addArc(i) {
  const a = E[i - 1].p, b = E[i].p;
  if (a === b) return null;
  const p = svgEl("path", { d: arcPath(a, b, i), class: `arc k-${E[i].k}` });
  $("trail").appendChild(p);
  return p;
}
function jump(i) {
  gen++;
  $("trail").innerHTML = "";
  for (let j = 1; j <= i; j++) addArc(j);
  cur = i; setUI(i);
  if (playing) schedule(1400);
}
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
function travel(i) {
  const my = ++gen;
  const p = addArc(i);
  if (!p) { cur = i; setUI(i); schedule(1500); return; }
  const L = p.getTotalLength();
  const dur = Math.min(2200, 700 + L * 3.2);
  p.classList.add("live");
  p.style.strokeDasharray = `${L} ${L}`; p.style.strokeDashoffset = L;
  $("pulse").classList.remove("go");
  const t0 = performance.now();
  const frame = now => {
    if (my !== gen) return;
    const t = Math.min(1, (now - t0) / dur), e = ease(t);
    p.style.strokeDashoffset = L * (1 - e);
    const pt = p.getPointAtLength(L * e); placeTraveler([pt.x, pt.y]);
    if (t < 1) requestAnimationFrame(frame);
    else { p.classList.remove("live"); p.style.strokeDasharray = ""; p.style.strokeDashoffset = ""; cur = i; setUI(i); schedule(E[i].m ? 4500 : E[i].mm ? 2800 : 1500); }
  };
  requestAnimationFrame(frame);
}
let timer;
function schedule(ms) {
  clearTimeout(timer);
  if (!playing) return;
  const my = gen;
  timer = setTimeout(() => {
    if (my !== gen || !playing) return;
    if (cur >= E.length - 1) { setPlaying(false); return; }
    travel(cur + 1);
  }, ms);
}
function setPlaying(v) {
  playing = v;
  $("bPlay").textContent = v ? "Pausar" : (cur >= E.length - 1 ? "Viajar de novo" : "Continuar");
  if (v) { if (cur >= E.length - 1) jump(0); schedule(500); } else { clearTimeout(timer); }
}
$("bPlay").onclick = () => setPlaying(!playing);
$("bPrev").onclick = () => { setPlaying(false); jump(Math.max(0, cur - 1)); };
$("bNext").onclick = () => { setPlaying(false); if (cur < E.length - 1) jump(cur + 1); };

if (reduce) { jump(E.length - 1); setPlaying(false); }
else { jump(0); setPlaying(true); }
