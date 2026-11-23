import { UX_CATALOG, PROJECT_TEMPLATES } from './catalog.js';
import { CURRENT_SCHEMA_VERSION, generateId, validateAndMigrateExport } from './schema.js';

const STORAGE_KEY = 'ux_flow_state_v1';
const THEME_KEY = 'ux_flow_theme';

function createEmptyStages() {
  return UX_CATALOG.map(stage => ({
    key: stage.key,
    responsibleIds: [],
    startDate: '',
    endDate: '',
    notes: '',
    methods: []
  }));
}

function createSeedState() {
  const p1 = { id: 'per_ana', name: 'Ana Silva', role: 'Lead UX Designer', email: 'ana@uxflow.io', color: '#3D5AA9' };
  const p2 = { id: 'per_lucas', name: 'Lucas Mendes', role: 'UX Researcher', email: 'lucas@uxflow.io', color: '#B3264E' };
  const p3 = { id: 'per_carla', name: 'Carla Rocha', role: 'Product Designer', email: 'carla@uxflow.io', color: '#006A67' };

  const stages = createEmptyStages();
  stages[0].responsibleIds = ['per_lucas'];
  stages[0].methods.push({
    id: 'met_demo_1',
    catalogId: 'disc-ur-1',
    titleEn: 'User Interviews',
    titlePt: 'Entrevistas com usuários',
    group: 'Pesquisa com usuários',
    status: 'done',
    progress: 100,
    weight: 1,
    priority: 'high',
    effort: '5d',
    risk: '',
    responsibleIds: ['per_lucas'],
    startDate: '2026-11-10',
    endDate: '2026-11-18',
    objective: 'Entender as principais fricções no fluxo de transferência Pix.',
    blocks: {
      notes: 'Foram entrevistados 8 clientes recorrentes. A maioria sente insegurança ao confirmar chaves desconhecidas.',
      checklist: [
        { id: 'chk_1', text: 'Definir roteiro semiestruturado', done: true },
        { id: 'chk_2', text: 'Recrutar 8 participantes', done: true },
        { id: 'chk_3', text: 'Consolidar gravações e notas', done: true }
      ],
      table: {
        headers: ['Participante', 'Perfil', 'Principal Dor'],
        rows: [
          ['P01', 'Heavy user', 'Não vê o banco de destino com destaque'],
          ['P02', 'Ocasional', 'Medo de errar o valor por falta de revisão']
        ]
      }
    },
    templateData: {
      script: '1. Conte sobre a última transferência Pix que você fez.\n2. O que você verifica antes de digitar a senha?',
      quotes: [
        { author: 'P01', text: 'Eu sempre fico com medo de mandar para a pessoa errada porque o nome do banco fica pequeno.' }
      ]
    },
    findings: [
      {
        id: 'fnd_1',
        title: 'Baixa hierarquia visual nos dados do recebedor',
        description: '6 de 8 usuários hesitaram mais de 10 segundos na tela de confirmação.',
        severity: 'high',
        tags: ['Pix', 'Confiança'],
        promotedToInsight: true
      }
    ],
    evidences: [],
    conclusion: 'Priorizar redesenho da tela de confirmação com destaque para instituição e nome completo.'
  });

  stages[1].responsibleIds = ['per_ana'];
  stages[1].methods.push({
    id: 'met_demo_2',
    catalogId: 'def-rp-4',
    titleEn: 'Problem Statement',
    titlePt: 'Declaração do problema',
    group: 'Redefinir o problema',
    status: 'in_progress',
    progress: 50,
    weight: 1,
    priority: 'high',
    effort: '3d',
    risk: '',
    responsibleIds: ['per_ana'],
    startDate: '2026-11-19',
    endDate: '2026-11-26',
    objective: 'Sintetizar o problema central da jornada de pagamentos.',
    blocks: {
      notes: 'Usuários precisam validar rapidamente a identidade do destinatário antes de concluir uma transferência.',
      checklist: [
        { id: 'chk_4', text: 'Revisar achados de Discover', done: true },
        { id: 'chk_5', text: 'Validar declaração com PM', done: false }
      ],
      table: {
        headers: ['Elemento', 'Definição'],
        rows: [
          ['Usuário', 'Correntista mobile'],
          ['Necessidade', 'Segurança visual rápida']
        ]
      }
    },
    templateData: {
      user: 'Clientes que realizam transferências Pix pelo celular',
      need: 'Confirmar rapidamente a identidade e o banco do destinatário',
      insight: 'A baixa hierarquia visual gera insegurança e hesitação antes da senha',
      hmw: 'Como poderíamos tornar a revisão dos dados do recebedor instantânea e à prova de erros?'
    },
    findings: [],
    evidences: [],
    conclusion: ''
  });

  return {
    projects: [
      {
        id: 'proj_demo_1',
        name: 'Redesign Jornada Pix — App Mobile',
        description: 'Revisão completa da experiência de transferências e comprovantes para reduzir erros e aumentar confiança.',
        color: '#3D5AA9',
        status: 'active',
        startDate: '2026-11-10',
        endDate: '2026-12-18',
        ownerIds: ['per_ana'],
        stages,
        customRoadmapItems: [],
        milestones: [
          { id: 'ms_1', title: 'Aprovação Conceito', date: '2026-12-04', stageKey: 'ideate' }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    people: [p1, p2, p3],
    lastSavedAt: null
  };
}

class Store {
  constructor() {
    this.listeners = new Set();
    this.undoStack = [];
    this.state = this.load();
    this.initTheme();
  }

  initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', saved);
  }

  getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  toggleTheme() {
    const next = this.getTheme() === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    this.notify();
    return next;
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Erro ao ler localStorage:', e);
    }
    const seed = createSeedState();
    this.saveImmediate(seed);
    return seed;
  }

  saveImmediate(stateObj = this.state) {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    stateObj.lastSavedAt = `${hh}:${mm}`;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateObj));
  }

  commit(mutator, recordUndo = true) {
    if (recordUndo) {
      this.undoStack.push(JSON.stringify(this.state));
      if (this.undoStack.length > 25) this.undoStack.shift();
    }
    mutator(this.state);
    this.saveImmediate();
    this.notify();
  }

  undo() {
    if (!this.undoStack.length) return false;
    const prev = this.undoStack.pop();
    this.state = JSON.parse(prev);
    this.saveImmediate();
    this.notify();
    return true;
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  // === Cálculos de Progresso ===
  calcStageProgress(stage) {
    if (!stage || !stage.methods || stage.methods.length === 0) return 0;
    let totalWeight = 0;
    let weightedSum = 0;
    for (const m of stage.methods) {
      const w = m.weight || 1;
      totalWeight += w;
      weightedSum += (m.progress || 0) * w;
    }
    return totalWeight ? Math.round(weightedSum / totalWeight) : 0;
  }

  calcProjectProgress(project) {
    if (!project || !project.stages || project.stages.length === 0) return 0;
    const sum = project.stages.reduce((acc, st) => acc + this.calcStageProgress(st), 0);
    return Math.round(sum / project.stages.length);
  }

  // === CRUD Projetos ===
  createProject({ name, description, color, startDate, endDate, ownerIds }) {
    const id = generateId('proj');
    this.commit(s => {
      s.projects.unshift({
        id,
        name,
        description: description || '',
        color: color || '#3D5AA9',
        status: 'active',
        startDate: startDate || '2026-11-23',
        endDate: endDate || '2026-12-23',
        ownerIds: ownerIds || [],
        stages: createEmptyStages(),
        customRoadmapItems: [],
        milestones: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    });
    return id;
  }

  createProjectFromTemplate({ name, description, color, ownerIds, templateId }) {
    const projectId = this.createProject({ name, description, color, ownerIds });
    const tpl = PROJECT_TEMPLATES.find(t => t.id === templateId);
    if (tpl && tpl.methodsByStage) {
      Object.entries(tpl.methodsByStage).forEach(([stageKey, catalogIds]) => {
        const stageCatalog = UX_CATALOG.find(s => s.key === stageKey);
        if (!stageCatalog) return;
        catalogIds.forEach(cid => {
          for (const grp of stageCatalog.groups) {
            const found = grp.methods.find(m => m.catalogId === cid);
            if (found) {
              this.addMethodToStage(projectId, stageKey, { ...found, group: grp.name });
              break;
            }
          }
        });
      });
    }
    return projectId;
  }

  updateProject(projectId, patch) {
    this.commit(s => {
      const p = s.projects.find(item => item.id === projectId);
      if (p) {
        Object.assign(p, patch, { updatedAt: new Date().toISOString() });
      }
    });
  }

  duplicateProject(projectId) {
    const orig = this.state.projects.find(p => p.id === projectId);
    if (!orig) return;
    const copy = JSON.parse(JSON.stringify(orig));
    copy.id = generateId('proj');
    copy.name = `${orig.name} (Cópia)`;
    copy.createdAt = new Date().toISOString();
    copy.stages.forEach(st => {
      st.methods.forEach(m => { m.id = generateId('met'); });
    });
    this.commit(s => s.projects.unshift(copy));
  }

  deleteProject(projectId) {
    this.commit(s => {
      s.projects = s.projects.filter(p => p.id !== projectId);
    });
  }

  reorderProjects(fromIndex, toIndex) {
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= this.state.projects.length) return;
    this.commit(s => {
      const [moved] = s.projects.splice(fromIndex, 1);
      s.projects.splice(toIndex, 0, moved);
    });
  }

  // === CRUD Métodos dentro de Etapa ===
  addMethodToStage(projectId, stageKey, methodMeta) {
    const id = generateId('met');
    this.commit(s => {
      const proj = s.projects.find(p => p.id === projectId);
      const stage = proj?.stages.find(st => st.key === stageKey);
      if (!stage) return;
      stage.methods.push({
        id,
        catalogId: methodMeta.catalogId || null,
        titleEn: methodMeta.titleEn || methodMeta.titlePt,
        titlePt: methodMeta.titlePt,
        group: methodMeta.group || 'Personalizado',
        status: 'todo',
        progress: 0,
        weight: 1,
        priority: 'medium',
        effort: '2d',
        risk: '',
        responsibleIds: [],
        startDate: proj.startDate || '2026-11-23',
        endDate: proj.startDate || '2026-11-28',
        objective: '',
        blocks: {
          notes: '',
          checklist: [],
          table: { headers: ['Critério / Item', 'Observação', 'Status'], rows: [] }
        },
        templateData: {},
        findings: [],
        evidences: [],
        conclusion: ''
      });
      proj.updatedAt = new Date().toISOString();
    });
    return id;
  }

  updateMethod(projectId, stageKey, methodId, mutator) {
    this.commit(s => {
      const proj = s.projects.find(p => p.id === projectId);
      const stage = proj?.stages.find(st => st.key === stageKey);
      const method = stage?.methods.find(m => m.id === methodId);
      if (!method) return;
      mutator(method);
      if (method.status === 'done' && method.progress < 100) method.progress = 100;
      proj.updatedAt = new Date().toISOString();
    });
  }

  removeMethod(projectId, stageKey, methodId) {
    this.commit(s => {
      const proj = s.projects.find(p => p.id === projectId);
      const stage = proj?.stages.find(st => st.key === stageKey);
      if (!stage) return;
      stage.methods = stage.methods.filter(m => m.id !== methodId);
    });
  }

  reorderMethods(projectId, stageKey, fromIndex, toIndex) {
    this.commit(s => {
      const proj = s.projects.find(p => p.id === projectId);
      const stage = proj?.stages.find(st => st.key === stageKey);
      if (!stage || fromIndex === toIndex || toIndex < 0 || toIndex >= stage.methods.length) return;
      const [moved] = stage.methods.splice(fromIndex, 1);
      stage.methods.splice(toIndex, 0, moved);
    });
  }

  // === Fonte Única de Dados do Roadmap (Métodos + Itens Avulsos) ===
  getUnifiedRoadmapItems(project) {
    if (!project) return [];
    const items = [];

    project.stages.forEach(st => {
      st.methods.forEach(m => {
        items.push({
          id: m.id,
          sourceType: 'method',
          stageKey: st.key,
          methodId: m.id,
          title: m.titlePt,
          subtitle: m.titleEn,
          assigneeIds: m.responsibleIds || [],
          start: m.startDate || project.startDate || '2026-11-23',
          end: m.endDate || m.startDate || project.startDate || '2026-11-29',
          status: m.status || 'todo',
          priority: m.priority || 'medium',
          effort: m.effort || '2d',
          risk: m.risk || '',
          progress: m.progress || 0,
          dependsOn: m.dependsOn || []
        });
      });
    });

    (project.customRoadmapItems || []).forEach(c => {
      items.push({
        ...c,
        sourceType: 'custom'
      });
    });

    return items;
  }

  updateRoadmapItem(projectId, itemId, sourceType, stageKey, patch) {
    if (sourceType === 'method') {
      this.updateMethod(projectId, stageKey, itemId, m => {
        if (patch.start !== undefined) m.startDate = patch.start;
        if (patch.end !== undefined) m.endDate = patch.end;
        if (patch.status !== undefined) {
          m.status = patch.status;
          if (patch.status === 'done') m.progress = 100;
          if (patch.status === 'todo') m.progress = 0;
          if (patch.status === 'review' && m.progress < 80) m.progress = 85;
          if (patch.status === 'in_progress' && m.progress === 0) m.progress = 25;
        }
        if (patch.priority !== undefined) m.priority = patch.priority;
        if (patch.effort !== undefined) m.effort = patch.effort;
        if (patch.risk !== undefined) m.risk = patch.risk;
        if (patch.assigneeIds !== undefined) m.responsibleIds = patch.assigneeIds;
        if (patch.dependsOn !== undefined) m.dependsOn = patch.dependsOn;
      });
    } else {
      this.commit(s => {
        const proj = s.projects.find(p => p.id === projectId);
        if (!proj) return;
        proj.customRoadmapItems = proj.customRoadmapItems || [];
        const item = proj.customRoadmapItems.find(i => i.id === itemId);
        if (item) Object.assign(item, patch);
      });
    }
  }

  addCustomRoadmapItem(projectId, data) {
    this.commit(s => {
      const proj = s.projects.find(p => p.id === projectId);
      if (!proj) return;
      proj.customRoadmapItems = proj.customRoadmapItems || [];
      proj.customRoadmapItems.push({
        id: generateId('rm'),
        title: data.title,
        stageKey: data.stageKey || 'discover',
        assigneeIds: data.assigneeIds || [],
        start: data.start || '2026-11-23',
        end: data.end || '2026-11-28',
        status: data.status || 'todo',
        priority: data.priority || 'medium',
        effort: data.effort || '1d',
        risk: data.risk || '',
        progress: data.status === 'done' ? 100 : 0,
        dependsOn: []
      });
    });
  }

  addMilestone(projectId, { title, date, stageKey }) {
    this.commit(s => {
      const proj = s.projects.find(p => p.id === projectId);
      if (!proj) return;
      proj.milestones = proj.milestones || [];
      proj.milestones.push({
        id: generateId('ms'),
        title,
        date,
        stageKey: stageKey || 'evaluate'
      });
    });
  }

  // === Equipe ===
  addPerson({ name, role, email, color }) {
    this.commit(s => {
      s.people.push({
        id: generateId('per'),
        name,
        role: role || 'UX Designer',
        email: email || '',
        color: color || '#3D5AA9'
      });
    });
  }

  removePerson(personId) {
    this.commit(s => {
      s.people = s.people.filter(p => p.id !== personId);
    });
  }

  // === Exportar / Importar JSON & CSV ===
  exportJSON(projectId = null) {
    const projects = projectId
      ? this.state.projects.filter(p => p.id === projectId)
      : this.state.projects;

    return JSON.stringify({
      schemaVersion: CURRENT_SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      app: 'UX Flow M3',
      projects,
      people: this.state.people
    }, null, 2);
  }

  exportRoadmapCSV(project) {
    const items = this.getUnifiedRoadmapItems(project);
    const header = ['Etapa', 'Entrega', 'Status', 'Prioridade', 'Inicio', 'Fim', 'Progresso (%)', 'Responsavel'];
    const rows = items.map(it => {
      const resp = this.state.people.find(p => p.id === it.assigneeIds[0])?.name || 'Nao atribuido';
      return [it.stageKey, it.title, it.status, it.priority, it.start, it.end, it.progress, resp]
        .map(v => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(',');
    });
    return [header.join(','), ...rows].join('\n');
  }

  importJSON(rawObject, mode = 'merge') {
    const validated = validateAndMigrateExport(rawObject);
    this.commit(s => {
      const existingPeopleIds = new Set(s.people.map(p => p.id));
      validated.people.forEach(p => {
        if (!existingPeopleIds.has(p.id)) s.people.push(p);
      });

      if (mode === 'replace') {
        s.projects = validated.projects;
      } else if (mode === 'as_new') {
        validated.projects.forEach(p => {
          p.id = generateId('proj');
          p.name = `${p.name} (Importado)`;
          p.stages.forEach(st => st.methods.forEach(m => { m.id = generateId('met'); }));
          s.projects.unshift(p);
        });
      } else {
        validated.projects.forEach(incoming => {
          const idx = s.projects.findIndex(p => p.id === incoming.id);
          if (idx >= 0) s.projects[idx] = incoming;
          else s.projects.unshift(incoming);
        });
      }
    });
  }

  resetAll() {
    localStorage.removeItem(STORAGE_KEY);
    this.state = createSeedState();
    this.notify();
  }
}

export const store = new Store();