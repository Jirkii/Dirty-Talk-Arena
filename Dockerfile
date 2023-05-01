# base node image
FROM node:16-bullseye-slim as base

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl

ENV NODE_ENV production

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /app

ADD package.json ./
RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json ./
RUN npm prune --production

# Build the app
FROM base as build

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

ADD prisma .
RUN npx prisma generate

ADD . .
RUN npm run build

# Migrate the database
FROM build as migrate

ENV DATABASE_URL="file:/mnt/data/production.db"
RUN npx prisma migrate deploy

# Finally, build the production image with minimal footprint
FROM base

ENV NODE_ENV production

COPY --from=build /app/package.json /app/

RUN echo "#!/bin/sh\nset -x\nsqlite3 $DATABASE_URL" > /usr/local/bin/database-cli && chmod +x /usr/local/bin/database-cli

WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=migrate /app/prisma/migrations /app/prisma/migrations
ADD entrypoint.sh .

ENV PORT 8080
CMD ["npm", "run", "start"]
