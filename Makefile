MAKEFLAGS += --warn-undefined-variables
SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := start
.DELETE_ON_ERROR:
.SUFFIXES:

.PHONY: start
start:
	bundle exec jekyll serve

.PHONY: install
install:
	bundle install

build:
	bundle exec jekyll build
