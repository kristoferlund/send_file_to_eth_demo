use crate::{
    transfer::{
        transfer_manager::{TransferManager, TransferManagerCreateArgs},
        transfer_types::Transfer,
    },
    utils::get_caller_address,
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
    let from = get_caller_address().await?;
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
