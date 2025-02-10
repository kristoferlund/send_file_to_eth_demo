import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Transfer {
  'id' : number,
  'to' : string,
  'created' : bigint,
  'data' : Uint8Array | number[],
  'from' : string,
  'size' : number,
  'content_type' : string,
  'filename' : string,
}
export interface TransferCreateRequest {
  'to' : string,
  'data' : Uint8Array | number[],
  'content_type' : string,
  'filename' : string,
}
export type TransferCreateResponse = { 'Ok' : Transfer } |
  { 'Err' : string };
export type TransferGetResponse = { 'Ok' : Transfer } |
  { 'Err' : string };
export type TransferListResponse = { 'Ok' : Array<Transfer> } |
  { 'Err' : string };
export type UserGetResponse = { 'Ok' : [] | [string] } |
  { 'Err' : string };
export type UserRegisterResponse = { 'Ok' : string } |
  { 'Err' : string };
export type VetkdEncryptedKeyResponse = { 'Ok' : Uint8Array | number[] } |
  { 'Err' : string };
export type VetkdPublicKeyResponse = { 'Ok' : Uint8Array | number[] } |
  { 'Err' : string };
export interface _SERVICE {
  'transfer_create' : ActorMethod<
    [TransferCreateRequest],
    TransferCreateResponse
  >,
  'transfer_get' : ActorMethod<[number], TransferGetResponse>,
  'transfer_list' : ActorMethod<[], TransferListResponse>,
  'user_get' : ActorMethod<[], UserGetResponse>,
  'user_register' : ActorMethod<[], UserRegisterResponse>,
  'vetkd_encrypted_key' : ActorMethod<
    [Uint8Array | number[]],
    VetkdEncryptedKeyResponse
  >,
  'vetkd_public_key' : ActorMethod<[], VetkdPublicKeyResponse>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
