# 📊 Consulta Crypto

Aplicação web para visualização de informações detalhadas de criptomoedas, como gráficos de preço dos últimos 7 dias, estatísticas de mercado e muito mais.

---

## 🚀 Tecnologias utilizadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [CoinGecko API](https://www.coingecko.com/en/api)

---

## 📦 Instalação e uso local

```bash
# 1. Clone o repositório
git clone https://github.com/brunohpm/consulta_crypto.git
cd consulta_crypto

# 2. Instale as dependências
npm install

# 3. Crie um arquivo .env.local se necessário
touch .env.local

# 4. Execute o projeto localmente
npm run dev
```

---

## 🔗 Deploy

A aplicação está disponível online via [Vercel](https://vercel.com/):

👉 **https://consulta-crypto.vercel.app**

---

## 🧪 Scripts úteis

```bash
npm run dev       # roda o servidor local em localhost:3000
npm run build     # build de produção
npm run lint      # verificação de código com ESLint
npm run start     # iniciar o servidor após o build
```

---

## 📁 Estrutura de pastas

```
/app
  /coin/[id]      -> Página de detalhes de criptomoeda
  /components     -> Componentes reutilizáveis (PriceChart, Card, etc.)
  /lib            -> Funções auxiliares e chamadas API
  /types          -> Tipagens globais do projeto
```

---

## 📁 Executar o docker

Instalar o Docker.

```bash
npm run build
docker build -t consulta_crypto .
docker run -p 3000:3000 consulta-crypto
```

## 📁 Executar os Testes

```bash
npm run test
```

## 🧑‍💻 Autor

Bruno Monteiro  
[github.com/brunohpm](https://github.com/brunohpm)
