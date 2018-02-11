MAKEFLAGS += --warn-undefined-variables
SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := start
.DELETE_ON_ERROR:
.SUFFIXES:

.PHONY: start
start:
	npm start

.PHONY: install
install:
	npm install

.PHONY: build
build: ci
	npm run build

.PHONY: serve
serve: build
	npm run serve

.PHONY: test
test:
	npm test

.PHONY: lint
lint:
	npm run lint:js
	npm run lint:css

.PHONY: ci
ci: lint test

.PHONY: codecov
codecov:
	npm run codecov

.PHONY: sentry
sentry: build
	npm run release:sentry

.PHONY: release
release: build sentry
