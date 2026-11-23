import { announce } from './ui.js';

/**
 * Habilita reordenação por Pointer Events + alternativa acessível por teclado
 * em qualquer lista de cards com atributo [data-reorder-index].
 */
export function enableReorderableList(container, { itemSelector = '[data-reorder-index]', onReorder, itemLabel = 'item' }) {
  if (!container) return;

  let draggingEl = null;
  let fromIndex = -1;

  container.querySelectorAll(itemSelector).forEach((el) => {
    const handle = el.querySelector('[data-drag-handle]') || el;

    handle.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      if (e.target.closest('button, a, input, select')) return;

      fromIndex = Number(el.dataset.reorderIndex);
      draggingEl = el;
      el.classList.add('dragging');
      handle.setPointerCapture(e.pointerId);
    });

    handle.addEventListener('pointermove', (e) => {
      if (!draggingEl) return;
      const target = document.elementFromPoint(e.clientX, e.clientY)?.closest(itemSelector);
      container.querySelectorAll(itemSelector).forEach(item => item.classList.remove('drag-over'));
      if (target && target !== draggingEl) {
        target.classList.add('drag-over');
      }
    });

    const finishDrag = (e) => {
      if (!draggingEl) return;
      const target = document.elementFromPoint(e.clientX, e.clientY)?.closest(itemSelector);
      container.querySelectorAll(itemSelector).forEach(item => item.classList.remove('dragging', 'drag-over'));

      if (target && target !== draggingEl) {
        const toIndex = Number(target.dataset.reorderIndex);
        onReorder(fromIndex, toIndex);
        announce(`${itemLabel} movido para a posição ${toIndex + 1}.`);
      }
      draggingEl = null;
      fromIndex = -1;
    };

    handle.addEventListener('pointerup', finishDrag);
    handle.addEventListener('pointercancel', () => {
      if (draggingEl) draggingEl.classList.remove('dragging');
      draggingEl = null;
    });

    // Alternativa por teclado (Alt + Seta Cima/Esquerda ou Baixo/Direita)
    el.addEventListener('keydown', (e) => {
      if (!e.altKey) return;
      const idx = Number(el.dataset.reorderIndex);
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (idx > 0) {
          onReorder(idx, idx - 1);
          announce(`${itemLabel} movido para a posição ${idx}.`);
        }
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const total = container.querySelectorAll(itemSelector).length;
        if (idx < total - 1) {
          onReorder(idx, idx + 1);
          announce(`${itemLabel} movido para a posição ${idx + 2}.`);
        }
      }
    });
  });
}