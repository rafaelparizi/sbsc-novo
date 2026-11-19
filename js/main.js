// CESC – scripts do site (JavaScript puro, sem dependências)
document.addEventListener("DOMContentLoaded", () => {
  // ----- Menu mobile -----
  const btnMenu = document.querySelector(".btn-menu");
  const menu = document.querySelector(".menu");
  if (btnMenu && menu) {
    btnMenu.addEventListener("click", () => {
      const aberto = menu.classList.toggle("aberto");
      btnMenu.classList.toggle("aberto", aberto);
      btnMenu.setAttribute("aria-expanded", aberto);
    });
  }

  // ----- Slider da home -----
  document.querySelectorAll(".slider").forEach((slider) => {
    const trilho = slider.querySelector(".slides");
    const slides = trilho.children;
    const pontos = slider.querySelector(".pontos");
    let atual = 0;
    let timer;

    for (let i = 0; i < slides.length; i++) {
      const b = document.createElement("button");
      b.setAttribute("aria-label", `Slide ${i + 1}`);
      b.addEventListener("click", () => ir(i));
      pontos.appendChild(b);
    }

    function ir(i) {
      atual = (i + slides.length) % slides.length;
      trilho.style.transform = `translateX(-${atual * 100}%)`;
      [...pontos.children].forEach((p, j) => p.classList.toggle("ativo", j === atual));
      clearInterval(timer);
      timer = setInterval(() => ir(atual + 1), 6000);
    }

    slider.querySelector(".ant").addEventListener("click", () => ir(atual - 1));
    slider.querySelector(".prox").addEventListener("click", () => ir(atual + 1));
    ir(0);
  });

  // ----- Órbita de eventos (home) -----
  const orbBtns = document.querySelectorAll(".orbita-btn");
  orbBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      orbBtns.forEach((b) => b.classList.toggle("ativo", b === btn));
      document.querySelectorAll(".orbita-painel").forEach((p) =>
        p.classList.toggle("ativo", p.id === btn.dataset.alvo)
      );
    });
  });

  // ----- Galeria com setas + lightbox -----
  document.querySelectorAll(".galeria").forEach((gal) => {
    const trilho = gal.querySelector(".galeria-trilho");
    const passo = () => trilho.clientWidth * 0.8;
    gal.querySelector(".ant").addEventListener("click", () => trilho.scrollBy({ left: -passo() }));
    gal.querySelector(".prox").addEventListener("click", () => trilho.scrollBy({ left: passo() }));
  });

  const lb = document.querySelector(".lightbox");
  if (lb) {
    const lbImg = lb.querySelector("img");
    document.querySelectorAll(".galeria-trilho button").forEach((b) =>
      b.addEventListener("click", () => {
        const img = b.querySelector("img");
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add("aberto");
      })
    );
    const fechar = () => lb.classList.remove("aberto");
    lb.addEventListener("click", (e) => { if (e.target !== lbImg) fechar(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") fechar(); });
  }

  // ----- Cabeçalho v2: encolhe ao rolar -----
  const topo2 = document.querySelector(".topo2");
  if (topo2) {
    const f = () => topo2.classList.toggle("rolou", window.scrollY > 40);
    window.addEventListener("scroll", f, { passive: true }); f();
  }

  // ----- Ano no rodapé -----
  document.querySelectorAll(".ano-atual").forEach((el) => (el.textContent = new Date().getFullYear()));
});
