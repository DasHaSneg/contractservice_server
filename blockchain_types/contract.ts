/* eslint-disable */
import * as Long from 'long'
import * as _m0 from 'protobufjs/minimal'

export const protobufPackage = 'cosmonaut.documentservice.documentservice'

export interface Contract {
	creator: string
	id: number
	contractHash: string
	state: string
	seller: string
	buyer: string
	createDate: string
}

function createBaseContract(): Contract {
	return { creator: '', id: 0, contractHash: '', state: '', seller: '', buyer: '', createDate: '' }
}

export const Contract = {
	encode(message: Contract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.creator !== '') {
			writer.uint32(10).string(message.creator)
		}
		if (message.id !== 0) {
			writer.uint32(16).uint64(message.id)
		}
		if (message.contractHash !== '') {
			writer.uint32(26).string(message.contractHash)
		}
		if (message.state !== '') {
			writer.uint32(34).string(message.state)
		}
		if (message.seller !== '') {
			writer.uint32(42).string(message.seller)
		}
		if (message.buyer !== '') {
			writer.uint32(50).string(message.buyer)
		}
		if (message.createDate !== '') {
			writer.uint32(58).string(message.createDate)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): Contract {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseContract()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					message.creator = reader.string()
					break
				case 2:
					message.id = longToNumber(reader.uint64() as Long)
					break
				case 3:
					message.contractHash = reader.string()
					break
				case 4:
					message.state = reader.string()
					break
				case 5:
					message.seller = reader.string()
					break
				case 6:
					message.buyer = reader.string()
					break
				case 7:
					message.createDate = reader.string()
					break
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(object: any): Contract {
		return {
			creator: isSet(object.creator) ? String(object.creator) : '',
			id: isSet(object.id) ? Number(object.id) : 0,
			contractHash: isSet(object.contractHash) ? String(object.contractHash) : '',
			state: isSet(object.state) ? String(object.state) : '',
			seller: isSet(object.seller) ? String(object.seller) : '',
			buyer: isSet(object.buyer) ? String(object.buyer) : '',
			createDate: isSet(object.createDate) ? String(object.createDate) : '',
		}
	},

	toJSON(message: Contract): unknown {
		const obj: any = {}
		message.creator !== undefined && (obj.creator = message.creator)
		message.id !== undefined && (obj.id = Math.round(message.id))
		message.contractHash !== undefined && (obj.contractHash = message.contractHash)
		message.state !== undefined && (obj.state = message.state)
		message.seller !== undefined && (obj.seller = message.seller)
		message.buyer !== undefined && (obj.buyer = message.buyer)
		message.createDate !== undefined && (obj.createDate = message.createDate)
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<Contract>, I>>(object: I): Contract {
		const message = createBaseContract()
		message.creator = object.creator ?? ''
		message.id = object.id ?? 0
		message.contractHash = object.contractHash ?? ''
		message.state = object.state ?? ''
		message.seller = object.seller ?? ''
		message.buyer = object.buyer ?? ''
		message.createDate = object.createDate ?? ''
		return message
	},
}

declare var self: any | undefined
declare var window: any | undefined
declare var global: any | undefined
var globalThis: any = (() => {
	if (typeof globalThis !== 'undefined') return globalThis
	if (typeof self !== 'undefined') return self
	if (typeof window !== 'undefined') return window
	if (typeof global !== 'undefined') return global
	throw 'Unable to locate global object'
})()

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined

export type DeepPartial<T> = T extends Builtin
	? T
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

function longToNumber(long: Long): number {
	if (long.gt(Number.MAX_SAFE_INTEGER)) {
		throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
	}
	return long.toNumber()
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
	_m0.util.Long = Long as any
	_m0.configure()
}

function isSet(value: any): boolean {
	return value !== null && value !== undefined
}
