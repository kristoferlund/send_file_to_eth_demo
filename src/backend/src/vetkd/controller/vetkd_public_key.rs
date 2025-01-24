use crate::declarations::chainkey_testing_canister::{
    chainkey_testing_canister, VetkdCurve, VetkdPublicKeyArgs, VetkdPublicKeyArgsKeyId,
};
use alloy::primitives::Address;
use ic_cdk::update;
use serde_bytes::ByteBuf;

#[update]
async fn vetkd_public_key(address: String) -> Result<Vec<u8>, String> {
    let address = Address::parse_checksummed(address, None).map_err(|e| e.to_string())?;

    let args = VetkdPublicKeyArgs {
        key_id: VetkdPublicKeyArgsKeyId {
            name: "insecure_test_key_1".to_string(),
            curve: VetkdCurve::Bls12381,
        },
        derivation_path: vec![ByteBuf::from(*address.0)],
        canister_id: None,
    };

    let (result,) = chainkey_testing_canister
        .vetkd_public_key(args)
        .await
        .unwrap();

    Ok(result.public_key.to_vec())
}
