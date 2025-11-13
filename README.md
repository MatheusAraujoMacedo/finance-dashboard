📊 Finance Dashboard — Front-End para Portfólio

Um painel financeiro moderno, responsivo e desenvolvido com React, Vite, TailwindCSS e Recharts.
O projeto foi preparado para ser hospedado diretamente na Netlify, sem necessidade de configurar ambientes complexos.

🚀 Tecnologias utilizadas

React 18

Vite

Tailwind CSS

Recharts

CSS Modules

JavaScript (ES2023)

📂 Estrutura do Projeto
finance-dashboard/
 ├─ index.html
 ├─ package.json
 ├─ tailwind.config.cjs
 ├─ postcss.config.cjs
 ├─ README.md
 └─ src/
     ├─ main.jsx
     ├─ App.jsx
     ├─ styles.css
     └─ components/
         └─ FinanceDashboard.jsx

🌐 Deploy na Netlify (sem modo local)

Este projeto foi configurado para ser hospedado rapidamente usando o Netlify Deploy.

✅ 1. Faça login no Netlify

https://app.netlify.com/

✅ 2. Clique em “Add new site” → “Import an existing project”
✅ 3. Conecte seu repositório GitHub

Escolha o repositório onde o dashboard está publicado.

✅ 4. Configure o Build & Deploy
Configuração	Valor
Build command	npm run build
Publish directory	dist
Node version	(deixe padrão ou defina 18+)

A Netlify automaticamente instalará as dependências e compilará o projeto.

✅ 5. Clique em Deploy site

Em alguns segundos seu painel financeiro estará online em um link do tipo:

https://nome-do-seu-site.netlify.app

📦 Scripts do projeto (usados pela Netlify)

Mesmo sem rodar localmente, a Netlify utiliza:

"scripts": {
  "build": "vite build"
}


E o build process do Vite gera:

dist/


Que é enviado automaticamente para produção.

🎨 Estilos com TailwindCSS

O Tailwind está configurado no modo padrão (usado AF apenas no build da Netlify, não no seu PC).

Arquivo styles.css:
@tailwind base;
@tailwind components;
@tailwind utilities;

Arquivo tailwind.config.cjs:
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};


A Netlify irá processar isso automaticamente durante o build.

📈 Funcionalidades do projeto
✔ Dashboard completo

Saldo total

Contas (corrente, poupança, investimentos)

Gráfico de fluxo mensal

Gráfico por categorias

Metas com barra de progresso

✔ Lista de transações

Histórico de entradas/saídas

Busca por texto/data

Inserção de novas transações via modal

✔ Interface moderna e responsiva

TailwindCSS

Gráficos com Recharts

Layout limpo e profissional

🚀 Deploy automático via GitHub

Após configurado na Netlify:

Cada push no GitHub → gera um novo deploy automaticamente.

Não precisa rodar local, instalar nada ou usar terminal.

🧩 Melhorias futuras

Conexão com API real

Modo Dark

Autenticação

Exportação de CSV funcional

Organização de rotas/páginas

🤝 Autor

Feito com 💙 Por Matheus
🔗 LinkedIn: www.linkedin.com/in/matheus-araujoo-
🖥 GitHub: MatheusAraujoMacedo
