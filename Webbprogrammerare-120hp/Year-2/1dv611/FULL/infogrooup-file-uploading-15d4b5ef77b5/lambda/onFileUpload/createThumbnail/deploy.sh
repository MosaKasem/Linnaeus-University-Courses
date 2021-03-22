#!/bin/bash

set -a
  [ -f .env ] && . ./.env
set +a

echo "Deploying lambda function"
./scripts/install-dependencies.sh
./scripts/build-code.sh
./scripts/deploy.sh