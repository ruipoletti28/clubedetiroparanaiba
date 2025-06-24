document.addEventListener('DOMContentLoaded', function() {
  // Seleciona todos os links do menu de navegação
  const menuLinks = document.querySelectorAll('nav ul li a');
  
  // Adiciona um evento de clique para cada link
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Se for um link para outra página (.html), permite o comportamento padrão
      if (href.includes('.html')) {
        return; // Permite o navegador seguir o link normalmente
      }
      
      e.preventDefault(); // Só previne o comportamento padrão para links âncora
      
      // Restante do seu código para links âncora...
      const linkText = this.textContent.trim();
      let sectionId;
      
      switch(linkText.toLowerCase()) {
        case 'home':
          sectionId = 'header';
          break;
        case 'agenda':
          sectionId = 'agenda';
          break;
        case 'serviços':
          sectionId = 'servicos';
          break;
        case 'contato':
          sectionId = 'contato-info';
          break;
        case 'regulamento abate':
          sectionId = 'abate';
          break;
        case 'regulamento w2c':
          sectionId = 'w2c';
          break;
        default:
          sectionId = 'header';
      }
      
      const targetSection = document.getElementById(sectionId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

// Modifique a navegação suave para ignorar links .html
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignora links para outras páginas
        if (href.includes('.html')) {
            return;
        }
        
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            history.pushState(null, null, href);
        }
    });
});

// Lazy loading para imagens
document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Botão de WhatsApp otimizado
const whatsappBtn = document.createElement('a');
whatsappBtn.href = 'https://wa.me/5567981396432';
whatsappBtn.className = 'whatsapp-float';
whatsappBtn.innerHTML = '<img src="assets/images/whatsapp-icon.svg" alt="WhatsApp"> ';
whatsappBtn.target = '_blank';
document.body.appendChild(whatsappBtn);