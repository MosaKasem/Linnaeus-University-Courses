#!/bin/bash

# Read environment variables from file if .env exists.
set -a
  [ -f .env ] && . ./.env
set +a

echo "Deploying lambda function"
./scripts/install-dependencies.sh
./scripts/build-code.sh
./scripts/deploy.sh

