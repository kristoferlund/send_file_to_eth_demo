use alloy::primitives::Address;

use crate::{
    utils::{get_caller_address, principal_to_blob},
    USERS,
};

pub struct UserManager {}

impl UserManager {
    pub async fn register() -> Result<Address, String> {
        let principal = principal_to_blob(ic_cdk::caller());
        let address = get_caller_address().await?;
        USERS.with_borrow_mut(|users| {
            users.insert(principal, *address.0);
        });
        Ok(address)
    }
}
