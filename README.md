# Portfólio Pessoal — Eduardo Cunha Zortéa

Portfólio web desenvolvido como atividade da disciplina de **Programação Front-End** do curso de **Engenharia de Software** (2º semestre) da **Universidade Católica do Salvador (UCSAL)**.

---

## Funcionalidades

- **Fundo Dinâmico Interativo:** Animação em `<canvas>` com camadas de ondas que reagem suavemente ao movimento do cursor.
- **Alternância de Tema (Claro / Escuro):** Troca dinâmica entre modo escuro e modo claro por meio de variáveis CSS e atualização da paleta gráfica do fundo.
- **Cards Expansíveis:** Exibição interativa de detalhes nas seções *Sobre mim* (interesses e planos) e *Projetos* (tecnologias e aprendizados) via manipulação do DOM.
- **Formulário de Contato Funcional:** Validação nativa dos campos obrigatórios e preenchimento automático de e-mail via `mailto:`.
- **Design Responsivo:** Adaptação fluida para diferentes tamanhos de tela com CSS Grid, Flexbox e tipografia escalável (`clamp()`).

---

## Tecnologias Utilizadas

- **HTML5:** Estruturação semântica e acessibilidade (`aria-expanded`, `aria-pressed`, `role="status"`).
- **CSS3:** Variáveis customizadas (`:root`), efeitos de transparência (`backdrop-filter`), gradientes e media queries.
- **JavaScript (ES6+):** Manipulação do DOM, gerenciamento de eventos e renderização 2D com a Canvas API.

---

## Estrutura do Projeto

```text
Portfolio/
├── index.html          # Página principal do portfólio
├── style.css           # Estilização, temas e responsividade
├── script.js           # Animação em Canvas, alternância de tema e interatividade
└── siteDoVitoria.html  # Projeto complementar em HTML semântico sobre o E.C. Vitória
