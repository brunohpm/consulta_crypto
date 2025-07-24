FROM node:18-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar apenas os artefatos prontos
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public

# USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]