document.addEventListener("DOMContentLoaded", () => {
    //fundo dinâmico
    let canvas = document.getElementById("bg-strata");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "bg-strata";
        canvas.setAttribute("aria-hidden", "true");
        document.body.prepend(canvas);
    }

    Object.assign(canvas.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        zIndex: "0",
        pointerEvents: "none"
    });

    const container = document.querySelector(".container");
    if (container) {
        container.style.position = "relative";
        container.style.zIndex = "1";
    }

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let time = 0;
    let temaClaro = false;

    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };

    window.addEventListener("mousemove", (e) => {
        mouse.targetX = e.clientX / Math.max(window.innerWidth, 1);
        mouse.targetY = e.clientY / Math.max(window.innerHeight, 1);
    });

    function redimensionarCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener("resize", redimensionarCanvas);
    redimensionarCanvas();

    const paletaEscura = [
        { fill: "#000000", stroke: "rgba(255, 255, 255, 0.28)", lineWidth: 1.2 },
        { fill: "#0a0a0a", stroke: "rgba(180, 180, 180, 0.14)", lineWidth: 1.0 },
        { fill: "#141414", stroke: "rgba(255, 255, 255, 0.45)", lineWidth: 1.5 },
        { fill: "#050505", stroke: "rgba(130, 130, 130, 0.16)", lineWidth: 1.0 },
        { fill: "#1f1f1f", stroke: "rgba(255, 255, 255, 0.22)", lineWidth: 1.1 },
        { fill: "#0d0d0d", stroke: "rgba(255, 255, 255, 0.55)", lineWidth: 1.6 },
        { fill: "#292929", stroke: "rgba(160, 160, 160, 0.15)", lineWidth: 1.0 }
    ];

    const paletaClara = [
        { fill: "#f5f5f5", stroke: "rgba(0, 0, 0, 0.25)", lineWidth: 1.2 },
        { fill: "#eaeaea", stroke: "rgba(60, 60, 60, 0.15)", lineWidth: 1.0 },
        { fill: "#dcdcdc", stroke: "rgba(0, 0, 0, 0.45)", lineWidth: 1.5 },
        { fill: "#ffffff", stroke: "rgba(90, 90, 90, 0.18)", lineWidth: 1.0 },
        { fill: "#d0d0d0", stroke: "rgba(0, 0, 0, 0.22)", lineWidth: 1.1 },
        { fill: "#efefef", stroke: "rgba(0, 0, 0, 0.50)", lineWidth: 1.6 },
        { fill: "#c4c4c4", stroke: "rgba(40, 40, 40, 0.15)", lineWidth: 1.0 }
    ];

    const totalCamadas = 24;

    function calcularAlturaOnda(x, camadaIndex, t) {
        const fase = camadaIndex * 0.42;
        const influenciaMouseX = (mouse.x - 0.5) * 90;
        const influenciaMouseY = (mouse.y - 0.5) * 35;

        const warp =
            Math.sin(x * 0.0022 + t * 0.6 + fase) * 95 +
            Math.cos(x * 0.0045 - t * 0.45 + fase * 1.3) * 45 +
            influenciaMouseX;

        return (
            Math.sin((x + warp) * 0.0032 + t * 0.5 + fase) * 72 +
            Math.cos((x - warp * 0.6) * 0.0065 - t * 0.75 + fase * 0.8) * 32 +
            Math.sin(x * 0.011 + t * 0.9 + camadaIndex) * 10 +
            influenciaMouseY
        );
    }

    function animarFundo() {
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        const paleta = temaClaro ? paletaClara : paletaEscura;

        ctx.fillStyle = temaClaro ? "#ffffff" : "#000000";
        ctx.fillRect(0, 0, width, height);

        const espacamentoVertical = (height + 260) / totalCamadas;
        const passoX = 14;

        for (let i = 0; i < totalCamadas; i++) {
            const estilo = paleta[i % paleta.length];
            const baseY = -130 + i * espacamentoVertical;

            ctx.beginPath();
            ctx.moveTo(-20, height + 200);

            for (let x = -20; x <= width + passoX; x += passoX) {
                const y = baseY + calcularAlturaOnda(x, i, time);
                ctx.lineTo(x, y);
            }

            ctx.lineTo(width + 20, height + 200);
            ctx.closePath();

            ctx.fillStyle = estilo.fill;
            ctx.fill();

            ctx.strokeStyle = estilo.stroke;
            ctx.lineWidth = estilo.lineWidth;
            ctx.stroke();
        }

        time += 0.008;
        requestAnimationFrame(animarFundo);
    }

    animarFundo();

   //tema claro e escuro
   
    const btnTema = document.getElementById("btn-tema");
    const rootStyle = document.documentElement.style;

    function aplicarTema(claro) {
        document.body.classList.toggle("tema-claro", claro);

        if (claro) {
            rootStyle.setProperty("--bg-black", "#ffffff");
            rootStyle.setProperty("--text-white", "#0a0a0a");
            rootStyle.setProperty("--text-muted", "#4a4a4a");
            rootStyle.setProperty("--text-dim", "#666666");
            rootStyle.setProperty("--border-subtle", "rgba(0, 0, 0, 0.14)");
            rootStyle.setProperty("--card-bg", "rgba(255, 255, 255, 0.82)");
            rootStyle.setProperty("--card-border", "rgba(0, 0, 0, 0.15)");
        } else {
            rootStyle.setProperty("--bg-black", "#000000");
            rootStyle.setProperty("--text-white", "#ffffff");
            rootStyle.setProperty("--text-muted", "#8a8a8a");
            rootStyle.setProperty("--text-dim", "#3e3e42");
            rootStyle.setProperty("--border-subtle", "#1a1a1a");
            rootStyle.setProperty("--card-bg", "rgba(8, 8, 8, 0.82)");
            rootStyle.setProperty("--card-border", "#1a1a1a");
        }

        // Garante que nenhuma cor inline trave a alternância dos cards ou inputs
        document.querySelectorAll(".card, .card-tec, #form-contato input, #form-contato textarea").forEach((el) => {
            el.style.backgroundColor = "";
            el.style.borderColor = "";
        });

        if (btnTema) {
            btnTema.style.color = claro ? "#0a0a0a" : "";
            btnTema.style.borderColor = claro ? "rgba(0, 0, 0, 0.25)" : "";
            btnTema.setAttribute("aria-pressed", String(claro));
            btnTema.textContent = claro ? "Tema Escuro" : "Tema Claro";
        }
    }

    if (btnTema) {
        btnTema.textContent = "Tema Claro";
        btnTema.addEventListener("click", () => {
            temaClaro = !temaClaro;
            aplicarTema(temaClaro);
        });
    }

    // expansão do sobre mim e projetos
    const textosCards = {
        "Interesses": "Desenvolvimento Full-Stack integrando back-end em Java com interfaces web responsivas em HTML, CSS, JavaScript e ferramentas de Inteligência Artificial.",
        "Planos": "Aprofundar meus conhecimentos em arquitetura de software, APIs REST e bancos de dados ao longo da graduação na UCSAL, construindo aplicações completas e escaláveis. Além de aprofundar meus conhecimentos com cursos e pós graduações, preferencialmente em I.A., e abrir uma empresa no futuro.",
        "Projeto 1": "Tecnologias: HTML5 Semântico. Aprendizado: estruturação de páginas e hierarquia visual.",
        "Projeto 2": "Tecnologias: HTML5 Semântico, JavaScript (ES6+) e manipulação do DOM, CSS e hospedagem de aplicações. Aprendizado: eventos, validação de formulários e filtros dinâmicos.",
    };

    document.querySelectorAll(".card").forEach((card) => {
        // faz o card aumentar/diminuir sozinho, sem afetar os outros cards
        card.style.alignSelf = "start";
        const tag = card.querySelector(".card-tag")?.textContent.trim();
        const botao = card.querySelector("button");
        if (!botao) return;

        const textoOriginal = botao.textContent.trim();
        botao.setAttribute("aria-expanded", "false");

        botao.addEventListener("click", () => {
            let detalhe = card.querySelector(".card-detalhe");

            if (!detalhe) {
                detalhe = document.createElement("p");
                detalhe.className = "card-detalhe";
                detalhe.textContent = textosCards[tag] || "Detalhes adicionais sobre este item do portfólio.";
                Object.assign(detalhe.style, {
                    fontSize: "14px",
                    lineHeight: "1.6",
                    color: "var(--text-muted)",
                    marginTop: "6px",
                    marginBottom: "18px"
                });
                card.insertBefore(detalhe, botao);
                botao.textContent = "Mostrar menos";
                botao.setAttribute("aria-expanded", "true");
            } else {
                const estaOculto = detalhe.style.display === "none";
                detalhe.style.display = estaOculto ? "block" : "none";
                botao.textContent = estaOculto ? "Mostrar menos" : textoOriginal;
                botao.setAttribute("aria-expanded", String(estaOculto));
            }
        });
    });

   //formulário de contato
    const linkProjetosNav = document.querySelector('a[href="#secao-projetos"]');
    if (linkProjetosNav) {
        linkProjetosNav.setAttribute("href", "#projetos");
    }

    const formContato = document.getElementById("form-contato");
    const btnContatar = formContato?.querySelector(".btn-contatar");

    if (formContato && btnContatar) {
        const statusMsg = document.createElement("p");
        statusMsg.setAttribute("role", "status");
        Object.assign(statusMsg.style, {
            fontSize: "13px",
            marginTop: "8px",
            color: "var(--accent-cyan)"
        });
        formContato.appendChild(statusMsg);

        btnContatar.addEventListener("click", (e) => {
            e.preventDefault();

            if (!formContato.reportValidity()) {
                statusMsg.textContent = "Por favor, preencha seu nome, e-mail e mensagem antes de enviar.";
                return;
            }

            const nome = document.getElementById("contato-nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();

            const assunto = encodeURIComponent(`Contato pelo Portfólio — ${nome}`);
            const corpo = encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`);

            statusMsg.textContent = `Sua mensagem esta sendo enviada...`;
            window.location.href = `mailto:zorteaeduardo81@gmail.com?subject=${assunto}&body=${corpo}`;
        });
    }
});