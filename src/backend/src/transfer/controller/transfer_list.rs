use crate::{
    transfer::{transfer_manager::TransferManager, transfer_types::Transfer},
    user::user_manager::UserManager,
    utils::principal_to_blob,
};
use ic_cdk::query;

#[query]
pub async fn transfer_list() -> Result<Vec<Transfer>, String> {
    let principal_blob = principal_to_blob(ic_cdk::caller());
    let to = UserManager::get(principal_blob).ok_or("User not found".to_string())?;
    let transfers = TransferManager::list_by_to(to);
    let transfers = transfers.into_iter().map(|t| t.without_file()).collect();
    Ok(transfers)
}
