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
build: test
	npm run build

.PHONY: serve
serve: build
	npm run serve

.PHONY: test
test: lint
	npm test

.PHONY: lint
lint:
	npm run lint:js
	npm run lint:css
