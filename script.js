// Portfólio Marcelo Pelentir — interações

// ---------- Menu do celular ----------
const botaoMenu = document.querySelector('.menu-botao');
const menu = document.getElementById('menu');
const telaGrande = window.matchMedia('(min-width: 960px)');

function definirMenu(aberto) {
  botaoMenu.setAttribute('aria-expanded', String(aberto));
  botaoMenu.textContent = aberto ? 'Fechar' : 'Menu';
  menu.classList.toggle('aberto', aberto);
  document.body.classList.toggle('menu-aberto', aberto);
}

botaoMenu.addEventListener('click', () => {
  const aberto = botaoMenu.getAttribute('aria-expanded') === 'true';
  definirMenu(!aberto);
  if (!aberto) menu.querySelector('a').focus();
});

// Fecha ao escolher um link (a rolagem suave fica por conta do CSS)
menu.addEventListener('click', evento => {
  if (evento.target.closest('a')) definirMenu(false);
});

// Fecha com Esc e devolve o foco ao botão
document.addEventListener('keydown', evento => {
  if (evento.key === 'Escape' && menu.classList.contains('aberto')) {
    definirMenu(false);
    botaoMenu.focus();
  }
});

// Se a tela crescer com o menu aberto, volta ao estado normal
telaGrande.addEventListener('change', () => definirMenu(false));

// ---------- Animações ao rolar ----------
// Cada elemento com [data-revelar] aparece com fade e leve subida
// quando entra na tela. Quem prefere menos movimento vê tudo direto.
const elementos = document.querySelectorAll('[data-revelar]');
const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduzirMovimento || !('IntersectionObserver' in window)) {
  elementos.forEach(el => el.classList.add('visivel'));
} else {
  const observador = new IntersectionObserver((entradas, obs) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        obs.unobserve(entrada.target); // anima só uma vez
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  elementos.forEach(el => observador.observe(el));
}

// ---------- Ano atual no rodapé ----------
document.getElementById('ano').textContent = new Date().getFullYear();
