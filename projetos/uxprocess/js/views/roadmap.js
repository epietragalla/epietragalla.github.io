import { UX_CATALOG, getStageMeta } from '../catalog.js';
import { store } from '../store.js';
import { escapeHtml, openDialog, renderAvatar, showSnackbar, announce } from '../ui.js';

let viewMode = 'gantt'; // 'gantt' | 'kanban' | 'list'
let ganttZoom = 'week'; // 'week' | 'month' | 'quarter'
let filterStage = 'all';
let filterAssignee = 'all';
let filterStatus = 'all';
let filterPriority = 'all';

const TODAY_STR = '2026-11-22';

function parseDate(str) {
  const [y, m, d] = (str || TODAY_STR).split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

function formatDateISO(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDays(dateStr, days) {
  const d = parseDate(dateStr);
  d.setDate(d.getDate() + days);
  return formatDateISO(d);
}

function diffDays(startStr, endStr) {
  const ms = parseDate(endStr) - parseDate(startStr);
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export function renderRoadmapView(container, project) {
  const { people } = store.state;
  const rawItems = store.getUnifiedRoadmapItems(project);

  // Filtros
  const items = rawItems.filter(it => {
    if (filterStage !== 'all' && it.stageKey !== filterStage) return false;
    if (filterAssignee !== 'all' && !it.assigneeIds.includes(filterAssignee)) return false;
    if (filterStatus !== 'all' && it.status !== filterStatus) return false;
    if (filterPriority !== 'all' && it.priority !== filterPriority) return false;
    return true;
  });

  // Alertas automáticos (atrasos e itens sem responsável)
  const overdueCount = rawItems.filter(it => it.status !== 'done' && it.end < TODAY_STR).length;
  const unassignedCount = rawItems.filter(it => it.assigneeIds.length === 0).length;

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="typescale-headline-medium">Roadmap Detalhado</h1>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px;">
          ${overdueCount > 0 ? `<span class="alert-pill"><span class="material-symbols-outlined" style="font-size: 16px;">warning</span> ${overdueCount} atrasado(s)</span>` : ''}
          ${unassignedCount > 0 ? `<span class="alert-pill" style="background: var(--md-sys-color-tertiary-container); color: var(--md-sys-color-on-tertiary-container);"><span class="material-symbols-outlined" style="font-size: 16px;">person_off</span> ${unassignedCount} sem responsável</span>` : ''}
          <span class="typescale-body-medium" style="color: var(--md-sys-color-on-surface-variant);">Sincronizado em tempo real com Etapas e Métodos.</span>
        </div>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <!-- M3 Segmented Button para alternar visão -->
        <div class="segmented-group" role="group" aria-label="Modo de visualização do Roadmap">
          <button type="button" class="segmented-btn ${viewMode === 'gantt' ? 'selected' : ''}" data-rm-mode="gantt">
            <span class="material-symbols-outlined">view_timeline</span> Gantt
          </button>
          <button type="button" class="segmented-btn ${viewMode === 'kanban' ? 'selected' : ''}" data-rm-mode="kanban">
            <span class="material-symbols-outlined">view_kanban</span> Kanban
          </button>
          <button type="button" class="segmented-btn ${viewMode === 'list' ? 'selected' : ''}" data-rm-mode="list">
            <span class="material-symbols-outlined">table_rows</span> Lista
          </button>
        </div>

        <button type="button" class="btn btn-tonal" id="add-milestone-btn">
          <span class="material-symbols-outlined">flag</span> Marco
        </button>
        <button type="button" class="btn btn-filled" id="add-rm-item-btn">
          <span class="material-symbols-outlined">add</span> Item Avulso
        </button>
      </div>
    </div>

    <!-- Barra de Filtros -->
    <div class="card card-filled" style="padding: 12px 16px; margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
      <select id="rm-f-stage" class="field-select" style="width: auto; min-width: 150px;" aria-label="Filtrar por etapa">
        <option value="all">Todas as etapas</option>
        ${UX_CATALOG.map(s => `<option value="${s.key}" ${filterStage === s.key ? 'selected' : ''}>${s.nameEn}</option>`).join('')}
      </select>

      <select id="rm-f-resp" class="field-select" style="width: auto; min-width: 160px;" aria-label="Filtrar por responsável">
        <option value="all">Todos responsáveis</option>
        ${people.map(p => `<option value="${p.id}" ${filterAssignee === p.id ? 'selected' : ''}>${escapeHtml(p.name)}</option>`).join('')}
      </select>

      <select id="rm-f-status" class="field-select" style="width: auto; min-width: 150px;" aria-label="Filtrar por status">
        <option value="all">Todos os status</option>
        <option value="todo" ${filterStatus === 'todo' ? 'selected' : ''}>A fazer</option>
        <option value="in_progress" ${filterStatus === 'in_progress' ? 'selected' : ''}>Em andamento</option>
        <option value="review" ${filterStatus === 'review' ? 'selected' : ''}>Em revisão</option>
        <option value="done" ${filterStatus === 'done' ? 'selected' : ''}>Concluído</option>
      </select>

      <select id="rm-f-prio" class="field-select" style="width: auto; min-width: 150px;" aria-label="Filtrar por prioridade">
        <option value="all">Todas prioridades</option>
        <option value="high" ${filterPriority === 'high' ? 'selected' : ''}>Alta</option>
        <option value="medium" ${filterPriority === 'medium' ? 'selected' : ''}>Média</option>
        <option value="low" ${filterPriority === 'low' ? 'selected' : ''}>Baixa</option>
      </select>

      ${viewMode === 'gantt' ? `
        <div style="margin-left: auto; display: flex; align-items: center; gap: 6px;">
          <span class="typescale-label-medium">Zoom:</span>
          <button type="button" class="chip ${ganttZoom === 'week' ? 'selected' : ''}" data-zoom="week">Semana</button>
          <button type="button" class="chip ${ganttZoom === 'month' ? 'selected' : ''}" data-zoom="month">Mês</button>
          <button type="button" class="chip ${ganttZoom === 'quarter' ? 'selected' : ''}" data-zoom="quarter">Trimestre</button>
        </div>
      ` : ''}
    </div>

    <div id="roadmap-viewport"></div>
  `;

  // Eventos de filtros e modos
  container.querySelectorAll('[data-rm-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      viewMode = btn.dataset.rmMode;
      renderRoadmapView(container, project);
    });
  });

  container.querySelectorAll('[data-zoom]').forEach(btn => {
    btn.addEventListener('click', () => {
      ganttZoom = btn.dataset.zoom;
      renderRoadmapView(container, project);
    });
  });

  container.querySelector('#rm-f-stage').addEventListener('change', e => { filterStage = e.target.value; renderRoadmapView(container, project); });
  container.querySelector('#rm-f-resp').addEventListener('change', e => { filterAssignee = e.target.value; renderRoadmapView(container, project); });
  container.querySelector('#rm-f-status').addEventListener('change', e => { filterStatus = e.target.value; renderRoadmapView(container, project); });
  container.querySelector('#rm-f-prio').addEventListener('change', e => { filterPriority = e.target.value; renderRoadmapView(container, project); });

  container.querySelector('#add-rm-item-btn').addEventListener('click', () => openNewItemDialog(project));
  container.querySelector('#add-milestone-btn').addEventListener('click', () => openNewMilestoneDialog(project));

  const viewport = container.querySelector('#roadmap-viewport');
  if (viewMode === 'gantt') renderGantt(viewport, project, items);
  else if (viewMode === 'kanban') renderKanban(viewport, project, items);
  else renderListTable(viewport, project, items);
}

/* ============================================================================
   1. VISÃO GANTT INTERATIVA (Arrastar barras & redimensionar bordas)
   ============================================================================ */
function renderGantt(container, project, items) {
  const pxPerDay = ganttZoom === 'week' ? 36 : ganttZoom === 'month' ? 18 : 8;
  const totalDays = ganttZoom === 'week' ? 35 : ganttZoom === 'month' ? 60 : 120;
  const timelineStart = addDays(project.startDate || TODAY_STR, -3);
  const todayOffsetPx = diffDays(timelineStart, TODAY_STR) * pxPerDay;

  const daysArray = Array.from({ length: totalDays }, (_, i) => {
    const dStr = addDays(timelineStart, i);
    const [, m, d] = dStr.split('-');
    return { date: dStr, label: `${d}/${m}` };
  });

  const milestones = project.milestones || [];

  container.innerHTML = `
    <div class="gantt-wrapper">
      <div class="gantt-scroll">
        <div class="gantt-grid" style="width: ${260 + totalDays * pxPerDay}px;">
          <!-- Cabeçalho de Datas -->
          <div class="gantt-header-row">
            <div class="gantt-label-col">
              <span class="typescale-title-small">Etapa / Entrega</span>
              <span class="typescale-label-small" style="color: var(--md-sys-color-error);">● Hoje</span>
            </div>
            <div class="gantt-timeline-area">
              ${daysArray.map((d, idx) => {
                const showLabel = ganttZoom === 'week' || (ganttZoom === 'month' && idx % 3 === 0) || (idx % 7 === 0);
                return `<div class="gantt-day-tick" style="width: ${pxPerDay}px;">${showLabel ? d.label : ''}</div>`;
              }).join('')}
            </div>
          </div>

          <!-- Marcos (Milestones) -->
          ${milestones.length > 0 ? `
            <div class="gantt-row stage-header-row">
              <div class="gantt-label-col"><span class="typescale-label-large">★ Marcos do Projeto</span></div>
              <div class="gantt-timeline-area">
                ${todayOffsetPx >= 0 ? `<div class="gantt-today-line" style="left: ${todayOffsetPx}px;"></div>` : ''}
                ${milestones.map(ms => {
                  const left = diffDays(timelineStart, ms.date) * pxPerDay;
                  return `<div title="Marco: ${escapeHtml(ms.title)} (${ms.date})" style="position: absolute; left: ${left}px; transform: translateX(-50%); background: var(--md-sys-color-tertiary); color: var(--md-sys-color-on-tertiary); padding: 2px 8px; border-radius: 99px; font-size: 11px; font-weight: 700; z-index: 4;">◆ ${escapeHtml(ms.title)}</div>`;
                }).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Agrupado por Etapa -->
          ${UX_CATALOG.map(meta => {
            const stageItems = items.filter(it => it.stageKey === meta.key);
            return `
              <div class="gantt-row stage-header-row">
                <div class="gantt-label-col" style="color: ${meta.tokens.accent};">
                  <span style="display: inline-flex; align-items: center; gap: 6px;">
                    <span class="material-symbols-outlined" style="font-size: 18px;">${meta.icon}</span>
                    ${meta.nameEn} (${stageItems.length})
                  </span>
                </div>
                <div class="gantt-timeline-area">
                  ${todayOffsetPx >= 0 ? `<div class="gantt-today-line" style="left: ${todayOffsetPx}px;"></div>` : ''}
                </div>
              </div>
              ${stageItems.map(it => {
                const startOffset = diffDays(timelineStart, it.start);
                const durationDays = Math.max(1, diffDays(it.start, it.end) + 1);
                const leftPx = startOffset * pxPerDay;
                const widthPx = Math.max(pxPerDay, durationDays * pxPerDay);
                const isOverdue = it.status !== 'done' && it.end < TODAY_STR;

                return `
                  <div class="gantt-row">
                    <div class="gantt-label-col">
                      <span class="typescale-body-small" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 195px;" title="${escapeHtml(it.title)}">
                        ${isOverdue ? '⚠️ ' : ''}${escapeHtml(it.title)}
                      </span>
                      <button type="button" class="icon-btn" style="width: 32px; height: 32px;" data-edit-rm="${it.id}" aria-label="Detalhes de ${escapeHtml(it.title)}">
                        <span class="material-symbols-outlined" style="font-size: 18px;">tune</span>
                      </button>
                    </div>
                    <div class="gantt-timeline-area">
                      ${todayOffsetPx >= 0 ? `<div class="gantt-today-line" style="left: ${todayOffsetPx}px;"></div>` : ''}
                      <div class="gantt-bar"
                           tabindex="0"
                           data-gantt-bar="${it.id}"
                           data-start="${it.start}"
                           data-end="${it.end}"
                           style="left: ${leftPx}px; width: ${widthPx}px; background-color: ${isOverdue ? 'var(--md-sys-color-error)' : meta.tokens.accent};"
                           title="${escapeHtml(it.title)} (${it.start} até ${it.end}) — Arraste para mover ou use Alt+Setas">
                        <div class="gantt-resize-handle left" data-resize="left"></div>
                        <span>${escapeHtml(it.title)} (${it.progress}%)</span>
                        <div class="gantt-resize-handle right" data-resize="right"></div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  // Interação Pointer Events nas barras do Gantt (mover e redimensionar)
  container.querySelectorAll('[data-gantt-bar]').forEach(bar => {
    const itemId = bar.dataset.ganttBar;
    const itemObj = items.find(i => i.id === itemId);

    bar.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      e.preventDefault();
      const resizeSide = e.target.dataset.resize || null; // 'left' | 'right' | null
      const startX = e.clientX;
      const origLeft = parseFloat(bar.style.left);
      const origWidth = parseFloat(bar.style.width);

      bar.setPointerCapture(e.pointerId);

      const onMove = (ev) => {
        const deltaX = ev.clientX - startX;
        if (!resizeSide) {
          bar.style.left = `${origLeft + deltaX}px`;
        } else if (resizeSide === 'right') {
          bar.style.width = `${Math.max(pxPerDay, origWidth + deltaX)}px`;
        } else if (resizeSide === 'left') {
          const newWidth = Math.max(pxPerDay, origWidth - deltaX);
          bar.style.left = `${origLeft + (origWidth - newWidth)}px`;
          bar.style.width = `${newWidth}px`;
        }
      };

      const onUp = (ev) => {
        bar.removeEventListener('pointermove', onMove);
        bar.removeEventListener('pointerup', onUp);
        const deltaDays = Math.round((ev.clientX - startX) / pxPerDay);
        if (deltaDays === 0) return;

        let newStart = itemObj.start;
        let newEnd = itemObj.end;

        if (!resizeSide) {
          newStart = addDays(itemObj.start, deltaDays);
          newEnd = addDays(itemObj.end, deltaDays);
        } else if (resizeSide === 'right') {
          newEnd = addDays(itemObj.end, deltaDays);
          if (newEnd < newStart) newEnd = newStart;
        } else if (resizeSide === 'left') {
          newStart = addDays(itemObj.start, deltaDays);
          if (newStart > newEnd) newStart = newEnd;
        }

        store.updateRoadmapItem(project.id, itemObj.id, itemObj.sourceType, itemObj.stageKey, {
          start: newStart,
          end: newEnd
        });
        announce(`Datas atualizadas: ${newStart} a ${newEnd}`);
      };

      bar.addEventListener('pointermove', onMove);
      bar.addEventListener('pointerup', onUp);
    });

    // Alternativa acessível por teclado (Alt + Setas Esquerda/Direita desloca 1 dia)
    bar.addEventListener('keydown', (e) => {
      if (!e.altKey) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const delta = e.key === 'ArrowRight' ? 1 : -1;
        store.updateRoadmapItem(project.id, itemObj.id, itemObj.sourceType, itemObj.stageKey, {
          start: addDays(itemObj.start, delta),
          end: addDays(itemObj.end, delta)
        });
      }
    });
  });

  container.querySelectorAll('[data-edit-rm]').forEach(btn => {
    btn.addEventListener('click', () => {
      const it = items.find(i => i.id === btn.dataset.editRm);
      if (it) openEditItemDialog(project, it);
    });
  });
}

/* ============================================================================
   2. VISÃO KANBAN (Arrastar entre colunas + alternativa teclado)
   ============================================================================ */
function renderKanban(container, project, items) {
  const { people } = store.state;
  const columns = [
    { key: 'todo', title: 'A fazer' },
    { key: 'in_progress', title: 'Em andamento' },
    { key: 'review', title: 'Em revisão' },
    { key: 'done', title: 'Concluído' }
  ];

  container.innerHTML = `
    <div class="kanban-board">
      ${columns.map(col => {
        const colItems = items.filter(i => i.status === col.key);
        return `
          <section class="kanban-column" data-k-col="${col.key}" aria-label="Coluna ${col.title}">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 8px;">
              <h2 class="typescale-title-medium">${col.title}</h2>
              <span class="status-badge">${colItems.length}</span>
            </div>
            ${colItems.map(it => {
              const meta = getStageMeta(it.stageKey);
              const resp = people.find(p => p.id === it.assigneeIds[0]);
              return `
                <article class="kanban-card" tabindex="0" data-k-card="${it.id}" style="border-left: 4px solid ${meta.tokens.accent};">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="typescale-label-small" style="color: ${meta.tokens.accent}; font-weight: 700;">${meta.nameEn}</span>
                    <span class="typescale-label-small">Prio: ${it.priority.toUpperCase()}</span>
                  </div>
                  <div class="typescale-title-small">${escapeHtml(it.title)}</div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                    <span class="typescale-body-small" style="color: var(--md-sys-color-on-surface-variant);">${it.end}</span>
                    <div style="display: flex; align-items: center; gap: 4px;">
                      ${resp ? renderAvatar(resp) : ''}
                      <button type="button" class="icon-btn" style="width: 32px; height: 32px;" data-edit-rm="${it.id}" aria-label="Editar item">
                        <span class="material-symbols-outlined" style="font-size: 18px;">edit</span>
                      </button>
                    </div>
                  </div>
                </article>
              `;
            }).join('')}
          </section>
        `;
      }).join('')}
    </div>
  `;

  // Pointer Drag & Drop entre colunas Kanban
  container.querySelectorAll('[data-k-card]').forEach(card => {
    const it = items.find(i => i.id === card.dataset.kCard);
    card.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      if (e.target.closest('button')) return;
      card.style.opacity = '0.6';
      card.setPointerCapture(e.pointerId);

      const onMove = (ev) => {
        const colEl = document.elementFromPoint(ev.clientX, ev.clientY)?.closest('[data-k-col]');
        container.querySelectorAll('[data-k-col]').forEach(c => c.classList.remove('drag-over-col'));
        if (colEl) colEl.classList.add('drag-over-col');
      };

      const onUp = (ev) => {
        card.style.opacity = '1';
        card.removeEventListener('pointermove', onMove);
        card.removeEventListener('pointerup', onUp);
        const colEl = document.elementFromPoint(ev.clientX, ev.clientY)?.closest('[data-k-col]');
        container.querySelectorAll('[data-k-col]').forEach(c => c.classList.remove('drag-over-col'));
        if (colEl && colEl.dataset.kCol !== it.status) {
          store.updateRoadmapItem(project.id, it.id, it.sourceType, it.stageKey, { status: colEl.dataset.kCol });
          announce(`Card movido para ${colEl.dataset.kCol}`);
        }
      };

      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerup', onUp);
    });

    // Teclado: Alt + Seta Esquerda/Direita muda coluna
    card.addEventListener('keydown', (e) => {
      if (!e.altKey) return;
      const order = ['todo', 'in_progress', 'review', 'done'];
      const cur = order.indexOf(it.status);
      if (e.key === 'ArrowRight' && cur < order.length - 1) {
        e.preventDefault();
        store.updateRoadmapItem(project.id, it.id, it.sourceType, it.stageKey, { status: order[cur + 1] });
      } else if (e.key === 'ArrowLeft' && cur > 0) {
        e.preventDefault();
        store.updateRoadmapItem(project.id, it.id, it.sourceType, it.stageKey, { status: order[cur - 1] });
      }
    });
  });

  container.querySelectorAll('[data-edit-rm]').forEach(btn => {
    btn.addEventListener('click', () => {
      const it = items.find(i => i.id === btn.dataset.editRm);
      if (it) openEditItemDialog(project, it);
    });
  });
}

/* ============================================================================
   3. VISÃO LISTA / TABELA ESTRUTURADA
   ============================================================================ */
function renderListTable(container, project, items) {
  const { people } = store.state;
  container.innerHTML = `
    <div class="m3-table-wrap">
      <table class="m3-table">
        <thead>
          <tr>
            <th>Etapa</th>
            <th>Entrega / Método</th>
            <th>Responsável</th>
            <th>Início</th>
            <th>Entrega</th>
            <th>Prioridade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(it => {
            const meta = getStageMeta(it.stageKey);
            const resp = people.find(p => p.id === it.assigneeIds[0]);
            return `
              <tr>
                <td><span class="status-badge" style="background: ${meta.tokens.container}; color: ${meta.tokens.onContainer};">${meta.nameEn}</span></td>
                <td><strong>${escapeHtml(it.title)}</strong></td>
                <td>${resp ? escapeHtml(resp.name) : '<span style="color: var(--md-sys-color-error);">Sem resp.</span>'}</td>
                <td>${it.start}</td>
                <td>${it.end}</td>
                <td>${it.priority.toUpperCase()}</td>
                <td>${it.status}</td>
                <td>
                  <button type="button" class="icon-btn" data-edit-rm="${it.id}" aria-label="Editar"><span class="material-symbols-outlined">edit</span></button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;

  container.querySelectorAll('[data-edit-rm]').forEach(btn => {
    btn.addEventListener('click', () => {
      const it = items.find(i => i.id === btn.dataset.editRm);
      if (it) openEditItemDialog(project, it);
    });
  });
}

/* ============================================================================
   MODAIS DE EDIÇÃO E CRIAÇÃO NO ROADMAP
   ============================================================================ */
function openEditItemDialog(project, item) {
  const { people } = store.state;
  openDialog({
    title: `Editar: ${item.title}`,
    confirmLabel: 'Salvar Alterações',
    bodyHtml: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div class="field-group">
          <label class="field-label" for="ed-start">Data Início</label>
          <input type="date" id="ed-start" class="field-input" value="${item.start}">
        </div>
        <div class="field-group">
          <label class="field-label" for="ed-end">Data Entrega</label>
          <input type="date" id="ed-end" class="field-input" value="${item.end}">
        </div>
        <div class="field-group">
          <label class="field-label" for="ed-status">Status</label>
          <select id="ed-status" class="field-select">
            <option value="todo" ${item.status === 'todo' ? 'selected' : ''}>A fazer</option>
            <option value="in_progress" ${item.status === 'in_progress' ? 'selected' : ''}>Em andamento</option>
            <option value="review" ${item.status === 'review' ? 'selected' : ''}>Em revisão</option>
            <option value="done" ${item.status === 'done' ? 'selected' : ''}>Concluído</option>
          </select>
        </div>
        <div class="field-group">
          <label class="field-label" for="ed-prio">Prioridade</label>
          <select id="ed-prio" class="field-select">
            <option value="low" ${item.priority === 'low' ? 'selected' : ''}>Baixa</option>
            <option value="medium" ${item.priority === 'medium' ? 'selected' : ''}>Média</option>
            <option value="high" ${item.priority === 'high' ? 'selected' : ''}>Alta</option>
          </select>
        </div>
      </div>
      <div class="field-group">
        <label class="field-label" for="ed-resp">Responsável</label>
        <select id="ed-resp" class="field-select">
          <option value="">Sem responsável</option>
          ${people.map(p => `<option value="${p.id}" ${item.assigneeIds[0] === p.id ? 'selected' : ''}>${escapeHtml(p.name)}</option>`).join('')}
        </select>
      </div>
      <div class="field-group">
        <label class="field-label" for="ed-risk">Riscos / Bloqueios</label>
        <input type="text" id="ed-risk" class="field-input" value="${escapeHtml(item.risk || '')}" placeholder="Ex: Aguardando acesso ao banco de produção">
      </div>
    `,
    onConfirm: (root) => {
      store.updateRoadmapItem(project.id, item.id, item.sourceType, item.stageKey, {
        start: root.querySelector('#ed-start').value,
        end: root.querySelector('#ed-end').value,
        status: root.querySelector('#ed-status').value,
        priority: root.querySelector('#ed-prio').value,
        assigneeIds: root.querySelector('#ed-resp').value ? [root.querySelector('#ed-resp').value] : [],
        risk: root.querySelector('#ed-risk').value.trim()
      });
      showSnackbar('Item do roadmap atualizado.');
    }
  });
}

function openNewItemDialog(project) {
  const { people } = store.state;
  openDialog({
    title: 'Novo Item Avulso no Roadmap',
    confirmLabel: 'Adicionar',
    bodyHtml: `
      <div class="field-group">
        <label class="field-label" for="ni-title">Título *</label>
        <input type="text" id="ni-title" class="field-input" required placeholder="Ex: Apresentação executiva de descobertas">
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div class="field-group">
          <label class="field-label" for="ni-stage">Etapa</label>
          <select id="ni-stage" class="field-select">
            ${UX_CATALOG.map(s => `<option value="${s.key}">${s.nameEn}</option>`).join('')}
          </select>
        </div>
        <div class="field-group">
          <label class="field-label" for="ni-resp">Responsável</label>
          <select id="ni-resp" class="field-select">
            <option value="">Nenhum</option>
            ${people.map(p => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('')}
          </select>
        </div>
        <div class="field-group">
          <label class="field-label" for="ni-start">Início</label>
          <input type="date" id="ni-start" class="field-input" value="${TODAY_STR}">
        </div>
        <div class="field-group">
          <label class="field-label" for="ni-end">Entrega</label>
          <input type="date" id="ni-end" class="field-input" value="${addDays(TODAY_STR, 5)}">
        </div>
      </div>
    `,
    onConfirm: (root) => {
      const title = root.querySelector('#ni-title').value.trim();
      if (!title) return false;
      store.addCustomRoadmapItem(project.id, {
        title,
        stageKey: root.querySelector('#ni-stage').value,
        assigneeIds: root.querySelector('#ni-resp').value ? [root.querySelector('#ni-resp').value] : [],
        start: root.querySelector('#ni-start').value,
        end: root.querySelector('#ni-end').value
      });
      showSnackbar('Item adicionado ao roadmap.');
    }
  });
}

function openNewMilestoneDialog(project) {
  openDialog({
    title: 'Adicionar Marco (Milestone)',
    confirmLabel: 'Criar Marco',
    bodyHtml: `
      <div class="field-group">
        <label class="field-label" for="ms-title">Nome do Marco *</label>
        <input type="text" id="ms-title" class="field-input" required placeholder="Ex: Aprovação do Protótipo Hi-Fi">
      </div>
      <div class="field-group">
        <label class="field-label" for="ms-date">Data *</label>
        <input type="date" id="ms-date" class="field-input" value="${addDays(TODAY_STR, 14)}">
      </div>
    `,
    onConfirm: (root) => {
      const title = root.querySelector('#ms-title').value.trim();
      if (!title) return false;
      store.addMilestone(project.id, {
        title,
        date: root.querySelector('#ms-date').value
      });
      showSnackbar('Marco adicionado ao Gantt.');
    }
  });
}