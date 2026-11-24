/**
 * Renderer Genérico M3
 * Constrói a interface de qualquer documento a partir de seu schema declarativo.
 * Suporta tipos: text, textarea, list, table, date, number, readonly-text,
 * além de blocos especializados declarativos (experiment-table, screener-questions, missions).
 */

import { el } from './ui.js';
import { deepClone } from './store.js';

export class DocumentRenderer {
  /**
   * @param {HTMLElement} mountNode
   * @param {import('./store.js').DocumentStore} store
   */
  constructor(mountNode, store) {
    this.mountNode = mountNode;
    this.store = store;
  }

  /**
   * Renderiza completamente um schema de documento
   * @param {Object} schema
   */
  render(schema) {
    this.mountNode.innerHTML = '';

    for (const section of schema.sections) {
      const card = el('section', {
        className: 'm3-card',
        'aria-labelledby': `sec-title-${section.id}`
      });

      const header = el('div', { className: 'm3-card__header' }, [
        el('h2', {
          className: 'm3-card__title',
          id: `sec-title-${section.id}`,
          textContent: section.title
        })
      ]);
      card.append(header);

      for (const item of section.fields) {
        const rendered = this.renderFieldItem(schema.id, item);
        if (rendered) {
          card.append(rendered);
        }
      }

      this.mountNode.append(card);
    }
  }

  /**
   * Resolve valor atual e callback de atualização (compartilhado vs. documento)
   */
  getBinding(docId, field) {
    if (field.shared) {
      return {
        value: this.store.getSharedFields()[field.key],
        onChange: (val) => this.store.updateSharedField(field.key, val)
      };
    }
    return {
      value: this.store.getDocumentFields(docId)[field.key],
      onChange: (val) => this.store.updateDocumentField(docId, field.key, val)
    };
  }

  renderFieldItem(docId, field) {
    switch (field.type) {
      case 'text':
      case 'date':
      case 'number':
        return this.renderSingleInputField(docId, field);
      case 'textarea':
        return this.renderTextareaField(docId, field);
      case 'readonly-text':
        return this.renderReadonlyText(field);
      case 'list':
        return this.renderDynamicList(docId, field);
      case 'table':
        return this.renderDynamicTable(docId, field);
      case 'experiment-table':
        return this.renderExperimentTable(docId, field);
      case 'screener-questions':
        return this.renderScreenerQuestions(docId, field);
      case 'missions':
        return this.renderMissionsBlock(docId, field);
      default:
        return null;
    }
  }

  /**
   * Campo input M3 Outlined (text, date, number)
   */
  renderSingleInputField(docId, field) {
    const { value, onChange } = this.getBinding(docId, field);
    const inputId = `field-${docId}-${field.key}`;
    const supportId = field.supportingText ? `${inputId}-support` : undefined;
    const errorId = `${inputId}-error`;

    const wrapper = el('div', { className: 'm3-field' });
    const label = el('label', {
      className: 'm3-field__label',
      for: inputId,
      textContent: field.label
    });

    const input = el('input', {
      className: 'm3-input',
      id: inputId,
      type: field.type,
      value: value ?? '',
      'aria-describedby': [supportId, errorId].filter(Boolean).join(' ') || undefined
    });

    const errorEl = el('p', {
      className: 'm3-field__error',
      id: errorId,
      role: 'alert'
    });

    input.addEventListener('input', () => {
      const val = input.value;
      if (field.required && !val.trim()) {
        wrapper.dataset.invalid = 'true';
        errorEl.textContent = 'Campo obrigatório';
      } else {
        delete wrapper.dataset.invalid;
        errorEl.textContent = '';
      }
      onChange(val);
    });

    wrapper.append(label, input);
    if (field.supportingText) {
      wrapper.append(
        el('p', {
          className: 'm3-field__supporting',
          id: supportId,
          textContent: field.supportingText
        })
      );
    }
    wrapper.append(errorEl);
    return wrapper;
  }

