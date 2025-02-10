export const idlFactory = ({ IDL }) => {
  const call_counts_result = IDL.Record({
    'call_counts' : IDL.Vec(
      IDL.Record({ 'call_count' : IDL.Nat64, 'method_name' : IDL.Text })
    ),
  });
  const ecdsa_curve = IDL.Variant({ 'secp256k1' : IDL.Null });
  const canister_id = IDL.Principal;
  const ecdsa_public_key_args = IDL.Record({
    'key_id' : IDL.Record({ 'name' : IDL.Text, 'curve' : ecdsa_curve }),
    'canister_id' : IDL.Opt(canister_id),
    'derivation_path' : IDL.Vec(IDL.Vec(IDL.Nat8)),
  });
  const ecdsa_public_key_result = IDL.Record({
    'public_key' : IDL.Vec(IDL.Nat8),
    'chain_code' : IDL.Vec(IDL.Nat8),
  });
  const schnorr_algorithm = IDL.Variant({
    'ed25519' : IDL.Null,
    'bip340secp256k1' : IDL.Null,
  });
  const schnorr_public_key_args = IDL.Record({
    'key_id' : IDL.Record({
      'algorithm' : schnorr_algorithm,
      'name' : IDL.Text,
    }),
    'canister_id' : IDL.Opt(canister_id),
    'derivation_path' : IDL.Vec(IDL.Vec(IDL.Nat8)),
  });
  const schnorr_public_key_result = IDL.Record({
    'public_key' : IDL.Vec(IDL.Nat8),
    'chain_code' : IDL.Vec(IDL.Nat8),
  });
  const sign_with_ecdsa_args = IDL.Record({
    'key_id' : IDL.Record({ 'name' : IDL.Text, 'curve' : ecdsa_curve }),
    'derivation_path' : IDL.Vec(IDL.Vec(IDL.Nat8)),
    'message_hash' : IDL.Vec(IDL.Nat8),
  });
  const sign_with_ecdsa_result = IDL.Record({
    'signature' : IDL.Vec(IDL.Nat8),
  });
  const schnorr_aux = IDL.Variant({
    'bip341' : IDL.Record({ 'merkle_root_hash' : IDL.Vec(IDL.Nat8) }),
  });
  const sign_with_schnorr_args = IDL.Record({
    'aux' : IDL.Opt(schnorr_aux),
    'key_id' : IDL.Record({
      'algorithm' : schnorr_algorithm,
      'name' : IDL.Text,
    }),
    'derivation_path' : IDL.Vec(IDL.Vec(IDL.Nat8)),
    'message' : IDL.Vec(IDL.Nat8),
  });
  const sign_with_schnorr_result = IDL.Record({
    'signature' : IDL.Vec(IDL.Nat8),
  });
  const vetkd_curve = IDL.Variant({ 'bls12_381_g2' : IDL.Null });
  const vetkd_derive_encrypted_key_args = IDL.Record({
    'key_id' : IDL.Record({ 'name' : IDL.Text, 'curve' : vetkd_curve }),
    'derivation_path' : IDL.Vec(IDL.Vec(IDL.Nat8)),
    'derivation_id' : IDL.Vec(IDL.Nat8),
    'encryption_public_key' : IDL.Vec(IDL.Nat8),
  });
  const vetkd_derive_encrypted_key_result = IDL.Record({
    'encrypted_key' : IDL.Vec(IDL.Nat8),
  });
  const vetkd_public_key_args = IDL.Record({
    'key_id' : IDL.Record({ 'name' : IDL.Text, 'curve' : vetkd_curve }),
    'canister_id' : IDL.Opt(canister_id),
    'derivation_path' : IDL.Vec(IDL.Vec(IDL.Nat8)),
  });
  const vetkd_public_key_result = IDL.Record({
    'public_key' : IDL.Vec(IDL.Nat8),
  });
  return IDL.Service({
    'call_counts' : IDL.Func([], [call_counts_result], []),
    'ecdsa_public_key' : IDL.Func(
        [ecdsa_public_key_args],
        [ecdsa_public_key_result],
        [],
      ),
    'schnorr_public_key' : IDL.Func(
        [schnorr_public_key_args],
        [schnorr_public_key_result],
        [],
      ),
    'sign_with_ecdsa' : IDL.Func(
        [sign_with_ecdsa_args],
        [sign_with_ecdsa_result],
        [],
      ),
    'sign_with_schnorr' : IDL.Func(
        [sign_with_schnorr_args],
        [sign_with_schnorr_result],
        [],
      ),
    'vetkd_derive_encrypted_key' : IDL.Func(
        [vetkd_derive_encrypted_key_args],
        [vetkd_derive_encrypted_key_result],
        [],
      ),
    'vetkd_public_key' : IDL.Func(
        [vetkd_public_key_args],
        [vetkd_public_key_result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
