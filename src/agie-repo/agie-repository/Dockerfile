FROM node:18-alpine AS base

WORKDIR /app/agie-repository

COPY ./package.json ./package-lock.json ./

RUN npm ci

COPY ./ .

RUN npm run build

FROM base AS runner

WORKDIR /app/agie-repository

ENV NODE_ENV=production

COPY --from=base /public ./public
COPY --from=base /.next ./.next
COPY --from=base /package.json ./

EXPOSE 3000

CMD ["npm", "start"]