  /**
   * Campo textarea M3 Outlined
   */
  renderTextareaField(docId, field) {
    const { value, onChange } = this.getBinding(docId, field);
    const inputId = `field-${docId}-${field.key}`;
    const supportId = field.supportingText ? `${inputId}-support` : undefined;

    const wrapper = el('div', { className: 'm3-field' });
    const label = el('label', {
      className: 'm3-field__label',
      for: inputId,
      textContent: field.label
    });

    const textarea = el('textarea', {
      className: 'm3-textarea',
      id: inputId,
      rows: field.rows || 3,
      'aria-describedby': supportId
    });
    textarea.value = value ?? '';

    textarea.addEventListener('input', () => {
      onChange(textarea.value);
    });

    wrapper.append(label, textarea);
    if (field.supportingText) {
      wrapper.append(
        el('p', {
          className: 'm3-field__supporting',
          id: supportId,
          textContent: field.supportingText
        })
      );
    }
    return wrapper;
  }

  /**
   * Texto estático / indicação do documento
   */
  renderReadonlyText(field) {
    const wrapper = el('div', { className: 'm3-field' });
    if (field.label) {
      wrapper.append(
        el('span', { className: 'm3-field__label', textContent: field.label })
      );
    }
    wrapper.append(
      el('div', { className: 'm3-readonly-box', textContent: field.text })
    );
    return wrapper;
  }

  /**
   * Lista dinâmica M3 (adicionar/remover itens)
   */
  renderDynamicList(docId, field) {
    const { value, onChange } = this.getBinding(docId, field);
    const items = Array.isArray(value) ? value : [];

    const wrapper = el('div', { className: 'm3-field' });
    if (field.label) {
      wrapper.append(
        el('span', { className: 'm3-field__label', textContent: field.label })
      );
    }
    if (field.supportingText) {
      wrapper.append(
        el('p', { className: 'm3-field__supporting', textContent: field.supportingText })
      );
    }

    const listContainer = el('div', { className: 'm3-list-editor' });

    const renderRows = () => {
      listContainer.innerHTML = '';
      items.forEach((itemText, idx) => {
        const row = el('div', { className: 'm3-list-item-row' });

        if (field.numbered) {
          row.append(
            el('span', {
              className: 'm3-list-item-index',
              textContent: `${idx + 1}.`
            })
          );
        }

        const inputWrap = el('div', { className: 'm3-list-item-input-wrap' });
        const inputEl = field.multiline
          ? el('textarea', {
              className: 'm3-textarea',
              rows: 2,
              'aria-label': `${field.label || 'Item'} ${idx + 1}`
            })
          : el('input', {
              className: 'm3-input',
              type: 'text',
              value: itemText,
              'aria-label': `${field.label || 'Item'} ${idx + 1}`
            });

        if (field.multiline) {
          inputEl.value = itemText;
        }

        inputEl.addEventListener('input', () => {
          items[idx] = inputEl.value;
          onChange([...items]);
        });

        inputWrap.append(inputEl);

        const removeBtn = el(
          'button',
          {
            type: 'button',
            className: 'm3-icon-button m3-icon-button--danger',
            'aria-label': `Remover item ${idx + 1}`,
            title: 'Remover item',
            onClick: () => {
              items.splice(idx, 1);
              onChange([...items]);
              renderRows();
            }
          },
          [el('span', { className: 'material-symbols-outlined', 'aria-hidden': 'true', textContent: 'delete' })]
        );

        row.append(inputWrap, removeBtn);
        listContainer.append(row);
      });
    };

    renderRows();

    const addBtn = el(
      'button',
      {
        type: 'button',
        className: 'm3-button m3-button--text',
        onClick: () => {
          items.push('');
          onChange([...items]);
          renderRows();
        }
      },
      [
        el('span', { className: 'material-symbols-outlined', 'aria-hidden': 'true', textContent: 'add' }),
        el('span', { textContent: 'Adicionar item' })
      ]
    );

    wrapper.append(listContainer, el('div', { className: 'm3-list-editor__footer' }, [addBtn]));
    return wrapper;
  }

