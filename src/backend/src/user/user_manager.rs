use crate::{utils::get_caller_address, USERS};
use alloy::primitives::Address;
use ic_stable_structures::storable::Blob;

pub struct UserManager {}

impl UserManager {
    pub async fn register(principal_blob: Blob<29>) -> Result<Address, String> {
        let address = get_caller_address().await?;
        USERS.with_borrow_mut(|users| {
            users.insert(principal_blob, *address.0);
        });
        Ok(address)
    }

    pub fn get(principal_blob: Blob<29>) -> Option<Address> {
        let address = USERS.with_borrow(|users| users.get(&principal_blob));
        address.map(Address::from)
    }
}
