# Ramblas Sites

Site institucional da Ramblas Sites com quatro modelos demonstrativos navegáveis (pizzaria, barbearia, escritório e concessionária). Feito em **React + Vite + TypeScript**, sem dependências pagas, pronto para GitHub e Netlify.

> Todas as empresas apresentadas nos modelos são **fictícias**: “Projeto demonstrativo — empresa fictícia criada para apresentar possibilidades.” Nenhuma é cliente real, e preços, avaliações, equipes e estoques são ilustrativos. As fotografias também foram criadas com IA para compor essas demonstrações.

---

## 1. Rodar localmente

Pré-requisito: Node.js 20.19 ou superior (ou Node.js 22.12+).

```bash
npm install      # instala as dependências
npm run dev      # inicia em http://localhost:5173
npm run test     # roda os testes das regras de negócio
npm run build    # gera a pasta dist/ para publicação
npm run preview  # serve a dist/ localmente para conferência
```

---

## 2. Onde alterar cada coisa

### Contato, WhatsApp, preços, serviços e textos
Arquivo único: **`src/config/site.config.ts`**

| O que mudar | Onde |
| --- | --- |
| Número do WhatsApp | `contato.whatsapp` (só números, com o 55 na frente: `5511999998888`) |
| WhatsApp exibido na tela | `contato.whatsappExibicao` |
| E-mail, LinkedIn, cidade, domínio | `contato` |
| Mensagem padrão do botão flutuante | `mensagemPadrao` |
| Itens do menu | `navegacao` |
| Título e texto do topo | `hero` |
| Benefícios, serviços, etapas | `beneficios`, `servicos`, `etapas` |
| **Preços dos planos** | `planos` → campo `apartirDe` (informe o número ou deixe `''` para exibir “Sob consulta”) |
| Perguntas do FAQ | `faq` |
| Opções do formulário | `funcionalidadesDesejadas`, `segmentosFormulario` |

### Dados dos modelos (cards e páginas individuais)
**`src/data/modelos.ts`** — nome, segmento, resumo, capa, funcionalidades, indicações, personalizações, integrações, prazo e o que é apenas demonstrativo.

### Conteúdo de cada demonstração

| Modelo | Arquivo de dados |
| --- | --- |
| Forno 27 (pizzaria) | `src/demos/pizzaria/dados.ts` — produtos, tamanhos, adicionais, bairros e taxas, horários, avaliações |
| Distrito 13 (barbearia) | `src/demos/barbearia/dados.ts` — serviços, duração, preços, equipe, planos, horários |
| Áurea (escritório) | `src/demos/escritorio/dados.ts` — áreas de atuação, equipe, artigos, FAQ |
| Linha Norte (concessionária) | `src/demos/concessionaria/dados.ts` — estoque, fotos, equipamentos, status |

### Aparência
- Cores e tipografia do site principal: `src/styles/base.css` (tokens no `:root`).
- Cada demonstração tem CSS próprio e isolado: `src/demos/<modelo>/<modelo>.css`, escopado pela classe raiz (`.demo-pizzaria`, `.demo-barbearia`, `.demo-escritorio`, `.demo-concessionaria`).

### Imagens
Ficam em `public/img/`, todas em **WebP** e sem links externos. As 64 imagens comerciais são fotografias criadas com IA; os quatro mapas são ilustrações vetoriais próprias. As pessoas, empresas, endereços e veículos representados são fictícios.

- O arquivo `docs/IMAGENS-GERADAS.md` registra a direção visual, a relação de ativos e as famílias de prompts usadas.
- Para trocar uma fotografia, substitua o arquivo em `public/img/` mantendo o mesmo nome e dimensão, ou aponte um novo caminho no arquivo de dados correspondente. Preserve o WebP e atualize o texto alternativo (`alt`).
- `scripts/gerar_imagens.py` é o gerador vetorial original e permanece apenas como recurso de contingência. Executá-lo sobrescreve as fotografias atuais.

---

## 3. Estrutura de pastas

```
ramblas-sites/
├── index.html                 # SEO base, Open Graph, fontes
├── netlify.toml               # build + redirect de SPA + cache
├── public/
│   ├── _redirects             # redundância do redirect para o Netlify
│   ├── favicon.svg, robots.txt, sitemap.xml
│   └── img/                   # 68 imagens WebP
├── docs/IMAGENS-GERADAS.md    # direção visual e registro dos ativos fotográficos
├── scripts/gerar_imagens.py   # gerador vetorial legado (sobrescreve as fotos)
└── src/
    ├── config/site.config.ts  # ← arquivo central de configuração
    ├── data/modelos.ts        # galeria e páginas dos modelos
    ├── lib/                   # formatação, WhatsApp, SEO, animação de entrada
    ├── components/            # cabeçalho, rodapé, galeria, formulário, comuns
    ├── pages/                 # Início, Modelos, Modelo, Privacidade, 404
    ├── styles/base.css        # tokens e estilos do site principal
    ├── demos/
    │   ├── pizzaria/          # dados, carrinho (lógica pura), tela e CSS
    │   ├── barbearia/         # dados, agenda (lógica pura), tela e CSS
    │   ├── escritorio/        # dados, layout, home, área e artigo
    │   └── concessionaria/    # dados, catálogo (lógica pura), tela, veículo, comparador
    └── tests/regras.test.ts   # 33 testes das regras de negócio
```

