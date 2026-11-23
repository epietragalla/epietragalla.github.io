export const CURRENT_SCHEMA_VERSION = 1;

export function generateId(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export function validateAndMigrateExport(raw) {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Arquivo JSON inválido: estrutura raiz ausente.');
  }
  if (!Array.isArray(raw.projects)) {
    throw new Error('Arquivo JSON inválido: lista "projects" não encontrada.');
  }

  const people = Array.isArray(raw.people) ? raw.people : [];
  const projects = raw.projects.map(p => {
    if (!p.id || !p.name || !Array.isArray(p.stages)) {
      throw new Error(`Projeto "${p.name || 'sem nome'}" possui estrutura incompleta.`);
    }
    return {
      ...p,
      status: p.status || 'active',
      ownerIds: Array.isArray(p.ownerIds) ? p.ownerIds : [],
      stages: p.stages.map(st => ({
        ...st,
        responsibleIds: Array.isArray(st.responsibleIds) ? st.responsibleIds : [],
        methods: Array.isArray(st.methods) ? st.methods.map(m => ({
          ...m,
          weight: typeof m.weight === 'number' ? m.weight : 1,
          progress: typeof m.progress === 'number' ? m.progress : 0,
          blocks: m.blocks || { notes: '', checklist: [], table: { headers: ['Item', 'Detalhe', 'Status'], rows: [] } },
          findings: Array.isArray(m.findings) ? m.findings : []
        })) : []
      }))
    };
  });

  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    projects,
    people
  };
}