use crate::{
    transfer::{transfer_manager::TransferManager, transfer_types::Transfer},
    utils::get_caller_address,
};
use alloy::primitives::Address;
use ic_cdk::update;

#[update]
pub async fn transfer_create(to: String, file: Vec<u8>) -> Result<Transfer, String> {
    let from = get_caller_address().await?;
    let to = Address::parse_checksummed(to, None).map_err(|e| e.to_string())?;
    let transfer = TransferManager::create(from, to, file)?;
    Ok(transfer)
}
