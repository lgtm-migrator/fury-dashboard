#!/usr/bin/env bash

set -e

ENV_PATH="./.env"

:> $ENV_PATH

echo "APP_ENV: ${APP_ENV}" >> $ENV_PATH
echo "SERVER_OFFLINE: ${SERVER_OFFLINE}" >> $ENV_PATH
echo "SERVER_BASE_PATH: ${SERVER_BASE_PATH}" >> $ENV_PATH