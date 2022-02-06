# Base image
FROM node:16-alpine AS base
RUN apk update
WORKDIR /app
ENV YARN_CACHE_FOLDER=.yarn-cache

# 1. Prune repo
FROM base AS pruner
RUN yarn global add turbo@1.1.2
COPY . .
RUN turbo prune --scope=repro-server --docker
# copy additional necessary global files (at yarn.lock level) here
RUN cp tsconfig.json ./out/full/tsconfig.json

# 2. Dev dependencies for builder
FROM base AS dev-deps
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

# 2. Prod dependencies for runtime, pruned as much as possible
FROM base AS prod-deps
RUN apk --no-cache add curl
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
COPY --from=dev-deps /app/${YARN_CACHE_FOLDER} /${YARN_CACHE_FOLDER} 
RUN yarn install --frozen-lockfile --production --prefer-offline --ignore-scripts
RUN node-prune && cd src/apps/server && node-prune
RUN rm -rf /app/${YARN_CACHE_FOLDER}

# 3. Build the app here
FROM base AS builder
COPY --from=dev-deps /app/ .
COPY --from=pruner /app/out/full/ .
RUN yarn turbo run build --scope=repro-server --include-dependencies --no-deps
RUN yarn workspace repro-server build:ormconfig
RUN find . -name node_modules | xargs rm -rf

# 4. Run the app
FROM base AS runner
COPY --from=prod-deps /app/ .
COPY --from=builder /app/ .
WORKDIR /app/src/apps/server/
ENTRYPOINT ["node", "./dist/main.js"]
