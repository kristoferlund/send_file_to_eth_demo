use ic_cdk::update;

use crate::{
    transfer::{transfer_manager::TransferManager, transfer_types::Transfer},
    utils::get_caller_address,
};

#[update]
pub async fn transfer_list() -> Result<Vec<Transfer>, String> {
    let to = get_caller_address().await?;
    let transfers = TransferManager::list_by_to(to);
    let transfers = transfers.into_iter().map(|t| t.without_file()).collect();
    Ok(transfers)
}
