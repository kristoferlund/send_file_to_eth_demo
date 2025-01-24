use crate::{
    transfer::{
        transfer_manager::TransferManager,
        transfer_types::{Transfer, TransferId},
    },
    utils::get_caller_address_string,
};
use ic_cdk::update;

#[update]
pub async fn transfer_get(transfer_id: TransferId) -> Result<Transfer, String> {
    let address = get_caller_address_string().await?;
    let transfer = TransferManager::get(transfer_id).ok_or("Transfer not found".to_string())?;
    if transfer.to != address {
        return Err("Unauthorized".to_string());
    }
    Ok(transfer)
}
