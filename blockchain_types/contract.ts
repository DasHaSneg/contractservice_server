/* eslint-disable */
import Long from 'long'
import * as _m0 from 'protobufjs/minimal'

export const protobufPackage = 'cosmonaut.documentservice.documentservice'

export interface Contract {
	creator: string
	id: Long
	contractHash: string
	state: string
	seller: string
	buyer: string
	sellerInn: string
	buyerInn: string
	createDate: string
}

function createBaseContract(): Contract {
	return { creator: '', id: Long.UZERO, contractHash: '', state: '', seller: '', buyer: '', sellerInn: '', buyerInn: '', createDate: '' }
}

export const Contract = {
	encode(message: Contract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.creator !== '') {
			writer.uint32(10).string(message.creator)
		}
		if (!message.id.isZero()) {
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
		if (message.sellerInn !== '') {
			writer.uint32(58).string(message.sellerInn)
		}
		if (message.buyerInn !== '') {
			writer.uint32(66).string(message.buyerInn)
		}
		if (message.createDate !== '') {
			writer.uint32(74).string(message.createDate)
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
					message.id = reader.uint64() as Long
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
					message.sellerInn = reader.string()
					break
				case 8:
					message.buyerInn = reader.string()
					break
				case 9:
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
			id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
			contractHash: isSet(object.contractHash) ? String(object.contractHash) : '',
			state: isSet(object.state) ? String(object.state) : '',
			seller: isSet(object.seller) ? String(object.seller) : '',
			buyer: isSet(object.buyer) ? String(object.buyer) : '',
			sellerInn: isSet(object.sellerInn) ? String(object.sellerInn) : '',
			buyerInn: isSet(object.buyerInn) ? String(object.buyerInn) : '',
			createDate: isSet(object.createDate) ? String(object.createDate) : '',
		}
	},

	toJSON(message: Contract): unknown {
		const obj: any = {}
		message.creator !== undefined && (obj.creator = message.creator)
		message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString())
		message.contractHash !== undefined && (obj.contractHash = message.contractHash)
		message.state !== undefined && (obj.state = message.state)
		message.seller !== undefined && (obj.seller = message.seller)
		message.buyer !== undefined && (obj.buyer = message.buyer)
		message.sellerInn !== undefined && (obj.sellerInn = message.sellerInn)
		message.buyerInn !== undefined && (obj.buyerInn = message.buyerInn)
		message.createDate !== undefined && (obj.createDate = message.createDate)
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<Contract>, I>>(object: I): Contract {
		const message = createBaseContract()
		message.creator = object.creator ?? ''
		message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO
		message.contractHash = object.contractHash ?? ''
		message.state = object.state ?? ''
		message.seller = object.seller ?? ''
		message.buyer = object.buyer ?? ''
		message.sellerInn = object.sellerInn ?? ''
		message.buyerInn = object.buyerInn ?? ''
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
