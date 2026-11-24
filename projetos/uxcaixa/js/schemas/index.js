/**
 * Registro central de documentos/processos.
 * Para expandir com novos documentos no futuro, basta criar o schema e adicioná-lo aqui.
 */

import { planoPesquisaSchema } from './plano-pesquisa.js';
import { screenerSchema } from './screener.js';
import { roteiroTesteAssincronoSchema } from './roteiro-teste-assincrono.js';

export const REGISTERED_SCHEMAS = [
  planoPesquisaSchema,
  screenerSchema,
  roteiroTesteAssincronoSchema
];

export function getSchemaById(id) {
  return REGISTERED_SCHEMAS.find((s) => s.id === id) || REGISTERED_SCHEMAS[0];
}