import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface call_counts_result {
  'call_counts' : Array<{ 'call_count' : bigint, 'method_name' : string }>,
}
export type canister_id = Principal;
export type ecdsa_curve = { 'secp256k1' : null };
export interface ecdsa_public_key_args {
  'key_id' : { 'name' : string, 'curve' : ecdsa_curve },
  'canister_id' : [] | [canister_id],
  'derivation_path' : Array<Uint8Array | number[]>,
}
export interface ecdsa_public_key_result {
  'public_key' : Uint8Array | number[],
  'chain_code' : Uint8Array | number[],
}
export type schnorr_algorithm = { 'ed25519' : null } |
  { 'bip340secp256k1' : null };
export type schnorr_aux = {
    'bip341' : { 'merkle_root_hash' : Uint8Array | number[] }
  };
export interface schnorr_public_key_args {
  'key_id' : { 'algorithm' : schnorr_algorithm, 'name' : string },
  'canister_id' : [] | [canister_id],
  'derivation_path' : Array<Uint8Array | number[]>,
}
export interface schnorr_public_key_result {
  'public_key' : Uint8Array | number[],
  'chain_code' : Uint8Array | number[],
}
export interface sign_with_ecdsa_args {
  'key_id' : { 'name' : string, 'curve' : ecdsa_curve },
  'derivation_path' : Array<Uint8Array | number[]>,
  'message_hash' : Uint8Array | number[],
}
export interface sign_with_ecdsa_result { 'signature' : Uint8Array | number[] }
export interface sign_with_schnorr_args {
  'aux' : [] | [schnorr_aux],
  'key_id' : { 'algorithm' : schnorr_algorithm, 'name' : string },
  'derivation_path' : Array<Uint8Array | number[]>,
  'message' : Uint8Array | number[],
}
export interface sign_with_schnorr_result {
  'signature' : Uint8Array | number[],
}
export type vetkd_curve = { 'bls12_381_g2' : null };
export interface vetkd_derive_encrypted_key_args {
  'key_id' : { 'name' : string, 'curve' : vetkd_curve },
  'derivation_path' : Array<Uint8Array | number[]>,
  'derivation_id' : Uint8Array | number[],
  'encryption_public_key' : Uint8Array | number[],
}
export interface vetkd_derive_encrypted_key_result {
  'encrypted_key' : Uint8Array | number[],
}
export interface vetkd_public_key_args {
  'key_id' : { 'name' : string, 'curve' : vetkd_curve },
  'canister_id' : [] | [canister_id],
  'derivation_path' : Array<Uint8Array | number[]>,
}
export interface vetkd_public_key_result {
  'public_key' : Uint8Array | number[],
}
export interface _SERVICE {
  'call_counts' : ActorMethod<[], call_counts_result>,
  'ecdsa_public_key' : ActorMethod<
    [ecdsa_public_key_args],
    ecdsa_public_key_result
  >,
  'schnorr_public_key' : ActorMethod<
    [schnorr_public_key_args],
    schnorr_public_key_result
  >,
  'sign_with_ecdsa' : ActorMethod<
    [sign_with_ecdsa_args],
    sign_with_ecdsa_result
  >,
  'sign_with_schnorr' : ActorMethod<
    [sign_with_schnorr_args],
    sign_with_schnorr_result
  >,
  'vetkd_derive_encrypted_key' : ActorMethod<
    [vetkd_derive_encrypted_key_args],
    vetkd_derive_encrypted_key_result
  >,
  'vetkd_public_key' : ActorMethod<
    [vetkd_public_key_args],
    vetkd_public_key_result
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
