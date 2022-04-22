/* eslint-disable */
import Long from 'long'
import * as _m0 from 'protobufjs/minimal'

export const protobufPackage = 'cosmonaut.documentservice.documentservice'

export interface MsgCreateContract {
	creator: string
	contractHash: string
	buyer: string
}

export interface MsgCreateContractResponse {
	id: Long
	createDate: string
}

export interface MsgCreateAnnex {
	creator: string
	annexHash: string
	contractId: Long
	buyer: string
}

export interface MsgCreateAnnexResponse {
	id: Long
	createDate: string
}

export interface MsgSignAnnex {
	creator: string
	annexId: Long
}

export interface MsgSignAnnexResponse {}

export interface MsgSignContract {
	creator: string
	contractId: Long
}

export interface MsgSignContractResponse {}

export interface MsgCompleteContract {
	creator: string
	contractId: Long
}

export interface MsgCompleteContractResponse {}

function createBaseMsgCreateContract(): MsgCreateContract {
	return { creator: '', contractHash: '', buyer: '' }
}

export const MsgCreateContract = {
	encode(message: MsgCreateContract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.creator !== '') {
			writer.uint32(10).string(message.creator)
		}
		if (message.contractHash !== '') {
			writer.uint32(18).string(message.contractHash)
		}
		if (message.buyer !== '') {
			writer.uint32(26).string(message.buyer)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateContract {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseMsgCreateContract()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					message.creator = reader.string()
					break
				case 2:
					message.contractHash = reader.string()
					break
				case 3:
					message.buyer = reader.string()
					break
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(object: any): MsgCreateContract {
		return {
			creator: isSet(object.creator) ? String(object.creator) : '',
			contractHash: isSet(object.contractHash) ? String(object.contractHash) : '',
			buyer: isSet(object.buyer) ? String(object.buyer) : '',
		}
	},

	toJSON(message: MsgCreateContract): unknown {
		const obj: any = {}
		message.creator !== undefined && (obj.creator = message.creator)
		message.contractHash !== undefined && (obj.contractHash = message.contractHash)
		message.buyer !== undefined && (obj.buyer = message.buyer)
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<MsgCreateContract>, I>>(object: I): MsgCreateContract {
		const message = createBaseMsgCreateContract()
		message.creator = object.creator ?? ''
		message.contractHash = object.contractHash ?? ''
		message.buyer = object.buyer ?? ''
		return message
	},
}

function createBaseMsgCreateContractResponse(): MsgCreateContractResponse {
	return { id: Long.UZERO, createDate: '' }
}

export const MsgCreateContractResponse = {
	encode(message: MsgCreateContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (!message.id.isZero()) {
			writer.uint32(8).uint64(message.id)
		}
		if (message.createDate !== '') {
			writer.uint32(18).string(message.createDate)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateContractResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseMsgCreateContractResponse()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					message.id = reader.uint64() as Long
					break
				case 2:
					message.createDate = reader.string()
					break
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(object: any): MsgCreateContractResponse {
		return {
			id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
			createDate: isSet(object.createDate) ? String(object.createDate) : '',
		}
	},

	toJSON(message: MsgCreateContractResponse): unknown {
		const obj: any = {}
		message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString())
		message.createDate !== undefined && (obj.createDate = message.createDate)
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<MsgCreateContractResponse>, I>>(object: I): MsgCreateContractResponse {
		const message = createBaseMsgCreateContractResponse()
		message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO
		message.createDate = object.createDate ?? ''
		return message
	},
}

function createBaseMsgCreateAnnex(): MsgCreateAnnex {
	return { creator: '', annexHash: '', contractId: Long.UZERO, buyer: '' }
}

export const MsgCreateAnnex = {
	encode(message: MsgCreateAnnex, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.creator !== '') {
			writer.uint32(10).string(message.creator)
		}
		if (message.annexHash !== '') {
			writer.uint32(18).string(message.annexHash)
		}
		if (!message.contractId.isZero()) {
			writer.uint32(24).uint64(message.contractId)
		}
		if (message.buyer !== '') {
			writer.uint32(34).string(message.buyer)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateAnnex {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseMsgCreateAnnex()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					message.creator = reader.string()
					break
				case 2:
					message.annexHash = reader.string()
					break
				case 3:
					message.contractId = reader.uint64() as Long
					break
				case 4:
					message.buyer = reader.string()
					break
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(object: any): MsgCreateAnnex {
		return {
			creator: isSet(object.creator) ? String(object.creator) : '',
			annexHash: isSet(object.annexHash) ? String(object.annexHash) : '',
			contractId: isSet(object.contractId) ? Long.fromString(object.contractId) : Long.UZERO,
			buyer: isSet(object.buyer) ? String(object.buyer) : '',
		}
	},

	toJSON(message: MsgCreateAnnex): unknown {
		const obj: any = {}
		message.creator !== undefined && (obj.creator = message.creator)
		message.annexHash !== undefined && (obj.annexHash = message.annexHash)
		message.contractId !== undefined && (obj.contractId = (message.contractId || Long.UZERO).toString())
		message.buyer !== undefined && (obj.buyer = message.buyer)
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<MsgCreateAnnex>, I>>(object: I): MsgCreateAnnex {
		const message = createBaseMsgCreateAnnex()
		message.creator = object.creator ?? ''
		message.annexHash = object.annexHash ?? ''
		message.contractId = object.contractId !== undefined && object.contractId !== null ? Long.fromValue(object.contractId) : Long.UZERO
		message.buyer = object.buyer ?? ''
		return message
	},
}

function createBaseMsgCreateAnnexResponse(): MsgCreateAnnexResponse {
	return { id: Long.UZERO, createDate: '' }
}

export const MsgCreateAnnexResponse = {
	encode(message: MsgCreateAnnexResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (!message.id.isZero()) {
			writer.uint32(8).uint64(message.id)
		}
		if (message.createDate !== '') {
			writer.uint32(18).string(message.createDate)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateAnnexResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseMsgCreateAnnexResponse()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					message.id = reader.uint64() as Long
					break
				case 2:
					message.createDate = reader.string()
					break
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(object: any): MsgCreateAnnexResponse {
		return {
			id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
			createDate: isSet(object.createDate) ? String(object.createDate) : '',
		}
	},

	toJSON(message: MsgCreateAnnexResponse): unknown {
		const obj: any = {}
		message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString())
		message.createDate !== undefined && (obj.createDate = message.createDate)
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<MsgCreateAnnexResponse>, I>>(object: I): MsgCreateAnnexResponse {
		const message = createBaseMsgCreateAnnexResponse()
		message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO
		message.createDate = object.createDate ?? ''
		return message
	},
}

function createBaseMsgSignAnnex(): MsgSignAnnex {
	return { creator: '', annexId: Long.UZERO }
}

export const MsgSignAnnex = {
	encode(message: MsgSignAnnex, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.creator !== '') {
			writer.uint32(10).string(message.creator)
		}
		if (!message.annexId.isZero()) {
			writer.uint32(16).uint64(message.annexId)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignAnnex {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseMsgSignAnnex()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					message.creator = reader.string()
					break
				case 2:
					message.annexId = reader.uint64() as Long
					break
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(object: any): MsgSignAnnex {
		return {
			creator: isSet(object.creator) ? String(object.creator) : '',
			annexId: isSet(object.annexId) ? Long.fromString(object.annexId) : Long.UZERO,
		}
	},

	toJSON(message: MsgSignAnnex): unknown {
		const obj: any = {}
		message.creator !== undefined && (obj.creator = message.creator)
		message.annexId !== undefined && (obj.annexId = (message.annexId || Long.UZERO).toString())
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<MsgSignAnnex>, I>>(object: I): MsgSignAnnex {
		const message = createBaseMsgSignAnnex()
		message.creator = object.creator ?? ''
		message.annexId = object.annexId !== undefined && object.annexId !== null ? Long.fromValue(object.annexId) : Long.UZERO
		return message
	},
}

function createBaseMsgSignAnnexResponse(): MsgSignAnnexResponse {
	return {}
}

export const MsgSignAnnexResponse = {
	encode(_: MsgSignAnnexResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignAnnexResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseMsgSignAnnexResponse()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(_: any): MsgSignAnnexResponse {
		return {}
	},

	toJSON(_: MsgSignAnnexResponse): unknown {
		const obj: any = {}
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<MsgSignAnnexResponse>, I>>(_: I): MsgSignAnnexResponse {
		const message = createBaseMsgSignAnnexResponse()
		return message
	},
}

function createBaseMsgSignContract(): MsgSignContract {
	return { creator: '', contractId: Long.UZERO }
}

export const MsgSignContract = {
	encode(message: MsgSignContract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.creator !== '') {
			writer.uint32(10).string(message.creator)
		}
		if (!message.contractId.isZero()) {
			writer.uint32(16).uint64(message.contractId)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignContract {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseMsgSignContract()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					message.creator = reader.string()
					break
				case 2:
					message.contractId = reader.uint64() as Long
					break
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(object: any): MsgSignContract {
		return {
			creator: isSet(object.creator) ? String(object.creator) : '',
			contractId: isSet(object.contractId) ? Long.fromString(object.contractId) : Long.UZERO,
		}
	},

	toJSON(message: MsgSignContract): unknown {
		const obj: any = {}
		message.creator !== undefined && (obj.creator = message.creator)
		message.contractId !== undefined && (obj.contractId = (message.contractId || Long.UZERO).toString())
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<MsgSignContract>, I>>(object: I): MsgSignContract {
		const message = createBaseMsgSignContract()
		message.creator = object.creator ?? ''
		message.contractId = object.contractId !== undefined && object.contractId !== null ? Long.fromValue(object.contractId) : Long.UZERO
		return message
	},
}

function createBaseMsgSignContractResponse(): MsgSignContractResponse {
	return {}
}

export const MsgSignContractResponse = {
	encode(_: MsgSignContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignContractResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseMsgSignContractResponse()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(_: any): MsgSignContractResponse {
		return {}
	},

	toJSON(_: MsgSignContractResponse): unknown {
		const obj: any = {}
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<MsgSignContractResponse>, I>>(_: I): MsgSignContractResponse {
		const message = createBaseMsgSignContractResponse()
		return message
	},
}

function createBaseMsgCompleteContract(): MsgCompleteContract {
	return { creator: '', contractId: Long.UZERO }
}

export const MsgCompleteContract = {
	encode(message: MsgCompleteContract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.creator !== '') {
			writer.uint32(10).string(message.creator)
		}
		if (!message.contractId.isZero()) {
			writer.uint32(16).uint64(message.contractId)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgCompleteContract {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseMsgCompleteContract()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					message.creator = reader.string()
					break
				case 2:
					message.contractId = reader.uint64() as Long
					break
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(object: any): MsgCompleteContract {
		return {
			creator: isSet(object.creator) ? String(object.creator) : '',
			contractId: isSet(object.contractId) ? Long.fromString(object.contractId) : Long.UZERO,
		}
	},

	toJSON(message: MsgCompleteContract): unknown {
		const obj: any = {}
		message.creator !== undefined && (obj.creator = message.creator)
		message.contractId !== undefined && (obj.contractId = (message.contractId || Long.UZERO).toString())
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<MsgCompleteContract>, I>>(object: I): MsgCompleteContract {
		const message = createBaseMsgCompleteContract()
		message.creator = object.creator ?? ''
		message.contractId = object.contractId !== undefined && object.contractId !== null ? Long.fromValue(object.contractId) : Long.UZERO
		return message
	},
}

function createBaseMsgCompleteContractResponse(): MsgCompleteContractResponse {
	return {}
}

export const MsgCompleteContractResponse = {
	encode(_: MsgCompleteContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgCompleteContractResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseMsgCompleteContractResponse()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(_: any): MsgCompleteContractResponse {
		return {}
	},

	toJSON(_: MsgCompleteContractResponse): unknown {
		const obj: any = {}
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<MsgCompleteContractResponse>, I>>(_: I): MsgCompleteContractResponse {
		const message = createBaseMsgCompleteContractResponse()
		return message
	},
}

/** Msg defines the Msg service. */
export interface Msg {
	CreateContract(request: MsgCreateContract): Promise<MsgCreateContractResponse>
	CreateAnnex(request: MsgCreateAnnex): Promise<MsgCreateAnnexResponse>
	SignAnnex(request: MsgSignAnnex): Promise<MsgSignAnnexResponse>
	SignContract(request: MsgSignContract): Promise<MsgSignContractResponse>
	/** this line is used by starport scaffolding # proto/tx/rpc */
	CompleteContract(request: MsgCompleteContract): Promise<MsgCompleteContractResponse>
}

export class MsgClientImpl implements Msg {
	private readonly rpc: Rpc
	constructor(rpc: Rpc) {
		this.rpc = rpc
		this.CreateContract = this.CreateContract.bind(this)
		this.CreateAnnex = this.CreateAnnex.bind(this)
		this.SignAnnex = this.SignAnnex.bind(this)
		this.SignContract = this.SignContract.bind(this)
		this.CompleteContract = this.CompleteContract.bind(this)
	}
	CreateContract(request: MsgCreateContract): Promise<MsgCreateContractResponse> {
		const data = MsgCreateContract.encode(request).finish()
		const promise = this.rpc.request('cosmonaut.documentservice.documentservice.Msg', 'CreateContract', data)
		return promise.then(data => MsgCreateContractResponse.decode(new _m0.Reader(data)))
	}

	CreateAnnex(request: MsgCreateAnnex): Promise<MsgCreateAnnexResponse> {
		const data = MsgCreateAnnex.encode(request).finish()
		const promise = this.rpc.request('cosmonaut.documentservice.documentservice.Msg', 'CreateAnnex', data)
		return promise.then(data => MsgCreateAnnexResponse.decode(new _m0.Reader(data)))
	}

	SignAnnex(request: MsgSignAnnex): Promise<MsgSignAnnexResponse> {
		const data = MsgSignAnnex.encode(request).finish()
		const promise = this.rpc.request('cosmonaut.documentservice.documentservice.Msg', 'SignAnnex', data)
		return promise.then(data => MsgSignAnnexResponse.decode(new _m0.Reader(data)))
	}

	SignContract(request: MsgSignContract): Promise<MsgSignContractResponse> {
		const data = MsgSignContract.encode(request).finish()
		const promise = this.rpc.request('cosmonaut.documentservice.documentservice.Msg', 'SignContract', data)
		return promise.then(data => MsgSignContractResponse.decode(new _m0.Reader(data)))
	}

	CompleteContract(request: MsgCompleteContract): Promise<MsgCompleteContractResponse> {
		const data = MsgCompleteContract.encode(request).finish()
		const promise = this.rpc.request('cosmonaut.documentservice.documentservice.Msg', 'CompleteContract', data)
		return promise.then(data => MsgCompleteContractResponse.decode(new _m0.Reader(data)))
	}
}

interface Rpc {
	request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined

export type DeepPartial<T> = T extends Builtin
	? T
	: T extends Long
	? string | number | Long
	: T extends Array<infer U>
	? Array<DeepPartial<U>>
	: T extends ReadonlyArray<infer U>
	? ReadonlyArray<DeepPartial<U>>
	: T extends {}
	? { [K in keyof T]?: DeepPartial<T[K]> }
	: Partial<T>

type KeysOfUnion<T> = T extends T ? keyof T : never
export type Exact<P, I extends P> = P extends Builtin
	? P
	: P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>

if (_m0.util.Long !== Long) {
	_m0.util.Long = Long as any
	_m0.configure()
}

function isSet(value: any): boolean {
	return value !== null && value !== undefined
}
