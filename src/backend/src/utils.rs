use alloy::primitives::Address;
use candid::Principal;
use ic_stable_structures::storable::Blob;
use serde_bytes::ByteBuf;

use crate::declarations::ic_siwe_provider::{ic_siwe_provider, GetAddressResponse};

pub async fn get_caller_address() -> Result<Address, String> {
    let response = ic_siwe_provider
        .get_address(ByteBuf::from(ic_cdk::caller().as_slice()))
        .await;

    let address = match response {
        Ok((inner_result,)) => match inner_result {
            GetAddressResponse::Ok(address) => address,
            GetAddressResponse::Err(e) => return Err(e),
        },
        Err(_) => return Err("Failed to get the caller address".to_string()),
    };

    let address = Address::parse_checksummed(address, None).map_err(|e| e.to_string())?;

    Ok(address)
}

pub fn principal_to_blob(principal: Principal) -> Blob<29> {
    principal.as_slice()[..29].try_into().unwrap()
}
