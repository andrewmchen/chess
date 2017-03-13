LINTER := ./node_modules/.bin/eslint
.PHONY: lint
lint:
	$(LINTER) modules

