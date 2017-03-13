LINTER := ./node_modules/jshint/bin/jshint
.PHONY: lint
lint:
	$(LINTER) modules/*

