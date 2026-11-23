(function() {
  const { CURRENT_SCHEMA_VERSION, createSeedData, validateAndMigrateState, createCycle, uid, STAGE_ORDER } = window.UXR;
  const STORAGE_KEY = 'uxr_cycle_studio_v1';
  const MAX_HISTORY = 30;

  class Store {
    constructor() {
      this.listeners = new Set();
      this.undoStack = [];
      this.redoStack = [];
      this.lastSavedAt = null;
      this.state = this.loadInitialState();
      this.applyTheme(this.state.theme);
    }

    loadInitialState() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return validateAndMigrateState(JSON.parse(saved));
      } catch (err) {
        console.warn('Falha ao restaurar localStorage, carregando seed:', err);
      }
      const seed = createSeedData();
      this.persist(seed);
      return seed;
    }

    persist(stateToSave = this.state) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        const now = new Date();
        this.lastSavedAt = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      } catch (err) {
        console.error('Erro ao salvar no localStorage:', err);
      }
    }

    subscribe(fn) {
      this.listeners.add(fn);
      return () => this.listeners.delete(fn);
    }

    notify() {
      this.listeners.forEach(fn => fn(this.state));
    }

    getState() { return this.state; }

    mutate(mutatorFn, { recordUndo = true } = {}) {
      if (recordUndo) {
        this.undoStack.push(JSON.stringify(this.state));
        if (this.undoStack.length > MAX_HISTORY) this.undoStack.shift();
        this.redoStack = [];
      }
      const draft = JSON.parse(JSON.stringify(this.state));
      mutatorFn(draft);
      this.state = draft;
      this.persist();
      this.notify();
    }

    canUndo() { return this.undoStack.length > 0; }

    undo() {
      if (!this.canUndo()) return false;
      this.redoStack.push(JSON.stringify(this.state));
      this.state = JSON.parse(this.undoStack.pop());
      this.applyTheme(this.state.theme);
      this.persist();
      this.notify();
      return true;
    }

    applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    }

    toggleTheme() {
      const next = this.state.theme === 'dark' ? 'light' : 'dark';
      this.mutate(draft => { draft.theme = next; }, { recordUndo: false });
      this.applyTheme(next);
    }

    calcActivityProgress(activity) {
      if (activity.status === 'done') return 100;
      const list = activity.checklist || [];
      if (list.length === 0) return activity.status === 'doing' ? 50 : 0;
      return Math.round((list.filter(i => i.done).length / list.length) * 100);
    }

    calcMethodProgress(method) {
      if (method.status === 'done') return 100;
      return Math.max(0, Math.min(100, Number(method.progress) || 0));
    }

    calcStageMetrics(stage) {
      const methods = stage.methods || [];
      const activities = stage.activities || [];
      if (methods.length + activities.length === 0) {
        return { percent: 0, isEmpty: true, methodsDone: 0, methodsTotal: 0, activitiesDone: 0, activitiesTotal: 0 };
      }
      let weightedSum = 0;
      let totalWeight = 0;
      methods.forEach(m => {
        const w = Number(m.weight) > 0 ? Number(m.weight) : 1;
        weightedSum += this.calcMethodProgress(m) * w;
        totalWeight += w;
      });
      activities.forEach(a => {
        weightedSum += this.calcActivityProgress(a) * 0.5;
        totalWeight += 0.5;
      });
      return {
        percent: totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0,
        isEmpty: false,
        methodsDone: methods.filter(m => m.status === 'done').length,
        methodsTotal: methods.length,
        activitiesDone: activities.filter(a => a.status === 'done').length,
        activitiesTotal: activities.length
      };
    }

    calcCycleProgress(cycle) {
      if (!cycle || !cycle.stages) return 0;
      const activeStages = cycle.stages.filter(s => (s.methods.length + s.activities.length) > 0);
      if (activeStages.length === 0) return 0;
      return Math.round(activeStages.reduce((acc, st) => acc + this.calcStageMetrics(st).percent, 0) / activeStages.length);
    }

    getProject(projectId) {
      return this.state.projects.find(p => p.id === projectId) || null;
    }

    getCycle(project, cycleNumber) {
      if (!project) return null;
      const num = Number(cycleNumber) || project.activeCycleNumber || 1;
      return project.cycles.find(c => c.number === num) || project.cycles[0];
    }

    startNewCycle(projectId, { copyStructure = false } = {}) {
      let createdNumber = 1;
      this.mutate(draft => {
        const project = draft.projects.find(p => p.id === projectId);
        if (!project) return;
        const lastCycle = project.cycles[project.cycles.length - 1];
        createdNumber = (lastCycle ? lastCycle.number : 0) + 1;
        const newCycle = createCycle(createdNumber, `Ciclo ${createdNumber}`);
        if (copyStructure && lastCycle) {
          newCycle.stages = STAGE_ORDER.map(key => {
            const prevStage = lastCycle.stages.find(s => s.key === key);
            if (!prevStage) return { key, responsibleIds: [], startDate: '', endDate: '', notes: '', methods: [], activities: [] };
            return {
              key,
              responsibleIds: [...prevStage.responsibleIds],
              startDate: '',
              endDate: '',
              notes: '',
              methods: prevStage.methods.map(m => ({
                ...JSON.parse(JSON.stringify(m)),
                id: uid('mtd'),
                status: 'todo',
                progress: 0,
                findings: [],
                evidences: [],
                sessions: [],
                history: [{ at: new Date().toISOString(), action: `Copiado do Ciclo ${lastCycle.number}` }]
              })),
              activities: prevStage.activities.map(a => ({
                ...JSON.parse(JSON.stringify(a)),
                id: uid('act'),
                status: a.frequency === 'continuous' ? 'doing' : 'todo',
                checklist: a.checklist.map(c => ({ ...c, id: uid('chk'), done: false }))
              }))
            };
          });
        }
        project.cycles.push(newCycle);
        project.activeCycleNumber = createdNumber;
        project.updatedAt = new Date().toISOString();
      });
      return createdNumber;
    }

    getUnifiedRoadmapItems(project) {
      if (!project) return [];
      const items = [];
      const fallbackStart = project.startDate || new Date().toISOString().slice(0, 10);
      project.cycles.forEach(cycle => {
        cycle.stages.forEach(stage => {
          stage.methods.forEach((m, idx) => {
            const start = m.startDate || fallbackStart;
            const end = m.endDate && m.endDate >= start ? m.endDate : start;
            items.push({ id: m.id, sourceType: 'method', title: m.title, cycleNumber: cycle.number, cycleName: cycle.name, stageKey: stage.key, isMilestone: false, assigneeIds: m.responsibleIds || [], startDate: start, endDate: end, status: m.status || 'todo', progress: this.calcMethodProgress(m), priority: m.priority || 'medium', effort: m.effort || 'M', dependsOn: m.dependsOn || [], order: idx });
          });
          stage.activities.forEach((a, idx) => {
            const start = a.startDate || fallbackStart;
            const end = a.endDate && a.endDate >= start ? a.endDate : start;
            items.push({ id: a.id, sourceType: 'activity', title: a.title, cycleNumber: cycle.number, cycleName: cycle.name, stageKey: stage.key, isMilestone: false, assigneeIds: a.responsibleIds || [], startDate: start, endDate: end, status: a.status || 'todo', progress: this.calcActivityProgress(a), priority: a.priority || 'low', effort: 'Contínua', dependsOn: a.dependsOn || [], order: idx });
          });
        });
      });
      (project.customRoadmapItems || []).forEach((rm, idx) => {
        items.push({ ...rm, sourceType: 'custom', cycleName: `Ciclo ${rm.cycleNumber || 1}`, progress: rm.status === 'done' ? 100 : (rm.status === 'doing' ? 50 : 0), order: idx });
      });
      return items;
    }

    updateRoadmapItem(projectId, itemId, patch) {
      this.mutate(draft => {
        const project = draft.projects.find(p => p.id === projectId);
        if (!project) return;
        for (const cycle of project.cycles) {
          for (const stage of cycle.stages) {
            const method = stage.methods.find(m => m.id === itemId);
            if (method) {
              Object.assign(method, patch);
              if (patch.assigneeIds !== undefined) method.responsibleIds = patch.assigneeIds;
              if (patch.status === 'done') method.progress = 100;
              if (patch.status === 'todo') method.progress = 0;
              project.updatedAt = new Date().toISOString();
              return;
            }
            const activity = stage.activities.find(a => a.id === itemId);
            if (activity) {
              Object.assign(activity, patch);
              if (patch.assigneeIds !== undefined) activity.responsibleIds = patch.assigneeIds;
              project.updatedAt = new Date().toISOString();
              return;
            }
          }
        }
        const custom = (project.customRoadmapItems || []).find(r => r.id === itemId);
        if (custom) {
          Object.assign(custom, patch);
          if (custom.isMilestone && patch.startDate) custom.endDate = patch.startDate;
          project.updatedAt = new Date().toISOString();
        }
      });
    }

    getRoadmapAlerts(project) {
      const today = new Date().toISOString().slice(0, 10);
      const items = this.getUnifiedRoadmapItems(project);
      const alerts = [];
      items.forEach(item => {
        if (item.status !== 'done' && item.endDate && item.endDate < today) {
          alerts.push({ type: 'overdue', itemId: item.id, label: `Atrasado: ${item.title.split(' (')[0]} (venceu em ${item.endDate})` });
        }
        if (item.status !== 'done' && (!item.assigneeIds || item.assigneeIds.length === 0)) {
          alerts.push({ type: 'unassigned', itemId: item.id, label: `Sem responsável: ${item.title.split(' (')[0]}` });
        }
      });
      return alerts;
    }

    exportJson(projectId = null) {
      const projectsToExport = projectId ? this.state.projects.filter(p => p.id === projectId) : this.state.projects;
      return JSON.stringify({
        schemaVersion: CURRENT_SCHEMA_VERSION,
        exportedAt: new Date().toISOString(),
        app: 'UX Research Cycle Studio',
        projects: projectsToExport,
        people: this.state.people,
        participants: this.state.participants
      }, null, 2);
    }

    importJson(rawText, mode = 'merge') {
      const validated = validateAndMigrateState(JSON.parse(rawText));
      this.mutate(draft => {
        if (mode === 'replace') {
          draft.projects = validated.projects;
          draft.people = validated.people.length ? validated.people : draft.people;
          draft.participants = validated.participants;
          return;
        }
        const existingPeopleIds = new Set(draft.people.map(p => p.id));
        validated.people.forEach(person => { if (!existingPeopleIds.has(person.id)) draft.people.push(person); });

        draft.participants = draft.participants || [];
        const existingParticipantIds = new Set(draft.participants.map(pt => pt.id));
        validated.participants.forEach(pt => { if (!existingParticipantIds.has(pt.id)) draft.participants.push(pt); });

        const existingProjIds = new Set(draft.projects.map(p => p.id));
        validated.projects.forEach(proj => {
          if (mode === 'as_new' || existingProjIds.has(proj.id)) {
            const cloned = JSON.parse(JSON.stringify(proj));
            cloned.id = uid('prj');
            cloned.name = mode === 'as_new' ? `${cloned.name} (Importado)` : `${cloned.name} (Cópia)`;
            draft.projects.push(cloned);
          } else {
            draft.projects.push(proj);
          }
        });
      });
    }
  }

  window.UXR.store = new Store();
})();
