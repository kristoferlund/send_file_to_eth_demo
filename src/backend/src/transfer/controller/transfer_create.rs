use crate::{
    transfer::{
        transfer_manager::{TransferManager, TransferManagerCreateArgs},
        transfer_types::Transfer,
    },
    user::user_manager::UserManager,
    utils::principal_to_blob,
};
use alloy::primitives::Address;
use candid::CandidType;
use ic_cdk::update;
use serde::Deserialize;

#[derive(CandidType, Deserialize, Debug, Clone)]
pub struct TransferCreateRequest {
    pub to: String,
    pub filename: String,
    pub content_type: String,
    pub data: Vec<u8>,
}

#[update]
pub async fn transfer_create(args: TransferCreateRequest) -> Result<Transfer, String> {
    let principal_blob = principal_to_blob(ic_cdk::caller());
    let from = UserManager::get(principal_blob).ok_or("User not found".to_string())?;
    let to = Address::parse_checksummed(args.to, None).map_err(|e| e.to_string())?;
    let transfer = TransferManager::create(TransferManagerCreateArgs {
        from,
        to,
        filename: args.filename,
        content_type: args.content_type,
        data: args.data,
    })?;
    Ok(transfer)
}
