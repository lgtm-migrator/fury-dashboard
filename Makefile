.DEFAULT_GOAL := help
SHELL := /bin/bash

## help: (default) Prints the help message
.PHONY: help
help: Makefile
	@printf "\nChoose a command run in $(shell basename ${PWD}):\n"
	@sed -n 's/^##//p' $< | column -t -s ":" |  sed -e 's/^/ /'
	@echo

require-%:
	$(if $(shell command -v $* 2> /dev/null), , $(error Please install `$*` ***))

## dependencies: Install npm packages for the UI
.PHONY: dependencies
dependencies: require-yarn
	@yarn --cwd ./web-client install

## ui: Generates the UI static files
.PHONY: ui
ui: require-yarn
	@rm -rf ./static
	@yarn --cwd ./web-client build
	@cp -R ./web-client/build ./static

## build: Generates the Linux binary from any system running docker
.PHONY: build
build: require-docker
	@mkdir -p bin/linux
	@docker build --no-cache --pull -t fury-dashboard:build .
	@docker create --name fury-dashboard-result --read-only fury-dashboard:build
	@docker cp fury-dashboard-result:/usr/local/bin/fury-dashboard bin/linux/fury-dashboard
	@docker rm fury-dashboard-result

## clean: Removes generated files
.PHONY: clean
clean: require-docker
	@docker rmi -f fury-dashboard:build
	@rm -rf .vagrant
	@rm -rf bin
