MAKEFLAGS += --warn-undefined-variables
SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := start
.DELETE_ON_ERROR:
.SUFFIXES:

.PHONY: start
start: clean
	bundle exec jekyll serve

.PHONY: install
install:
	bundle install

.PHONY: build
build: clean
	bundle exec jekyll build

.PHONY: clean
clean:
	bundle exec jekyll clean
