export function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function announce(message) {
  const el = document.getElementById('sr-announcer');
  if (el) {
    el.textContent = '';
    requestAnimationFrame(() => { el.textContent = message; });
  }
}

let snackbarTimer = null;
export function showSnackbar(message, actionLabel = null, onAction = null) {
  const root = document.getElementById('snackbar-root');
  if (!root) return;
  clearTimeout(snackbarTimer);

  root.innerHTML = `
    <div class="snackbar">
      <span class="typescale-body-medium">${escapeHtml(message)}</span>
      ${actionLabel ? `<button type="button" class="snackbar-action" id="snackbar-act-btn">${escapeHtml(actionLabel)}</button>` : ''}
    </div>
  `;

  if (actionLabel && onAction) {
    document.getElementById('snackbar-act-btn')?.addEventListener('click', () => {
      onAction();
      root.innerHTML = '';
    });
  }

  snackbarTimer = setTimeout(() => {
    root.innerHTML = '';
  }, 5000);
}

export function openDialog({ title, bodyHtml, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar', danger = false, onConfirm }) {
  const root = document.getElementById('modal-root');
  if (!root) return;

  root.hidden = false;
  root.innerHTML = `
    <div class="dialog-surface" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <h2 id="dialog-title" class="typescale-headline-small" style="margin-bottom: 16px;">${escapeHtml(title)}</h2>
      <div id="dialog-body">${bodyHtml}</div>
      <div class="dialog-actions">
        <button type="button" class="btn btn-text" id="dialog-cancel">${escapeHtml(cancelLabel)}</button>
        ${confirmLabel ? `<button type="button" class="btn ${danger ? 'btn-danger' : 'btn-filled'}" id="dialog-confirm">${escapeHtml(confirmLabel)}</button>` : ''}
      </div>
    </div>
  `;

  const close = () => {
    root.hidden = true;
    root.innerHTML = '';
  };

  document.getElementById('dialog-cancel')?.addEventListener('click', close);
  root.addEventListener('click', (e) => {
    if (e.target === root) close();
  });

  document.getElementById('dialog-confirm')?.addEventListener('click', () => {
    if (onConfirm) {
      const shouldClose = onConfirm(root);
      if (shouldClose !== false) close();
    } else {
      close();
    }
  });
}

export function renderAvatar(person) {
  if (!person) return '';
  const initials = person.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return `<span class="avatar" style="background-color: ${escapeHtml(person.color)}" title="${escapeHtml(person.name)} (${escapeHtml(person.role)})">${escapeHtml(initials)}</span>`;
}