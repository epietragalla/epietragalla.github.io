/**
 * Roteador leve baseado em hash (#/slug-do-documento)
 */

export function initRouter(documentIds, defaultDocId, onRouteChange) {
  const resolveHash = () => {
    const raw = window.location.hash.replace(/^#\/?/, '').trim();
    if (documentIds.includes(raw)) {
      return raw;
    }
    return defaultDocId;
  };

  const handleHashChange = () => {
    const activeId = resolveHash();
    if (window.location.hash !== `#/${activeId}`) {
      history.replaceState(null, '', `#/${activeId}`);
    }
    onRouteChange(activeId);
  };

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
}

export function navigateTo(docId) {
  window.location.hash = `#/${docId}`;
}