LINTER := ./node_modules/.bin/eslint
WEBPACK_SERVE := ./node_modules/.bin/webpack-dev-server
PROTO_SRC := api
PY_PROTO_DST := backend/proto
JS_PROTO_DST := modules/generated
.PHONY: lint proto

all: proto static/bundle.js

lint:
	$(LINTER) --ignore-pattern $(JS_PROTO_DST) modules

node_modules:
	npm install

static/bundle.js: node_modules modules
	./node_modules/.bin/webpack

serve: node_modules lint
	$(WEBPACK_SERVE)

proto: $(PY_PROTO_DST)/chess_pb2.py $(JS_PROTO_DST)/proto.json

$(PY_PROTO_DST)/chess_pb2.py: $(PROTO_SRC)
	mkdir -p $(PY_PROTO_DST)
	touch $(PY_PROTO_DST)/__init__.py
	protoc -I=$(PROTO_SRC) --python_out=$(PY_PROTO_DST) $(PROTO_SRC)/*

$(JS_PROTO_DST)/proto.json: $(PROTO_SRC)
	mkdir -p $(JS_PROTO_DST)
	./node_modules/.bin/pbjs -t json api/chess.proto -o $(JS_PROTO_DST)/proto.json

