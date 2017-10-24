LINTER := ./node_modules/.bin/eslint
WEBPACK_SERVE := ./node_modules/.bin/webpack-dev-server --content-base build/
PROTO_SRC := api
PY_PROTO_DIR := backend/proto
PY_PROTO_DST := $(PY_PROTO_DIR)/chess_pb2.py
JS_PROTO_DST := $(JS_PROTO_DIR)/proto.json
.PHONY: lint proto clean

all: proto out/bundle.js

clean:
	rm -rf build

build: static build/bundle.js
	cp -r static/ build/

lint:
	$(LINTER) --ignore-pattern $(JS_PROTO_DST) js

node_modules:
	npm install

build/bundle.js: node_modules js
	./node_modules/.bin/webpack

serve: node_modules lint build
	$(WEBPACK_SERVE)

proto: $(PY_PROTO_DST)/chess_pb2.py $(JS_PROTO_DST)/proto.json

$(PY_PROTO_DST)/chess_pb2.py: $(PROTO_SRC)
	mkdir -p $(PY_PROTO_DST)
	touch $(PY_PROTO_DST)/__init__.py
	protoc -I=$(PROTO_SRC) --python_out=$(PY_PROTO_DST) $(PROTO_SRC)/*

$(JS_PROTO_DST)/proto.json: $(PROTO_SRC)
	mkdir -p $(JS_PROTO_DST)
	./node_modules/.bin/pbjs -t json api/chess.proto -o $(JS_PROTO_DST)/proto.json
