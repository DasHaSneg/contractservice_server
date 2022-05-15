/* eslint-disable */
import Long from 'long'
import * as _m0 from 'protobufjs/minimal'

export const protobufPackage = 'cosmonaut.documentservice.documentservice'

export interface Annex {
	creator: string
	id: Long
	annexHash: string
	contractId: Long
	state: string
	seller: string
	buyer: string
	createDate: string
}

function createBaseAnnex(): Annex {
	return { creator: '', id: Long.UZERO, annexHash: '', contractId: Long.UZERO, state: '', seller: '', buyer: '', createDate: '' }
}

export const Annex = {
	encode(message: Annex, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.creator !== '') {
			writer.uint32(10).string(message.creator)
		}
		if (!message.id.isZero()) {
			writer.uint32(16).uint64(message.id)
		}
		if (message.annexHash !== '') {
			writer.uint32(26).string(message.annexHash)
		}
		if (!message.contractId.isZero()) {
			writer.uint32(32).uint64(message.contractId)
		}
		if (message.state !== '') {
			writer.uint32(42).string(message.state)
		}
		if (message.seller !== '') {
			writer.uint32(50).string(message.seller)
		}
		if (message.buyer !== '') {
			writer.uint32(58).string(message.buyer)
		}
		if (message.createDate !== '') {
			writer.uint32(66).string(message.createDate)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): Annex {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseAnnex()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					message.creator = reader.string()
					break
				case 2:
					message.id = reader.uint64() as Long
					break
				case 3:
					message.annexHash = reader.string()
					break
				case 4:
					message.contractId = reader.uint64() as Long
					break
				case 5:
					message.state = reader.string()
					break
				case 6:
					message.seller = reader.string()
					break
				case 7:
					message.buyer = reader.string()
					break
				case 8:
					message.createDate = reader.string()
					break
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(object: any): Annex {
		return {
			creator: isSet(object.creator) ? String(object.creator) : '',
			id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
			annexHash: isSet(object.annexHash) ? String(object.annexHash) : '',
			contractId: isSet(object.contractId) ? Long.fromValue(object.contractId) : Long.UZERO,
			state: isSet(object.state) ? String(object.state) : '',
			seller: isSet(object.seller) ? String(object.seller) : '',
			buyer: isSet(object.buyer) ? String(object.buyer) : '',
			createDate: isSet(object.createDate) ? String(object.createDate) : '',
		}
	},

	toJSON(message: Annex): unknown {
		const obj: any = {}
		message.creator !== undefined && (obj.creator = message.creator)
		message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString())
		message.annexHash !== undefined && (obj.annexHash = message.annexHash)
		message.contractId !== undefined && (obj.contractId = (message.contractId || Long.UZERO).toString())
		message.state !== undefined && (obj.state = message.state)
		message.seller !== undefined && (obj.seller = message.seller)
		message.buyer !== undefined && (obj.buyer = message.buyer)
		message.createDate !== undefined && (obj.createDate = message.createDate)
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<Annex>, I>>(object: I): Annex {
		const message = createBaseAnnex()
		message.creator = object.creator ?? ''
		message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO
		message.annexHash = object.annexHash ?? ''
		message.contractId = object.contractId !== undefined && object.contractId !== null ? Long.fromValue(object.contractId) : Long.UZERO
		message.state = object.state ?? ''
		message.seller = object.seller ?? ''
		message.buyer = object.buyer ?? ''
		message.createDate = object.createDate ?? ''
		return message
	},
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