  /**
   * Tabela dinâmica genérica (colunas configuráveis + linhas adicionáveis/removíveis)
   */
  renderDynamicTable(docId, field) {
    const { value, onChange } = this.getBinding(docId, field);
    const rows = Array.isArray(value) ? value : [];

    const wrapper = el('div', { className: 'm3-field' });
    if (field.label) {
      wrapper.append(el('span', { className: 'm3-field__label', textContent: field.label }));
    }

    const tableWrap = el('div', { className: 'm3-table-wrapper' });
    const table = el('table', { className: 'm3-table' });

    const thead = el('thead');
    const headRow = el('tr');
    for (const col of field.columns) {
      headRow.append(el('th', { scope: 'col', textContent: col.label }));
    }
    headRow.append(el('th', { scope: 'col', textContent: 'Ações', style: 'width: 64px;' }));
    thead.append(headRow);

    const tbody = el('tbody');

    const renderTableRows = () => {
      tbody.innerHTML = '';
      rows.forEach((rowData, rIdx) => {
        const tr = el('tr');
        for (const col of field.columns) {
          const td = el('td');
          const textarea = el('textarea', {
            className: 'm3-textarea',
            rows: 2,
            'aria-label': `${col.label} - Linha ${rIdx + 1}`
          });
          textarea.value = rowData[col.key] ?? '';
          textarea.addEventListener('input', () => {
            rows[rIdx][col.key] = textarea.value;
            onChange(deepClone(rows));
          });
          td.append(textarea);
          tr.append(td);
        }

        const actionTd = el('td');
        const delBtn = el(
          'button',
          {
            type: 'button',
            className: 'm3-icon-button m3-icon-button--danger',
            'aria-label': `Remover linha ${rIdx + 1}`,
            title: 'Remover linha',
            onClick: () => {
              rows.splice(rIdx, 1);
              onChange(deepClone(rows));
              renderTableRows();
            }
          },
          [el('span', { className: 'material-symbols-outlined', 'aria-hidden': 'true', textContent: 'delete' })]
        );
        actionTd.append(delBtn);
        tr.append(actionTd);
        tbody.append(tr);
      });
    };

    renderTableRows();
    table.append(thead, tbody);
    tableWrap.append(table);

    const addRowBtn = el(
      'button',
      {
        type: 'button',
        className: 'm3-button m3-button--text',
        onClick: () => {
          const emptyRow = {};
          for (const col of field.columns) {
            emptyRow[col.key] = '';
          }
          rows.push(emptyRow);
          onChange(deepClone(rows));
          renderTableRows();
        }
      },
      [
        el('span', { className: 'material-symbols-outlined', 'aria-hidden': 'true', textContent: 'add' }),
        el('span', { textContent: 'Adicionar linha' })
      ]
    );

    wrapper.append(tableWrap, el('div', { className: 'm3-list-editor__footer' }, [addRowBtn]));
    return wrapper;
  }

  /**
   * Tabela de 2 colunas do Experimento ("Informação" com texto de ajuda à esquerda;
   * "Descrição" com subcampos editáveis à direita).
   */
  renderExperimentTable(docId, field) {
    const tableWrap = el('div', { className: 'm3-table-wrapper' });
    const table = el('table', { className: 'm3-table exp-table' });

    const thead = el('thead', {}, [
      el('tr', {}, [
        el('th', { scope: 'col', className: 'exp-table__col-info', textContent: 'Informação' }),
        el('th', { scope: 'col', textContent: 'Descrição' })
      ])
    ]);

    const tbody = el('tbody');

    for (const rowSpec of field.rows) {
      const tr = el('tr');

      const infoTd = el('td', { className: 'exp-table__col-info' }, [
        el('span', { className: 'exp-table__info-title', textContent: rowSpec.title }),
        el('span', { className: 'exp-table__info-help', textContent: rowSpec.helpText })
      ]);

      const descTd = el('td');
      const stack = el('div', { className: 'exp-table__desc-stack' });

      for (const subField of rowSpec.subFields) {
        const renderedSub = this.renderFieldItem(docId, subField);
        if (renderedSub) {
          stack.append(renderedSub);
        }
      }

      descTd.append(stack);
      tr.append(infoTd, descTd);
      tbody.append(tr);
    }

    table.append(thead, tbody);
    tableWrap.append(table);
    return tableWrap;
  }

