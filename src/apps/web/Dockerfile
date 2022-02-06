### Base image
FROM node:16-alpine AS base
RUN apk update
WORKDIR /app
ENV YARN_CACHE_FOLDER=.yarn-cache
RUN printf '\
    find ./node_modules -type d -name ios -exec rm -rf {} + \n\
    find ./node_modules -type d -name android -exec rm -rf {} + \n\
    rm -rf ./node_modules/hermes-engine \n\
    rm -rf ./node_modules/react-native/ReactAndroid \n\
    rm -rf ./node_modules/react-native/ReactCommon \n\
    rm -rf ./node_modules/react-native/React \n\
    # more dangerous
    rm -rf ./node_modules/react-native/Libraries/Renderer \n\
    rm -rf ./node_modules/metro-hermes-compiler \n\
    rm -rf ./node_modules/jscodeshift \n\
' > /prune_node_modules.sh


### 1. Prune repo
FROM base AS pruner
RUN yarn global add turbo@1.1.2
COPY . .
RUN turbo prune --scope=repro-web-app --docker
# copy additional necessary global files (at yarn.lock level) here
RUN cp tsconfig.json ./out/full/tsconfig.json
RUN cp babel.config.js ./out/full/babel.config.js


### 2a. Dev dependencies for builder
FROM base AS dev-deps
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile
RUN sh /prune_node_modules.sh


### 2b. Prod dependencies for runtime, pruned as much as possible
FROM base AS prod-deps
RUN apk --no-cache add curl
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
COPY --from=dev-deps /app/${YARN_CACHE_FOLDER}/ /app/${YARN_CACHE_FOLDER}/
RUN yarn install --frozen-lockfile --production --prefer-offline --ignore-scripts
RUN node-prune && sh /prune_node_modules.sh
RUN rm -rf /app/${YARN_CACHE_FOLDER}


### 3. Build the app here
FROM base AS builder

# template URL, will then be replaced by scripts/apiUrl.js
# this trick allows to move this from a build-time variable to a runtime env var
ENV API_URL=http://IP_TEMPLATE:1234

COPY --from=dev-deps /app/ .
COPY --from=pruner /app/out/full/ .
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn turbo run build --scope=repro-web-app --include-dependencies --no-deps
# this also removes the app/.yarn_cache node_modules
RUN find . -name node_modules | xargs rm -rf
WORKDIR /app/src/apps/web
RUN rm -rf ./.next/cache


### 4. Run the app
FROM base AS runner
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

ARG PORT
ENV PORT ${PORT:-3000}
EXPOSE ${PORT}
ARG API_URL
ENV API_URL ${API_URL}

COPY --from=prod-deps /app/ .
COPY --from=builder --chown=nextjs:nodejs /app/ .
# chown adds extra layer (extra size) so we need to remove it
# https://www.rockyourcode.com/til-docker-chown-copies-all-files/
#RUN chown -R nextjs:nodejs /app/src/apps/web/.next

WORKDIR /app/src/apps/web
USER nextjs

# Next.js by default collects anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["yarn", "start", "-p", "${PORT}"]
