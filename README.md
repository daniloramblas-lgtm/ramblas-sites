# Ramblas Sites

Vitrine comercial da Ramblas Sites com quatro demonstrações navegáveis (pizzaria, barbearia, escritório e concessionária). **React + Vite + TypeScript**, sem dependências pagas, com prerenderização no build e publicação no Netlify.

> As empresas das demonstrações são **fictícias** e ficam fora do índice de busca (`noindex,follow`). Não representam clientes, casos reais ou resultados.

---

## 1. Rodar e verificar

```bash
npm install
npm run dev          # http://localhost:5173
npm run test         # 49 testes das regras de negócio
npm run build        # dist/ com HTML por rota, 404.html e sitemap
npm run auditoria    # renderiza todas as rotas e confere estrutura/acessibilidade
npm run verificar    # testes + build + auditoria de uma vez
npm run imagens      # atualiza as variantes -480/-800 das imagens atuais
npm run imagens:ilustracoes # recria as ilustrações e depois as variantes
```

`npm run auditoria` roda sem navegador: renderiza cada rota no Node e falha se aparecer mais de um `<main>`, `<h1>` faltando ou duplicado, salto de nível de título, imagem sem `alt`/`width`/`height`, arquivo de imagem inexistente, âncora `#destino` inexistente ou link `target="_blank"` sem `noopener`.

---

## 2. Onde alterar cada coisa

### `src/config/site.config.ts` — arquivo central

| O que mudar | Campo |
| --- | --- |
| **Número do WhatsApp** | `contato.whatsapp` (só números, com 55: `5511999998888`) |
| Número exibido na tela | `contato.whatsappExibicao` |
| E-mail, LinkedIn, portfólio, cidade, domínio | `contato` |
| Menu, hero e pontos do hero | `navegacao`, `hero` |
| Serviços (os 6 com `destaque: true` aparecem primeiro na home) | `servicos` |
| Etapas do "Como funciona" | `etapas` |
| **Sua apresentação e sua foto** | `quemFaz` |
| FAQ da home (5 perguntas) | `faq` |
| Aviso curto de privacidade no formulário | `avisoPrivacidadeCurto` |

### Outros arquivos de conteúdo

- `src/data/modelos.ts` — cards, estudo de caso (problema/solução), personalizações, prazos.
- `src/data/rotas.ts` — **título, descrição, canonical, OG e robots de cada rota**. É esta lista que a prerenderização usa; rota nova precisa entrar aqui.
- `src/data/demos.ts` — as quatro demonstrações do seletor.
- `src/demos/<modelo>/dados.ts` — produtos, serviços, equipe, artigos, estoque.

### Aparência

- `src/styles/base.css` — tokens de cor e tipografia do site principal.
- `src/styles/tres-d.css` — camada de profundidade: mockups, vidro fosco, sombras, seletor, âncoras (`--altura-topo`).
- `src/demos/<modelo>/<modelo>.css` — identidade própria de cada demonstração, escopada pela classe raiz.

### Imagens

`public/img/`, em WebP, com variantes `-480` e `-800` (`scripts/variantes_imagens.py`) usadas via `srcset`. Para usar fotos reais, substitua os arquivos mantendo os nomes e rode `npm run imagens` para recriar somente as variantes. `npm run imagens:ilustracoes` deve ser usado apenas quando você quiser substituir tudo pelas ilustrações geradas por código.

---

## 3. O que muda com o build

`npm run build` executa `tsc` + `vite build` + `scripts/prerender.mjs`. A pré-geração grava **um HTML de entrada por rota** (28 no total) já com:

- `<title>` e meta description próprios;
- `canonical` correto (nada apontando para `/`);
- Open Graph e Twitter Card completos;
- `robots`: `index,follow` nas páginas comerciais e `noindex,follow` em `/demonstracao/**`;
- dados estruturados só nas páginas reais — as demonstrações fictícias **não** usam `Restaurant`, `Car`, `Article` nem `ProfessionalService`; os modelos aparecem como `CreativeWork`;
- `preload` da imagem principal apenas na home;
- `sitemap.xml` gerado com as 7 páginas indexáveis (home, `/modelos`, os quatro modelos e a política).