### Rotas

| Rota | Página |
| --- | --- |
| `/` | Home com hero, benefícios, modelos, serviços, como funciona, planos, contato e FAQ |
| `/modelos` | Galeria completa com filtros |
| `/modelos/:slug` | Página individual do modelo, com alternador computador/celular |
| `/demonstracao/forno-27` | Pizzaria |
| `/demonstracao/distrito-13` | Barbearia |
| `/demonstracao/aurea` | Escritório |
| `/demonstracao/aurea/areas/:slug` | Área de atuação |
| `/demonstracao/aurea/artigos/:slug` | Artigo |
| `/demonstracao/linha-norte` | Concessionária |
| `/demonstracao/linha-norte/veiculo/:slug` | Veículo |
| `/demonstracao/linha-norte/comparar?v=a,b` | Comparador |
| `/privacidade` | Política de privacidade |

---

## 4. Publicar no GitHub e no Netlify

### GitHub
```bash
git init
git add .
git commit -m "Ramblas Sites"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/ramblas-sites.git
git push -u origin main
```

### Netlify
1. Netlify → **Add new site → Import an existing project → GitHub** e escolha o repositório.
2. As configurações já vêm do `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Deploy**. A cada `git push` na branch `main`, o Netlify republica sozinho.
4. Em **Site configuration → Domain management** você define o subdomínio `.netlify.app` ou aponta um domínio próprio.

O `netlify.toml` e o `public/_redirects` já contêm a regra `/* → /index.html 200`, necessária para as rotas internas (`/modelos/forno-27`, por exemplo) funcionarem quando o visitante abre o link direto ou atualiza a página.

Depois de publicar, troque o domínio em `contato.site` (`src/config/site.config.ts`), no `index.html` (canonical e Open Graph), no `sitemap.xml` e no `robots.txt`.

---

## 5. O que é funcional e o que é demonstrativo

### Funciona de verdade no navegador
- Menu mobile, navegação entre páginas, âncoras e rolagem.
- Filtros e busca do cardápio da pizzaria; escolha de tamanho e adicionais; carrinho com quantidade, entrega/retirada, taxa por bairro e cálculo de subtotal e total.
- Agenda da barbearia: escolha de serviço, profissional, dia e horário, com bloqueio dos dias em que o profissional não atende.
- Catálogo da concessionária: busca, filtros de marca, modelo, câmbio, ano, preço e quilometragem, ordenação, comparador de até três veículos e simulador de parcelas.
- Todos os formulários validam os campos e montam a mensagem organizada para o WhatsApp.
- Estados de carregamento, vazio, sucesso e erro.

### É apenas demonstrativo
- **Nada é gravado**: carrinho, agenda, comparação e formulários vivem só na sessão do navegador.
- Horários livres da barbearia são gerados por uma função determinística, não por uma agenda real.
- Avaliações, endereços, mapas, equipes, artigos, veículos e preços são fictícios.
- A simulação de financiamento usa a fórmula Price a 1,49% ao mês, sem consulta a banco, sem análise de crédito e sem tarifas. Não é oferta.
- O “envio de documentos” do escritório apenas lista os arquivos escolhidos; nada sai do navegador.
- Os painéis administrativos são apresentados como possibilidade, não existem nesta versão.

### O que exigiria backend em um projeto real
| Recurso | O que é necessário |
| --- | --- |
| Painel administrativo (produtos, preços, estoque, conteúdos) | Banco de dados, autenticação e área protegida |
| Agenda com bloqueio de horário e lembretes | Banco de dados + API oficial do WhatsApp ou serviço de mensagens |
| Pagamento online (Pix, cartão) | Gateway de pagamento e servidor para confirmar transações |
| Envio de formulários por e-mail ou CRM | Serviço de e-mail transacional ou integração com CRM |
| Guarda de documentos enviados | Armazenamento com controle de acesso e política de retenção |
| Importação de estoque por planilha/XML e publicação em portais | Rotina de integração no servidor |
| Cálculo real de frete por distância | API de rotas e cadastro de zonas de entrega |

---

## 6. Qualidade

- HTML semântico, navegação por teclado com foco visível e link “pular para o conteúdo”.
- Contraste conferido nos textos sobre fundos claros e escuros; `prefers-reduced-motion` respeitado.
- Títulos, descrições, canonical, Open Graph e dados estruturados (JSON-LD) atualizados por página.
- Imagens WebP com `width`, `height`, `loading="lazy"` e texto alternativo.
- Demonstrações carregadas sob demanda (code splitting), para a home abrir leve no celular.
- 33 testes automatizados cobrindo carrinho, busca, agenda, filtros, financiamento, máscaras e montagem das mensagens.
