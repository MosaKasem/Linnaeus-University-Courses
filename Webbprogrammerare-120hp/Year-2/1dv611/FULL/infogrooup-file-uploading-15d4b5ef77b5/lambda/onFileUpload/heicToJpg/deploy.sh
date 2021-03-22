#!/bin/bash

# Read environment variables from file if .env exists.
set -a
  [ -f .env ] && . ./.env
set +a

# Change executable access for binarys
chmod +x ./bin/*

echo "Deploying lambda function"
./scripts/install-dependencies.sh
./scripts/build-code.sh
./scripts/deploy.sh