Como o Netlify serve arquivos estáticos antes dos redirects, cada rota entrega seus metadados corretos mesmo antes do JavaScript. A interface interativa depende de JavaScript. O que não existe cai na regra do `netlify.toml` que responde **404 de verdade** (`/404.html`, com `noindex` e links para a home e para os modelos).

---

## 4. Publicar

```bash
git add .
git commit -m "Revisão: páginas mais curtas, seletor de demonstrações, SEO e 3D"
git push origin main
```

O Netlify republica sozinho (`npm run build` → `dist`). Depois de comprar um domínio: troque `contato.site` em `site.config.ts`, o `robots.txt` e os endereços do `index.html`; no Netlify, aponte o domínio e deixe o `.netlify.app` redirecionando para ele.

**Selo "Powered by Netlify":** não dá para remover por código (esconder com CSS violaria os termos). Em Site configuration → General, procure a opção do badge; se o plano atual não permitir desativá-la, ela sai ao migrar de plano ou ao usar domínio próprio conforme a política vigente do Netlify.

---

## 5. Analytics (opcional)

Sem a variável `VITE_GA_ID`, nenhum script é carregado e nenhum cookie é criado. Para ativar, defina a variável no Netlify ou em `.env` (veja `.env.example`). Eventos enviados: `view_model`, `open_demo`, `switch_demo`, `whatsapp_click`, `quote_submit`, `pizza_add_to_cart`, `booking_complete`, `vehicle_compare`, `test_drive_submit` — todos sem nome, telefone, endereço ou mensagem.

---

## 6. O que funciona e o que é demonstrativo

**Funciona no navegador:** menu mobile da home e das demonstrações, seletor entre os quatro modelos, filtros da galeria, cardápio com busca/filtros/tamanhos/adicionais/carrinho/entrega/taxa por bairro, agenda com serviço–profissional–dia–horário, catálogo com filtros, ordenação, comparador e simulador, todos os formulários com validação e envio em um clique para o WhatsApp.

**É demonstrativo:** nada é gravado; horários livres são gerados por função determinística; avaliações, equipes, artigos, veículos, endereços e preços são fictícios; a simulação de financiamento usa Price a 1,49% ao mês sem consulta a banco; o envio de documentos só lista arquivos no navegador; os painéis administrativos são apresentados como possibilidade, não existem nesta versão.

**Exigiria backend:** painel administrativo, agenda com bloqueio e lembretes, pagamento online, envio por e-mail/CRM, guarda de documentos, importação de estoque e cálculo real de frete.

---

## 7. Pendências que dependem de você

### Para começar a divulgar

1. Abrir o site no seu próprio celular e confirmar os três destinos já preenchidos: WhatsApp `(11) 98266-3117`, e-mail `daniloramblas@gmail.com` e LinkedIn `linkedin.com/in/daniloramblas`.
2. Decidir se o monograma `DR` continua na apresentação ou se será substituído por uma foto sua em `public/img/`, apontada em `quemFaz.foto`.
3. Se quiser divulgar Instagram, preencher `contato.instagram`; enquanto estiver vazio, a rede não aparece.

### Pode entrar depois do lançamento

1. Comprar um domínio próprio, conectá-lo no Netlify e trocar `contato.site`, `robots.txt` e os endereços do `index.html`.
2. Criar uma medição no Google Analytics e preencher `VITE_GA_ID` no Netlify, caso queira acompanhar visitas e cliques.
3. Desativar o selo do Netlify nas configurações da conta, se o plano permitir.
4. Rodar Lighthouse novamente depois de cada alteração relevante no site publicado.

### Processo comercial fora do site

Antes de aceitar os primeiros projetos, deixe definidos o modelo de proposta/contrato, etapas de aprovação, forma de pagamento, política de manutenção e como serão tratados domínio, hospedagem e conteúdo do cliente.

A vitrine pública não apresenta preços ou planos. Os valores são tratados somente na conversa comercial, depois de entender o projeto.
