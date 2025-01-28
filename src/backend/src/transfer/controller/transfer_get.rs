use crate::{
    transfer::{
        transfer_manager::TransferManager,
        transfer_types::{Transfer, TransferId},
    },
    user::user_manager::UserManager,
    utils::principal_to_blob,
};
use ic_cdk::query;

#[query]
pub async fn transfer_get(transfer_id: TransferId) -> Result<Transfer, String> {
    let principal_blob = principal_to_blob(ic_cdk::caller());
    let address = UserManager::get(principal_blob).ok_or("User not found".to_string())?;
    let transfer = TransferManager::get(transfer_id).ok_or("Transfer not found".to_string())?;
    if transfer.to != address.to_checksum(None) {
        return Err("Unauthorized".to_string());
    }
    Ok(transfer)
}
