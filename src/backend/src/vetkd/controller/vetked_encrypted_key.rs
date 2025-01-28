use crate::{
    declarations::chainkey_testing_canister::{
        chainkey_testing_canister, VetkdCurve, VetkdEncryptedKeyArgs, VetkdEncryptedKeyArgsKeyId,
    },
    utils::get_caller_address,
};
use ic_cdk::update;
use serde_bytes::ByteBuf;

const TRANSFER_DERIVATION_ID: &[u8] = b"transfer";

#[update]
async fn vetkd_encrypted_key(encryption_public_key: Vec<u8>) -> Result<Vec<u8>, String> {
    let address = get_caller_address().await?;

    let args = VetkdEncryptedKeyArgs {
        key_id: VetkdEncryptedKeyArgsKeyId {
            name: "insecure_test_key_1".to_string(),
            curve: VetkdCurve::Bls12381,
        },
        public_key_derivation_path: vec![ByteBuf::from(*address.0)],
        derivation_id: ByteBuf::from(TRANSFER_DERIVATION_ID),
        encryption_public_key: ByteBuf::from(encryption_public_key),
    };

    let (result,) = chainkey_testing_canister
        .vetkd_encrypted_key(args)
        .await
        .unwrap();

    Ok(result.encrypted_key.to_vec())
}
