window.UXR = window.UXR || {};

window.UXR.announce = function(message) {
  const el = document.getElementById('a11y-announcer');
  if (el) {
    el.textContent = '';
    requestAnimationFrame(() => { el.textContent = message; });
  }
};

window.UXR.enableSortableList = function(containerEl, onReorder) {
  if (!containerEl) return;
  let draggingEl = null;
  let startIndex = -1;
  let currentTargetIndex = -1;

  const getItems = () => Array.from(containerEl.querySelectorAll('[data-drag-index]'));
  const cleanup = () => {
    getItems().forEach(item => item.classList.remove('is-dragging', 'drop-target-hover'));
    draggingEl = null;
    startIndex = -1;
    currentTargetIndex = -1;
  };

  containerEl.addEventListener('pointerdown', (e) => {
    const handle = e.target.closest('[data-drag-handle]');
    if (!handle) return;
    const item = handle.closest('[data-drag-index]');
    if (!item) return;

    e.preventDefault();
    draggingEl = item;
    startIndex = Number(item.dataset.dragIndex);
    currentTargetIndex = startIndex;
    item.classList.add('is-dragging');
    handle.setPointerCapture(e.pointerId);

    const onPointerMove = (moveEvent) => {
      if (!draggingEl) return;
      const items = getItems();
      items.forEach(el => el.classList.remove('drop-target-hover'));
      for (const candidate of items) {
        if (candidate === draggingEl) continue;
        const rect = candidate.getBoundingClientRect();
        if (moveEvent.clientY >= rect.top && moveEvent.clientY <= rect.bottom && moveEvent.clientX >= rect.left && moveEvent.clientX <= rect.right) {
          candidate.classList.add('drop-target-hover');
          currentTargetIndex = Number(candidate.dataset.dragIndex);
          break;
        }
      }
    };

    const onKeyDown = (keyEvent) => {
      if (keyEvent.key === 'Escape') {
        cleanup();
        window.UXR.announce('Reordenação cancelada.');
        window.removeEventListener('keydown', onKeyDown);
      }
    };

    const onPointerUp = () => {
      window.removeEventListener('keydown', onKeyDown);
      handle.removeEventListener('pointermove', onPointerMove);
      handle.removeEventListener('pointerup', onPointerUp);
      handle.removeEventListener('pointercancel', onPointerUp);
      const from = startIndex;
      const to = currentTargetIndex;
      cleanup();
      if (from !== -1 && to !== -1 && from !== to) {
        onReorder(from, to);
        window.UXR.announce(`Item movido da posição ${from + 1} para ${to + 1}.`);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    handle.addEventListener('pointermove', onPointerMove);
    handle.addEventListener('pointerup', onPointerUp);
    handle.addEventListener('pointercancel', onPointerUp);
  });
};
