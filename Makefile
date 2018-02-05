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
build:
	npm run build

.PHONY: serve
serve: build
	npm run serve

.PHONY: lint
lint:
	npm run lint
