window.UXR = window.UXR || {};

window.UXR.parseHash = function(hashStr = window.location.hash) {
  const clean = (hashStr || '').replace(/^#\/?/, '').trim();
  if (!clean || clean === 'projetos') return { view: 'projects', params: {} };
  if (clean === 'equipe') return { view: 'team', params: {} };
  if (clean === 'configuracoes') return { view: 'settings', params: {} };
  if (clean === 'biblioteca') return { view: 'library', params: {} };

  const parts = clean.split('/').filter(Boolean);
  if (parts[0] === 'projeto' && parts[1]) {
    const projectId = parts[1];
    if (!parts[2]) return { view: 'overview', params: { projectId } };
    if (parts[2] === 'plano') return { view: 'plan', params: { projectId } };
    if (parts[2] === 'timeline') return { view: 'timeline', params: { projectId } };
    if (parts[2] === 'roadmap') return { view: 'roadmap', params: { projectId } };
    if (parts[2] === 'insights') return { view: 'insights', params: { projectId } };
    if (parts[2] === 'participantes') return { view: 'participants', params: { projectId } };
    if (parts[2] === 'relatorios') return { view: 'reports', params: { projectId } };
    if (parts[2] === 'ciclo' && parts[3] && parts[4] === 'etapa' && parts[5]) {
      const cycleNumber = Number(parts[3]) || 1;
      const stageKey = parts[5];
      if (parts[6] === 'metodo' && parts[7]) {
        return { view: 'method', params: { projectId, cycleNumber, stageKey, methodId: parts[7] } };
      }
      return { view: 'stage', params: { projectId, cycleNumber, stageKey } };
    }
  }
  return { view: 'projects', params: {} };
};

window.UXR.navigate = function(path) {
  window.location.hash = path.startsWith('#') ? path : `#${path}`;
};
