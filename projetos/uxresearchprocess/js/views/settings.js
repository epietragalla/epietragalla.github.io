window.UXR = window.UXR || {};

window.UXR.renderSettingsView = function(container) {
  const { store, createSeedData, esc, icon, openDialog, showSnackbar } = window.UXR;
  const state = store.getState();

  container.innerHTML = `
    <div class="page-header"><div><h1 class="headline-medium">Configurações & Backup JSON</h1></div></div>
    <div class="stack-v">
      <section class="card card-elevated stack-v">
        <h2 class="title-large">Exportar Dados (JSON)</h2>
        <div class="stack-h">
          <button type="button" class="btn btn-filled" id="btn-export-all">${icon('download')}<span>Exportar todos (${state.projects.length})</span></button>
          ${state.projects.map(p => `<button type="button" class="btn btn-outlined btn-sm" data-export-one="${esc(p.id)}">Exportar "${esc(p.name)}"</button>`).join('')}
        </div>
      </section>
      <section class="card card-elevated stack-v">
        <h2 class="title-large">Importar Dados (JSON)</h2>
        <div class="stack-h">
          <select id="import-mode" class="field-select" style="width:auto;"><option value="merge">Mesclar</option><option value="as_new">Como novos projetos</option><option value="replace">Substituir tudo</option></select>
          <input id="import-file" type="file" accept=".json,application/json" class="field-input" style="width:auto;" />
        </div>
        <div id="import-feedback" class="body-medium"></div>
      </section>
      <section class="card card-outlined stack-v">
        <h2 class="title-large">Dados de Demonstração</h2>
        <div><button type="button" class="btn btn-tonal" id="btn-restore-demo">${icon('restore')}<span>Restaurar projeto de exemplo</span></button></div>
      </section>
    </div>
  `;

  const download = (str, name) => {
    const url = URL.createObjectURL(new Blob([str], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url);
  };
  document.getElementById('btn-export-all')?.addEventListener('click', () => download(store.exportJson(), 'ux-research-backup.json'));
  container.querySelectorAll('[data-export-one]').forEach(b => b.addEventListener('click', () => download(store.exportJson(b.dataset.exportOne), 'uxr-projeto.json')));
  document.getElementById('import-file')?.addEventListener('change', async (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    try { store.importJson(await f.text(), document.getElementById('import-mode').value); showSnackbar('Importado com sucesso.'); }
    catch (err) { document.getElementById('import-feedback').innerHTML = `<span class="field-error">${esc(err.message)}</span>`; }
  });
  document.getElementById('btn-restore-demo')?.addEventListener('click', () => openDialog({
    title: 'Restaurar demonstração?', danger: true, confirmLabel: 'Restaurar',
    bodyHtml: '<p>Substitui os dados atuais pelo projeto de exemplo.</p>',
    onConfirm: () => { store.mutate(draft => Object.assign(draft, createSeedData())); showSnackbar('Restaurado.'); }
  }));
};
