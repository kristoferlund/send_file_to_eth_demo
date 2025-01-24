export const idlFactory = ({ IDL }) => {
  const Transfer = IDL.Record({
    'id' : IDL.Nat32,
    'to' : IDL.Text,
    'created' : IDL.Nat64,
    'file' : IDL.Vec(IDL.Nat8),
    'from' : IDL.Text,
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
        [IDL.Text, IDL.Vec(IDL.Nat8)],
        [TransferCreateResponse],
        [],
      ),
    'transfer_get' : IDL.Func([IDL.Nat32], [TransferGetResponse], []),
    'transfer_list' : IDL.Func([], [TransferListResponse], []),
    'vetkd_encrypted_key' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [VetkdEncryptedKeyResponse],
        [],
      ),
    'vetkd_public_key' : IDL.Func([IDL.Text], [VetkdPublicKeyResponse], []),
  });
};
export const init = ({ IDL }) => { return []; };
