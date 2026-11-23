window.UXR = window.UXR || {};

window.UXR.esc = function(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

window.UXR.icon = function(name, filled = false) {
  return `<span class="material-symbols-outlined ${filled ? 'icon-filled' : ''}" aria-hidden="true">${window.UXR.esc(name)}</span>`;
};

(function() {
  let snackbarTimer = null;
  window.UXR.showSnackbar = function(message, { actionLabel = '', onAction = null, duration = 4500 } = {}) {
    const root = document.getElementById('snackbar-root');
    if (!root) return;
    clearTimeout(snackbarTimer);
    root.innerHTML = `
      <div class="snackbar" role="status">
        <span>${window.UXR.esc(message)}</span>
        ${actionLabel ? `<button type="button" class="snackbar-action" id="snackbar-act-btn">${window.UXR.esc(actionLabel)}</button>` : ''}
      </div>
    `;
    if (actionLabel && onAction) {
      document.getElementById('snackbar-act-btn')?.addEventListener('click', () => {
        clearTimeout(snackbarTimer);
        root.innerHTML = '';
        onAction();
      });
    }
    snackbarTimer = setTimeout(() => { root.innerHTML = ''; }, duration);
  };
})();

window.UXR.openDialog = function({ title, bodyHtml, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar', danger = false, onConfirm }) {
  const { esc } = window.UXR;
  const root = document.getElementById('dialog-root');
  if (!root) return;
  const previousFocus = document.activeElement;
  root.hidden = false;
  root.innerHTML = `
    <div class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <h2 id="dialog-title" class="headline-small">${esc(title)}</h2>
      <div class="dialog-body">${bodyHtml}</div>
      <div class="dialog-actions">
        <button type="button" class="btn btn-text" id="dialog-cancel">${esc(cancelLabel)}</button>
        <button type="button" class="btn ${danger ? 'btn-danger' : 'btn-filled'}" id="dialog-confirm">${esc(confirmLabel)}</button>
      </div>
    </div>
  `;
  const close = () => { root.hidden = true; root.innerHTML = ''; previousFocus?.focus(); };
  document.getElementById('dialog-cancel')?.addEventListener('click', close);
  root.addEventListener('click', (e) => { if (e.target === root) close(); }, { once: true });
  const escHandler = (e) => { if (e.key === 'Escape') { document.removeEventListener('keydown', escHandler); close(); } };
  document.addEventListener('keydown', escHandler);
  document.getElementById('dialog-confirm')?.addEventListener('click', () => {
    const shouldClose = onConfirm ? onConfirm(root) : true;
    if (shouldClose !== false) { document.removeEventListener('keydown', escHandler); close(); }
  });
  root.querySelector('input, textarea, select, button')?.focus();
};

window.UXR.openSheet = function({ title, subtitle = '', bodyHtml, onMount }) {
  const { esc, icon } = window.UXR;
  const root = document.getElementById('sheet-root');
  if (!root) return;
  const previousFocus = document.activeElement;
  root.hidden = false;
  root.innerHTML = `
    <div class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      <div class="stack-h" style="justify-content: space-between; margin-bottom: var(--md-sys-space-4);">
        <div>
          <h2 id="sheet-title" class="headline-small">${esc(title)}</h2>
          ${subtitle ? `<p class="body-medium text-variant">${esc(subtitle)}</p>` : ''}
        </div>
        <button type="button" class="icon-btn" id="sheet-close" aria-label="Fechar painel">${icon('close')}</button>
      </div>
      <div id="sheet-body">${bodyHtml}</div>
    </div>
  `;
  const close = () => { root.hidden = true; root.innerHTML = ''; previousFocus?.focus(); };
  document.getElementById('sheet-close')?.addEventListener('click', close);
  root.addEventListener('click', (e) => { if (e.target === root) close(); }, { once: true });
  if (onMount) onMount(root, close);
};

window.UXR.statusLabelPt = function(status) {
  return { todo: 'A fazer', doing: 'Em andamento', review: 'Em revisão', done: 'Concluído' }[status] || 'A fazer';
};
