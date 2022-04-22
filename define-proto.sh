#!/bin/bash
set -o errexit -o nounset -o pipefail

ROOT_PROTO_DIR="./proto/documentservice"
ROOT_COSMOS_PROTO_DIR="./proto/cosmos/cosmos-sdk"
COSMOS_PROTO_DIR="$ROOT_COSMOS_PROTO_DIR/proto"
THIRD_PARTY_PROTO_DIR="$ROOT_COSMOS_PROTO_DIR/third_party/proto"
OUT_DIR="./blockchain_types"

mkdir -p "$OUT_DIR"
protoc \
    --plugin="$(yarn bin protoc-gen-ts_proto)" \
    --ts_proto_out="$OUT_DIR" \
    --proto_path="$ROOT_PROTO_DIR" \
    --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true" \
    "$ROOT_PROTO_DIR/annex.proto" \
    "$ROOT_PROTO_DIR/contract.proto" \
    "$ROOT_PROTO_DIR/tx.proto"  
#   --proto_path="$THIRD_PARTY_PROTO_DIR" \

# Remove unnecessary codec files
# rm -rf \
#   src/codec/cosmos_proto/ \
#   src/codec/gogoproto/ \
#   src/codec/google/api/ \
#   src/codec/google/protobuf/descriptor.ts