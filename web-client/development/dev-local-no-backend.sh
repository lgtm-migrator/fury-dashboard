#!/usr/bin/env bash

set -e

CONFIG_PATH="./development/config/dev-local-no-backend.config.json"
ENV_PATH="./.env"

:> $ENV_PATH

arr=()
while IFS='' read -r line; do
  arr+=("$line")
done < <(jq -r 'keys[]' $CONFIG_PATH)

for i in "${arr[@]}"
do
  echo "$i=$(jq -r .$i $CONFIG_PATH)" >> $ENV_PATH
done
