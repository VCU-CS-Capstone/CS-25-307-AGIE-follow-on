FROM node:18-alpine AS base

WORKDIR /app/agie-repository

COPY agie-repository/package.json agie-repository/package-lock.json ./

RUN npm ci

COPY agie-repository/ .

COPY agie-repository/.env.local .

RUN npm run build

FROM base AS runner

WORKDIR /app/agie-repository

ENV NODE_ENV production

COPY --from=base /app/agie-repository/public ./public
COPY --from=base /app/agie-repository/.next ./.next
COPY --from=base /app/agie-repository/package.json ./

EXPOSE 3000

CMD ["npm", "start"]
