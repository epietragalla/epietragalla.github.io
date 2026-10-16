import { CreateMLCEngine } from './vendor/web-llm/lib/index.js';

const MODEL_ID = 'SmolLM2-360M-Instruct-q4f32_1-MLC';
let enginePromise;

function updateStatus(message) {
    const status = document.getElementById('webllm-status');
    if (status) status.textContent = message;
}

async function getEngine() {
    if (!enginePromise) {
        if (!navigator.gpu) {
            throw new Error('Este navegador não oferece suporte a WebGPU.');
        }

        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
            updateStatus('GPU não disponível. Ative a aceleração de hardware e verifique edge://gpu.');
            throw new Error('O Edge expõe WebGPU, mas não encontrou um adaptador de GPU utilizável. Ative a aceleração de hardware e verifique os drivers gráficos do Linux em edge://gpu.');
        }

        updateStatus('Baixando e preparando o modelo local...');
        enginePromise = CreateMLCEngine(MODEL_ID, {
            initProgressCallback: progress => {
                updateStatus(progress.text || 'Preparando o modelo local...');
            }
        }).catch(error => {
            enginePromise = undefined;
            throw error;
        });
    }

    return enginePromise;
}

async function generateLocalAdventure(promptText) {
    const engine = await getEngine();
    updateStatus('Escrevendo a aventura localmente...');

    const reply = await engine.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: 'Você é um Mestre de RPG infantil, criativo, amigável e seguro. Responda somente em HTML simples usando p, strong, em e br.'
            },
            { role: 'user', content: promptText }
        ],
        temperature: 0.8,
        max_tokens: 700
    });

    updateStatus('Modelo local pronto. Nenhum crédito ou API externa foi usado.');
    return reply.choices[0].message.content;
}

window.generateLocalAdventure = generateLocalAdventure;