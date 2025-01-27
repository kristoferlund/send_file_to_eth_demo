use candid::{CandidType, Decode, Encode};
use ic_stable_structures::{storable::Bound, Storable};
use serde::Deserialize;
use std::borrow::Cow;

pub type Timestamp = u64;
pub type TransferId = u32;
pub type EthAddressBytes = [u8; 20];

#[derive(CandidType, Deserialize, Debug, Clone)]
pub struct Transfer {
    pub id: TransferId,
    pub created: Timestamp,
    pub from: String,
    pub to: String,
    pub filename: String,
    pub size: u32,
    pub content_type: String,
    pub data: Vec<u8>,
}

impl Transfer {
    pub fn without_file(&self) -> Self {
        Self {
            id: self.id,
            created: self.created,
            from: self.from.clone(),
            to: self.to.clone(),
            filename: self.filename.clone(),
            size: self.size,
            content_type: self.content_type.clone(),
            data: vec![],
        }
    }
}

impl Storable for Transfer {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Unbounded;
}
