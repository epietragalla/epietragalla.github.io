document.addEventListener('DOMContentLoaded', () => {

    // 1. Navegação em Abas via Drawer
    const drawerItems = document.querySelectorAll('.drawer-item');
    const sections = document.querySelectorAll('.content-section');

    drawerItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');

            drawerItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            item.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // 2. Menu Responsivo Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const drawer = document.getElementById('drawer');

    menuToggle.addEventListener('click', () => {
        if (drawer.style.display === 'none') {
            drawer.style.display = 'block';
        } else {
            drawer.style.display = 'none';
        }
    });

    // 3. Simulação Dinâmica de Transformação de Dados
    const btnQuant = document.getElementById('btn-quantitizing');
    const btnQual = document.getElementById('btn-qualitizing');
    const outputContainer = document.getElementById('transformation-result');

    btnQuant.addEventListener('click', () => {
        outputContainer.innerHTML = `
            <h4><strong>Processo: Quantitização (Nível 2 Ordinal / Modelo DIME)</strong></h4>
            <p style="margin-top: 8px;"><em>Texto Bruto:</em> "Os sujeitos relataram forte receio de interagir com o sistema."</p>
            <p style="color: var(--md-sys-color-primary); font-weight: 500;">➔ Recodificação Numérica: [Código: MEDO_SISTEMA | Matriz Binária: 1 | Escala de Intensidade: 4/4]</p>
        `;
    });

    btnQual.addEventListener('click', () => {
        outputContainer.innerHTML = `
            <h4><strong>Processo: Qualitização (Perfil Comparativo/Modal)</strong></h4>
            <p style="margin-top: 8px;"><em>Dados Estatísticos:</em> Média = 4.82/5.00 em abandono de tarefas digitais (p < 0.001).</p>
            <p style="color: var(--md-sys-color-accent); font-weight: 500;">➔ Construção Narrativa: "Perfil de Insegurança Operacional Severa com Rejeição Sistemática".</p>
        `;
    });

    // 4. Accordion Component
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('open');
        });
    });
});