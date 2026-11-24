/**
 * Componentes de UI M3: Dialog modal e Snackbar
 */

let snackbarTimer = null;

/**
 * Exibe uma mensagem transitória no Snackbar M3
 * @param {string} message
 * @param {number} durationMs
 */
export function showSnackbar(message, durationMs = 2600) {
  const snackbar = document.getElementById('m3-snackbar');
  const textEl = document.getElementById('m3-snackbar-text');
  if (!snackbar || !textEl) return;

  textEl.textContent = message;
  snackbar.hidden = false;

  if (snackbarTimer) {
    clearTimeout(snackbarTimer);
  }
  snackbarTimer = setTimeout(() => {
    snackbar.hidden = true;
  }, durationMs);
}

/**
 * Abre um Dialog modal M3 de confirmação
 * @param {Object} options
 * @param {string} options.title
 * @param {string} options.description
 * @param {string} [options.icon]
 * @param {string} [options.confirmLabel='Confirmar']
 * @param {string} [options.cancelLabel='Cancelar']
 * @param {boolean} [options.destructive=false]
 * @returns {Promise<boolean>}
 */
export function openConfirmDialog({
  title,
  description,
  icon = 'help',
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  destructive = false
}) {
  return new Promise((resolve) => {
    const scrim = document.getElementById('m3-dialog-scrim');
    const titleEl = document.getElementById('m3-dialog-title');
    const descEl = document.getElementById('m3-dialog-desc');
    const iconWrap = document.getElementById('m3-dialog-icon-wrap');
    const iconEl = document.getElementById('m3-dialog-icon');
    const actionsEl = document.getElementById('m3-dialog-actions');

    const previousFocus = document.activeElement;

    titleEl.textContent = title;
    descEl.textContent = description;

    if (icon) {
      iconEl.textContent = icon;
      iconWrap.hidden = false;
    } else {
      iconWrap.hidden = true;
    }

    actionsEl.innerHTML = '';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'm3-button m3-button--text';
    cancelBtn.textContent = cancelLabel;

    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.className = destructive
      ? 'm3-button m3-button--filled'
      : 'm3-button m3-button--filled';
    confirmBtn.textContent = confirmLabel;

    const cleanup = (result) => {
      scrim.hidden = true;
      document.removeEventListener('keydown', onKeyDown);
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus();
      }
      resolve(result);
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        cleanup(false);
      }
    };

    cancelBtn.addEventListener('click', () => cleanup(false));
    confirmBtn.addEventListener('click', () => cleanup(true));
    scrim.addEventListener(
      'click',
      (e) => {
        if (e.target === scrim) cleanup(false);
      },
      { once: true }
    );

    actionsEl.append(cancelBtn, confirmBtn);
    scrim.hidden = false;
    document.addEventListener('keydown', onKeyDown);
    confirmBtn.focus();
  });
}

/**
 * Helper para criação concisa de elementos DOM
 */
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === null) continue;
    if (key === 'className') {
      node.className = value;
    } else if (key === 'textContent') {
      node.textContent = value;
    } else if (key === 'dataset') {
      Object.assign(node.dataset, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      node.setAttribute(key, String(value));
    }
  }
  for (const child of Array.isArray(children) ? children : [children]) {
    if (child === undefined || child === null) continue;
    node.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}