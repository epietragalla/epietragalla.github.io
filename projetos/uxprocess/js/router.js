export function parseRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/projetos';
  const parts = hash.split('/').filter(Boolean);

  if (parts[0] === 'projeto' && parts[1]) {
    const projectId = parts[1];
    if (parts[2] === 'visao-geral') {
      return { view: 'overview', projectId };
    }
    if (parts[2] === 'timeline') {
      return { view: 'timeline', projectId };
    }
    if (parts[2] === 'roadmap') {
      return { view: 'roadmap', projectId };
    }
    if (parts[2] === 'etapa' && parts[3]) {
      const stageKey = parts[3];
      if (parts[4] === 'metodo' && parts[5]) {
        return { view: 'method', projectId, stageKey, methodId: parts[5] };
      }
      return { view: 'stage', projectId, stageKey };
    }
    return { view: 'overview', projectId };
  }

  if (parts[0] === 'equipe') return { view: 'team' };
  if (parts[0] === 'biblioteca') return { view: 'library' };
  if (parts[0] === 'configuracoes') return { view: 'settings' };
  return { view: 'projects' };
}

export function navigate(path) {
  window.location.hash = path;
}