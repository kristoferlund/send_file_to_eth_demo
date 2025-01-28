export const idlFactory = ({ IDL }) => {
  const TransferCreateRequest = IDL.Record({
    'to' : IDL.Text,
    'data' : IDL.Vec(IDL.Nat8),
    'content_type' : IDL.Text,
    'filename' : IDL.Text,
  });
  const Transfer = IDL.Record({
    'id' : IDL.Nat32,
    'to' : IDL.Text,
    'created' : IDL.Nat64,
    'data' : IDL.Vec(IDL.Nat8),
    'from' : IDL.Text,
    'size' : IDL.Nat32,
    'content_type' : IDL.Text,
    'filename' : IDL.Text,
  });
  const TransferCreateResponse = IDL.Variant({
    'Ok' : Transfer,
    'Err' : IDL.Text,
  });
  const TransferGetResponse = IDL.Variant({
    'Ok' : Transfer,
    'Err' : IDL.Text,
  });
  const TransferListResponse = IDL.Variant({
    'Ok' : IDL.Vec(Transfer),
    'Err' : IDL.Text,
  });
  const UserGetResponse = IDL.Variant({
    'Ok' : IDL.Opt(IDL.Text),
    'Err' : IDL.Text,
  });
  const UserRegisterResponse = IDL.Variant({
    'Ok' : IDL.Text,
    'Err' : IDL.Text,
  });
  const VetkdEncryptedKeyResponse = IDL.Variant({
    'Ok' : IDL.Vec(IDL.Nat8),
    'Err' : IDL.Text,
  });
  const VetkdPublicKeyResponse = IDL.Variant({
    'Ok' : IDL.Vec(IDL.Nat8),
    'Err' : IDL.Text,
  });
  return IDL.Service({
    'transfer_create' : IDL.Func(
        [TransferCreateRequest],
        [TransferCreateResponse],
        [],
      ),
    'transfer_get' : IDL.Func([IDL.Nat32], [TransferGetResponse], ['query']),
    'transfer_list' : IDL.Func([], [TransferListResponse], ['query']),
    'user_get' : IDL.Func([], [UserGetResponse], ['query']),
    'user_register' : IDL.Func([], [UserRegisterResponse], []),
    'vetkd_encrypted_key' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [VetkdEncryptedKeyResponse],
        [],
      ),
    'vetkd_public_key' : IDL.Func([IDL.Text], [VetkdPublicKeyResponse], []),
  });
};
export const init = ({ IDL }) => { return []; };
