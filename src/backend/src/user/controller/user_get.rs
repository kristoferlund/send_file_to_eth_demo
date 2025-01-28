use crate::{user::user_manager::UserManager, utils::principal_to_blob};
use candid::Principal;
use ic_cdk::query;

#[query]
pub fn user_get() -> Result<Option<String>, String> {
    let caller = ic_cdk::caller();
    if caller == Principal::anonymous() {
        return Err("anonymous caller not allowed".to_string());
    }
    let principal_blob = principal_to_blob(caller);
    Ok(UserManager::get(principal_blob).map(|address| address.to_checksum(None)))
}
