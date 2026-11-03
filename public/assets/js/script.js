document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Menu mobile ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("menu");

  if (toggle && nav) {
    const close = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());
  }

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Agenda: destaca etapa atual / próxima ---------- */
  const stages = document.querySelectorAll(".stage[data-start]");
  if (!stages.length) return;

  const parse = (s) => {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let highlight = null;

  stages.forEach((li) => {
    const start = parse(li.dataset.start);
    const end = parse(li.dataset.end);

    if (end < today) {
      li.classList.add("is-past");
    } else if (start <= today && today <= end) {
      li.classList.add("is-active");
      if (!highlight) highlight = { li, active: true };
    } else if (!highlight) {
      highlight = { li, active: false };
    }
  });

  if (!highlight) return;

  const month = highlight.li.closest(".month");
  if (month) month.classList.add("is-current");

  const box = document.querySelector(".next-stage");
  if (box) {
    const label = box.querySelector(".next-stage-label");
    const title = box.querySelector(".next-stage-title");
    const num = highlight.li.querySelector(".stage-num").textContent;
    const when = highlight.li.querySelector("time").textContent;

    label.textContent = highlight.active ? "Etapa em andamento" : "Próxima etapa";
    title.textContent = `${num} · ${when}`;
    box.classList.add("is-visible");
  }
});