  /**
   * Subseções de Perguntas do Screener (cada pergunta e cada alternativa editável)
   */
  renderScreenerQuestions(docId, field) {
    const { value, onChange } = this.getBinding(docId, field);
    const subsections = Array.isArray(value) ? value : [];

    const container = el('div', { style: 'display: flex; flex-direction: column; gap: var(--md-sys-spacing-5);' });

    subsections.forEach((sub, sIdx) => {
      const subBox = el('div', { className: 'm3-subsection' });
      subBox.append(
        el('div', { className: 'm3-subsection__header' }, [
          el('h3', { className: 'm3-subsection__title', textContent: sub.title })
        ])
      );

      sub.questions.forEach((q, qIdx) => {
        const qCard = el('div', { className: 'question-card' });

        // Enunciado da pergunta
        const qInputId = `screener-q-${sIdx}-${qIdx}`;
        const qLabel = el('label', {
          className: 'm3-field__label',
          for: qInputId,
          textContent: `Pergunta ${q.number}`
        });
        const qTextarea = el('textarea', {
          className: 'm3-textarea',
          id: qInputId,
          rows: 2
        });
        qTextarea.value = q.text;
        qTextarea.addEventListener('input', () => {
          subsections[sIdx].questions[qIdx].text = qTextarea.value;
          onChange(deepClone(subsections));
        });

        qCard.append(el('div', { className: 'm3-field' }, [qLabel, qTextarea]));

        // Lista dinâmica de alternativas (se houver ou se usuário adicionar)
        const optHeader = el('span', {
          className: 'question-card__options-label',
          textContent: 'Alternativas / Regras'
        });
        const optList = el('div', { className: 'm3-list-editor' });

        const renderOptions = () => {
          optList.innerHTML = '';
          (q.options || []).forEach((optText, oIdx) => {
            const row = el('div', { className: 'm3-list-item-row' });
            const input = el('input', {
              className: 'm3-input',
              type: 'text',
              value: optText,
              'aria-label': `Alternativa ${oIdx + 1} da Pergunta ${q.number}`
            });
            input.addEventListener('input', () => {
              subsections[sIdx].questions[qIdx].options[oIdx] = input.value;
              onChange(deepClone(subsections));
            });

            const delBtn = el(
              'button',
              {
                type: 'button',
                className: 'm3-icon-button m3-icon-button--danger',
                'aria-label': `Remover alternativa ${oIdx + 1}`,
                title: 'Remover alternativa',
                onClick: () => {
                  subsections[sIdx].questions[qIdx].options.splice(oIdx, 1);
                  onChange(deepClone(subsections));
                  renderOptions();
                }
              },
              [el('span', { className: 'material-symbols-outlined', 'aria-hidden': 'true', textContent: 'delete' })]
            );

            row.append(el('div', { className: 'm3-list-item-input-wrap' }, [input]), delBtn);
            optList.append(row);
          });
        };

        renderOptions();

        const addOptBtn = el(
          'button',
          {
            type: 'button',
            className: 'm3-button m3-button--text',
            onClick: () => {
              if (!Array.isArray(subsections[sIdx].questions[qIdx].options)) {
                subsections[sIdx].questions[qIdx].options = [];
              }
              subsections[sIdx].questions[qIdx].options.push('');
              onChange(deepClone(subsections));
              renderOptions();
            }
          },
          [
            el('span', { className: 'material-symbols-outlined', 'aria-hidden': 'true', textContent: 'add' }),
            el('span', { textContent: 'Adicionar alternativa' })
          ]
        );

        qCard.append(optHeader, optList, el('div', { className: 'm3-list-editor__footer' }, [addOptBtn]));
        subBox.append(qCard);
      });

      container.append(subBox);
    });

    return container;
  }

