document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os links do menu de navegação
  const menuLinks = document.querySelectorAll("nav ul li a");

  // Adiciona um evento de clique para cada link
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Se for um link para outra página (.html), permite o comportamento padrão SEM scroll
      if (href.includes(".html")) {
        // Remove qualquer hash da URL antes de navegar
        const cleanHref = href.split("#")[0];
        window.location.href = cleanHref;
        return;
      }

      // Se for um link âncora (#), faz scroll suave
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(href);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start", // Alinha ao topo da seção
          });

          // Atualiza a URL sem recarregar a página
          history.pushState(null, null, href);
        }
        return;
      }
    });
  });

  // Verifica se há hash na URL ao carregar a página
  if (window.location.hash) {
    const targetSection = document.querySelector(window.location.hash);
    if (targetSection) {
      // Scroll imediato (sem animação) no carregamento
      setTimeout(() => {
        targetSection.scrollIntoView();
      }, 0);
    }
  }
});
// Modifique a navegação suave para ignorar links .html
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Ignora links para outras páginas
    if (href.includes(".html")) {
      return;
    }

    e.preventDefault();
    const targetElement = document.querySelector(href);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      history.pushState(null, null, href);
    }
  });
});

// Lazy loading para imagens
document.addEventListener("DOMContentLoaded", () => {
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  }
});

// Verifica se é mobile e aplica fallback se necessário
function checkPDFViewerSupport() {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const pdfContainer = document.querySelector(".pdf-container");

  if (isMobile && pdfContainer) {
    const iframe = pdfContainer.querySelector("iframe");
    const fallback = pdfContainer.querySelector(".pdf-fallback");

    // Testa se o PDF carregou
    setTimeout(() => {
      if (
        iframe &&
        (iframe.clientHeight === 0 || iframe.contentDocument.title === "Error")
      ) {
        iframe.style.display = "none";
        fallback.style.display = "block";
      }
    }, 2000);
  }
}

document.addEventListener("DOMContentLoaded", checkPDFViewerSupport);
window.addEventListener("resize", checkPDFViewerSupport);

// Botão de WhatsApp otimizado
const whatsappBtn = document.createElement("a");
whatsappBtn.href = "https://wa.me/5567981396432";
whatsappBtn.className = "whatsapp-float";
whatsappBtn.innerHTML =
  '<img src="assets/images/whatsapp-icon.svg" alt="WhatsApp"> ';
whatsappBtn.target = "_blank";
document.body.appendChild(whatsappBtn);
