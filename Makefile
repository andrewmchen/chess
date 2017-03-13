LINTER := ./node_modules/.bin/eslint
WEBPACK_SERVE := ./node_modules/.bin/webpack-dev-server
.PHONY: lint
lint:
	$(LINTER) modules
node_modules:
	npm install
serve: node_modules
	$(WEBPACK_SERVE)

