#!/bin/sh
set -eu

attempt=0
until prisma db push --schema=/app/prisma/schema --skip-generate; do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 20 ]; then
    echo "Database initialization failed after 20 attempts" >&2
    exit 1
  fi
  sleep 3
done

exec node /app/apps/web/server.js
