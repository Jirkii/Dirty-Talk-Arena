#!/bin/sh

echo "Running database migrations..."
npx prisma migrate deploy

echo "Starting application..."
npm run start