  /**
   * Bloco dinâmico de Missões do Roteiro | Teste Assíncrono
   * Numeradas automaticamente como MISSÃO 01, MISSÃO 02, etc.
   */
  renderMissionsBlock(docId, field) {
    const { value, onChange } = this.getBinding(docId, field);
    const missions = Array.isArray(value) ? value : [];

    const wrapper = el('div', { style: 'display: flex; flex-direction: column; gap: var(--md-sys-spacing-4);' });
    const listContainer = el('div', { style: 'display: flex; flex-direction: column; gap: var(--md-sys-spacing-4);' });

    const formatMissionCode = (index) => `MISSÃO ${String(index + 1).padStart(2, '0')}`;

    const renderMissions = () => {
      listContainer.innerHTML = '';

      missions.forEach((mission, mIdx) => {
        const code = formatMissionCode(mIdx);
        const card = el('div', { className: 'mission-card' });

        // Cabeçalho da Missão com código automático e botão remover (para missões além da 1ª ou qualquer se > 1)
        const headerActions = [];
        if (missions.length > 1) {
          headerActions.push(
            el(
              'button',
              {
                type: 'button',
                className: 'm3-button m3-button--danger-text',
                'aria-label': `Remover ${code}`,
                onClick: () => {
                  missions.splice(mIdx, 1);
                  onChange(deepClone(missions));
                  renderMissions();
                }
              },
              [
                el('span', { className: 'material-symbols-outlined', 'aria-hidden': 'true', textContent: 'delete' }),
                el('span', { textContent: 'Remover missão' })
              ]
            )
          );
        }

        const header = el('div', { className: 'mission-card__header' }, [
          el('span', { className: 'mission-card__badge', textContent: code }),
          ...headerActions
        ]);

        // Nome da Missão
        const nameId = `mission-${mIdx}-name`;
        const nameInput = el('input', {
          className: 'm3-input',
          id: nameId,
          type: 'text',
          value: mission.name ?? ''
        });
        nameInput.addEventListener('input', () => {
          missions[mIdx].name = nameInput.value;
          onChange(deepClone(missions));
        });
        const nameField = el('div', { className: 'm3-field' }, [
          el('label', { className: 'm3-field__label', for: nameId, textContent: `${code}: Nome da Missão` }),
          nameInput
        ]);

        // Contexto / Cenário
        const ctxId = `mission-${mIdx}-ctx`;
        const ctxArea = el('textarea', { className: 'm3-textarea', id: ctxId, rows: 2 });
        ctxArea.value = mission.context ?? '';
        ctxArea.addEventListener('input', () => {
          missions[mIdx].context = ctxArea.value;
          onChange(deepClone(missions));
        });
        const ctxField = el('div', { className: 'm3-field' }, [
          el('label', { className: 'm3-field__label', for: ctxId, textContent: 'Contexto / Cenário' }),
          ctxArea
        ]);

        // Instrução da Tarefa (Task Prompt)
        const promptId = `mission-${mIdx}-prompt`;
        const promptArea = el('textarea', { className: 'm3-textarea', id: promptId, rows: 2 });
        promptArea.value = mission.taskPrompt ?? '';
        promptArea.addEventListener('input', () => {
          missions[mIdx].taskPrompt = promptArea.value;
          onChange(deepClone(missions));
        });
        const promptField = el('div', { className: 'm3-field' }, [
          el('label', {
            className: 'm3-field__label',
            for: promptId,
            textContent: 'Instrução da Tarefa (Task Prompt)'
          }),
          promptArea
        ]);

        // Caminho Esperado (Path Definition)
        const pathId = `mission-${mIdx}-path`;
        const pathInput = el('input', {
          className: 'm3-input',
          id: pathId,
          type: 'text',
          value: mission.pathDefinition ?? ''
        });
        pathInput.addEventListener('input', () => {
          missions[mIdx].pathDefinition = pathInput.value;
          onChange(deepClone(missions));
        });
        const pathField = el('div', { className: 'm3-field' }, [
          el('label', {
            className: 'm3-field__label',
            for: pathId,
            textContent: 'Caminho Esperado (Path Definition)'
          }),
          pathInput
        ]);

        // Tabela da Missão: Hipótese | Pergunta primária | Pergunta secundária
        const tableWrap = el('div', { className: 'm3-table-wrapper' });
        const table = el('table', { className: 'm3-table' });
        const thead = el('thead', {}, [
          el('tr', {}, [
            el('th', { scope: 'col', textContent: 'Hipótese' }),
            el('th', { scope: 'col', textContent: 'Pergunta primária' }),
            el('th', { scope: 'col', textContent: 'Pergunta secundária' }),
            el('th', { scope: 'col', textContent: 'Ações', style: 'width: 64px;' })
          ])
        ]);
        const tbody = el('tbody');

        const renderMissionTable = () => {
          tbody.innerHTML = '';
          (mission.tableRows || []).forEach((rowObj, rIdx) => {
            const tr = el('tr');
            const cols = [
              { key: 'hipotese', label: 'Hipótese' },
              { key: 'perguntaPrimaria', label: 'Pergunta primária' },
              { key: 'perguntaSecundaria', label: 'Pergunta secundária' }
            ];

            for (const c of cols) {
              const td = el('td');
              const ta = el('textarea', {
                className: 'm3-textarea',
                rows: 2,
                'aria-label': `${c.label} - ${code} - Linha ${rIdx + 1}`
              });
              ta.value = rowObj[c.key] ?? '';
              ta.addEventListener('input', () => {
                missions[mIdx].tableRows[rIdx][c.key] = ta.value;
                onChange(deepClone(missions));
              });
              td.append(ta);
              tr.append(td);
            }

            const actTd = el('td');
            const delRowBtn = el(
              'button',
              {
                type: 'button',
                className: 'm3-icon-button m3-icon-button--danger',
                'aria-label': `Remover linha ${rIdx + 1} da ${code}`,
                title: 'Remover linha',
                onClick: () => {
                  missions[mIdx].tableRows.splice(rIdx, 1);
                  onChange(deepClone(missions));
                  renderMissionTable();
                }
              },
              [el('span', { className: 'material-symbols-outlined', 'aria-hidden': 'true', textContent: 'delete' })]
            );
            actTd.append(delRowBtn);
            tr.append(actTd);
            tbody.append(tr);
          });
        };

        renderMissionTable();
        table.append(thead, tbody);
        tableWrap.append(table);

        const addRowBtn = el(
          'button',
          {
            type: 'button',
            className: 'm3-button m3-button--text',
            onClick: () => {
              missions[mIdx].tableRows.push({
                hipotese: '',
                perguntaPrimaria: '',
                perguntaSecundaria: ''
              });
              onChange(deepClone(missions));
              renderMissionTable();
            }
          },
          [
            el('span', { className: 'material-symbols-outlined', 'aria-hidden': 'true', textContent: 'add' }),
            el('span', { textContent: 'Adicionar linha' })
          ]
        );

        card.append(
          header,
          nameField,
          ctxField,
          promptField,
          pathField,
          tableWrap,
          el('div', { className: 'm3-list-editor__footer' }, [addRowBtn])
        );
        listContainer.append(card);
      });
    };

    renderMissions();

    const addMissionBtn = el(
      'button',
      {
        type: 'button',
        className: 'm3-button m3-button--tonal',
        onClick: () => {
          missions.push({
            name: '',
            context: '',
            taskPrompt: '',
            pathDefinition: '',
            tableRows: [
              { hipotese: '', perguntaPrimaria: '', perguntaSecundaria: '' },
              { hipotese: '', perguntaPrimaria: '', perguntaSecundaria: '' }
            ]
          });
          onChange(deepClone(missions));
          renderMissions();
        }
      },
      [
        el('span', { className: 'material-symbols-outlined', 'aria-hidden': 'true', textContent: 'add' }),
        el('span', { textContent: 'Adicionar missão' })
      ]
    );

    wrapper.append(listContainer, el('div', { className: 'm3-list-editor__footer' }, [addMissionBtn]));
    return wrapper;
  }
}