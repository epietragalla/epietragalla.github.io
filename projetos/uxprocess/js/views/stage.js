import { getStageMeta } from '../catalog.js';
import { store } from '../store.js';
import { escapeHtml, openDialog, showSnackbar, renderAvatar } from '../ui.js';
import { enableReorderableList } from '../dnd.js';

let catalogSearch = '';

export function renderStageView(container, project, stageKey) {
  const meta = getStageMeta(stageKey);
  const stage = project.stages.find(s => s.key === stageKey);
  const { people } = store.state;
  const stageProgress = store.calcStageProgress(stage);

  const addedCatalogIds = new Set(stage.methods.map(m => m.catalogId).filter(Boolean));

  container.innerHTML = `
    <!-- Cabeçalho da Etapa -->
    <section class="card card-filled" style="background-color: ${meta.tokens.container}; color: ${meta.tokens.onContainer}; margin-bottom: 24px;">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 16px;">
        <div style="flex: 1; min-width: 260px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span class="material-symbols-outlined icon-filled">${meta.icon}</span>
            <span class="typescale-label-large" style="text-transform: uppercase;">Etapa: ${meta.nameEn} (${meta.namePt})</span>
          </div>
          <h1 class="typescale-headline-medium" style="margin-bottom: 8px;">${escapeHtml(meta.objective)}</h1>
          <p class="typescale-body-medium">
            ${stage.methods.length === 0
              ? '0% — Adicione métodos do catálogo abaixo para iniciar esta etapa.'
              : `Progresso ponderado da etapa: <strong>${stageProgress}%</strong> (${stage.methods.filter(m => m.status === 'done').length} de ${stage.methods.length} métodos concluídos)`}
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; min-width: 220px;">
          <label class="typescale-label-medium" for="stage-resp-select">Responsável pela etapa</label>
          <select id="stage-resp-select" class="field-select" style="background-color: var(--md-sys-color-surface-container-lowest); color: var(--md-sys-color-on-surface);">
            <option value="">Não atribuído</option>
            ${people.map(p => `<option value="${p.id}" ${stage.responsibleIds[0] === p.id ? 'selected' : ''}>${escapeHtml(p.name)} (${escapeHtml(p.role)})</option>`).join('')}
          </select>
        </div>
      </div>
    </section>

    <!-- Métodos Selecionados no Projeto -->
    <section style="margin-bottom: 32px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <h2 class="typescale-title-large">Métodos Ativos nesta Etapa (${stage.methods.length})</h2>
        <button type="button" class="btn btn-outlined" id="custom-method-btn">
          <span class="material-symbols-outlined">add</span>
          Criar Método Personalizado
        </button>
      </div>

      ${stage.methods.length === 0 ? `
        <div class="empty-state">
          <span class="material-symbols-outlined" style="font-size: 40px; color: ${meta.tokens.accent};">playlist_add</span>
          <p class="typescale-title-medium">Nenhum método adicionado em ${meta.nameEn}</p>
          <p class="typescale-body-medium" style="color: var(--md-sys-color-on-surface-variant);">Selecione os métodos recomendados no catálogo abaixo para compor o plano desta etapa.</p>
        </div>
      ` : `
        <div class="methods-grid" id="stage-methods-grid">
          ${stage.methods.map((m, idx) => {
            const resp = people.find(p => p.id === m.responsibleIds[0]);
            const statusLabel = m.status === 'done' ? 'Concluído' : m.status === 'in_progress' ? 'Em andamento' : 'A fazer';
            return `
              <article class="card card-elevated draggable-card" tabindex="0" data-reorder-index="${idx}" style="border-left: 5px solid ${meta.tokens.accent}; display: flex; flex-direction: column; justify-content: space-between; gap: 12px;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span class="typescale-label-small" style="color: var(--md-sys-color-on-surface-variant);">${escapeHtml(m.group)}</span>
                    <div style="display: flex; align-items: center;">
                      <span class="icon-btn" data-drag-handle title="Arraste ou Alt + Setas para reordenar" aria-label="Reordenar método" style="cursor: grab;">
                        <span class="material-symbols-outlined">drag_indicator</span>
                      </span>
                      <button type="button" class="icon-btn" data-rem-method="${m.id}" title="Remover método da etapa" aria-label="Remover método">
                        <span class="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  </div>

                  <h3 class="typescale-title-medium">
                    <a href="#/projeto/${project.id}/etapa/${stageKey}/metodo/${m.id}" style="color: inherit; text-decoration: none;">${escapeHtml(m.titlePt)}</a>
                  </h3>
                  <p class="typescale-body-small" style="color: var(--md-sys-color-on-surface-variant); margin-bottom: 8px;">${escapeHtml(m.titleEn)}</p>
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span class="status-badge" data-status="${m.status}">${statusLabel}</span>
                    <span class="typescale-label-medium">${m.progress}%</span>
                  </div>
                  <div class="progress-track" style="margin-bottom: 12px;">
                    <div class="progress-fill" style="width: ${m.progress}%; background-color: ${meta.tokens.accent};"></div>
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                      ${resp ? `${renderAvatar(resp)} <span class="typescale-body-small">${escapeHtml(resp.name.split(' ')[0])}</span>` : '<span class="typescale-body-small" style="color: var(--md-sys-color-on-surface-variant);">Sem resp.</span>'}
                    </div>
                    <a href="#/projeto/${project.id}/etapa/${stageKey}/metodo/${m.id}" class="btn btn-tonal">Abrir</a>
                  </div>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      `}
    </section>

    <!-- Seletor do Catálogo de Métodos -->
    <section class="card card-outlined">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 16px;">
        <div>
          <h2 class="typescale-title-large">Catálogo de Métodos — ${meta.nameEn}</h2>
          <p class="typescale-body-small" style="color: var(--md-sys-color-on-surface-variant);">Clique para adicionar métodos ao projeto (você pode adicionar múltiplas instâncias se necessário).</p>
        </div>
        <input type="search" id="cat-search" class="field-input" style="max-width: 280px;" placeholder="Filtrar catálogo..." value="${escapeHtml(catalogSearch)}" aria-label="Filtrar métodos do catálogo">
      </div>

      ${meta.groups.map(group => {
        const filteredMethods = group.methods.filter(m =>
          !catalogSearch ||
          m.titlePt.toLowerCase().includes(catalogSearch.toLowerCase()) ||
          m.titleEn.toLowerCase().includes(catalogSearch.toLowerCase())
        );
        if (!filteredMethods.length) return '';
        return `
          <div class="catalog-group">
            <h3 class="typescale-title-small" style="color: ${meta.tokens.accent};">${escapeHtml(group.name)}</h3>
            <div class="catalog-chips-wrap">
              ${filteredMethods.map(m => {
                const isAdded = addedCatalogIds.has(m.catalogId);
                return `
                  <button type="button" class="chip ${isAdded ? 'selected' : ''}" data-add-cat='${escapeHtml(JSON.stringify({ ...m, group: group.name }))}'>
                    <span class="material-symbols-outlined" style="font-size: 18px;">${isAdded ? 'check_circle' : 'add'}</span>
                    <span>${escapeHtml(m.titlePt)} <small style="opacity: 0.75;">(${escapeHtml(m.titleEn)})</small></span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </section>
  `;

  // Eventos
  container.querySelector('#stage-resp-select').addEventListener('change', (e) => {
    store.commit(s => {
      const p = s.projects.find(item => item.id === project.id);
      const st = p?.stages.find(item => item.key === stageKey);
      if (st) st.responsibleIds = e.target.value ? [e.target.value] : [];
    });
    showSnackbar('Responsável da etapa atualizado.');
  });

  container.querySelector('#cat-search').addEventListener('input', (e) => {
    catalogSearch = e.target.value;
    renderStageView(container, project, stageKey);
    const inp = container.querySelector('#cat-search');
    inp.focus();
    inp.setSelectionRange(catalogSearch.length, catalogSearch.length);
  });

  container.querySelectorAll('[data-add-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      const metaObj = JSON.parse(btn.dataset.addCat);
      store.addMethodToStage(project.id, stageKey, metaObj);
      showSnackbar(`"${metaObj.titlePt}" adicionado à etapa.`);
    });
  });

  container.querySelectorAll('[data-rem-method]').forEach(btn => {
    btn.addEventListener('click', () => {
      store.removeMethod(project.id, stageKey, btn.dataset.remMethod);
      showSnackbar('Método removido.', 'Desfazer', () => store.undo());
    });
  });

  container.querySelector('#custom-method-btn').addEventListener('click', () => {
    openDialog({
      title: `Novo Método Personalizado em ${meta.nameEn}`,
      confirmLabel: 'Adicionar Método',
      bodyHtml: `
        <div class="field-group">
          <label class="field-label" for="cm-title-pt">Nome do Método (PT-BR) *</label>
          <input type="text" id="cm-title-pt" class="field-input" required placeholder="Ex: Oficina de Co-criação com Suporte">
        </div>
        <div class="field-group">
          <label class="field-label" for="cm-title-en">Nome Original / Inglês (opcional)</label>
          <input type="text" id="cm-title-en" class="field-input" placeholder="Ex: Support Co-creation Workshop">
        </div>
        <div class="field-group">
          <label class="field-label" for="cm-group">Grupo</label>
          <input type="text" id="cm-group" class="field-input" value="Personalizado">
        </div>
      `,
      onConfirm: (root) => {
        const titlePt = root.querySelector('#cm-title-pt').value.trim();
        if (!titlePt) return false;
        store.addMethodToStage(project.id, stageKey, {
          catalogId: null,
          titlePt,
          titleEn: root.querySelector('#cm-title-en').value.trim() || titlePt,
          group: root.querySelector('#cm-group').value.trim() || 'Personalizado'
        });
        showSnackbar('Método personalizado criado!');
      }
    });
  });

  const grid = container.querySelector('#stage-methods-grid');
  if (grid) {
    enableReorderableList(grid, {
      itemLabel: 'Método',
      onReorder: (from, to) => store.reorderMethods(project.id, stageKey, from, to)
    });
  }
}