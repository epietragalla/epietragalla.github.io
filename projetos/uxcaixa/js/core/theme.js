/**
 * Gerenciador de Tema M3 (Light padrão inicial, alternância persistente)
 */

const THEME_STORAGE_KEY = 'superapp_f21_theme';

export function initTheme() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  const initialTheme = saved === 'dark' ? 'dark' : 'light';
  applyTheme(initialTheme);

  const toggleBtn = document.getElementById('btn-theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(THEME_STORAGE_KEY, next);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const iconEl = document.getElementById('theme-toggle-icon');
  const toggleBtn = document.getElementById('btn-theme-toggle');

  if (iconEl && toggleBtn) {
    if (theme === 'light') {
      // Tema claro exibe lua para alternar para escuro
      iconEl.textContent = 'dark_mode';
      toggleBtn.setAttribute('aria-label', 'Alternar para tema escuro');
      toggleBtn.setAttribute('title', 'Tema escuro');
    } else {
      // Tema escuro exibe sol para alternar para claro
      iconEl.textContent = 'light_mode';
      toggleBtn.setAttribute('aria-label', 'Alternar para tema claro');
      toggleBtn.setAttribute('title', 'Tema claro');
    }
  }
}