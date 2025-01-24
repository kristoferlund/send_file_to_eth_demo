use candid::Principal;
use ic_cdk::update;

use crate::user::user_manager::UserManager;

#[update]
pub async fn user_register() -> Result<String, String> {
    let caller = ic_cdk::caller();
    if caller == Principal::anonymous() {
        return Err("anonymous caller not allowed".to_string());
    }
    let address = UserManager::register().await?;
    Ok(address.to_checksum(None))
}
