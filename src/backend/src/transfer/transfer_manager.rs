use super::transfer_types::{Transfer, TransferId};
use crate::{NEXT_TRANSFER_ID, TO_TRANSFERS_INDEX, TRANSFERS};
use alloy::primitives::Address;

pub struct TransferManager {}

pub struct TransferManagerCreateArgs {
    pub from: Address,
    pub to: Address,
    pub filename: String,
    pub content_type: String,
    pub data: Vec<u8>,
}

impl TransferManager {
    pub fn create(args: TransferManagerCreateArgs) -> Result<Transfer, String> {
        let next_id = NEXT_TRANSFER_ID.with_borrow_mut(|id| {
            let next_id = id.get() + 1;
            id.set(next_id).unwrap();
            next_id
        });

        let transfer = TRANSFERS.with_borrow_mut(|transfers| {
            let transfer = Transfer {
                id: next_id,
                created: ic_cdk::api::time(),
                from: args.from.to_checksum(None),
                to: args.to.to_checksum(None),
                filename: args.filename,
                size: args.data.len() as u32,
                content_type: args.content_type,
                data: args.data,
            };
            transfers.insert(next_id, transfer.clone());
            transfer
        });

        TO_TRANSFERS_INDEX.with_borrow_mut(|index| index.insert((*args.to.0, next_id), next_id));

        Ok(transfer)
    }

    pub fn get(id: TransferId) -> Option<Transfer> {
        TRANSFERS.with_borrow(|transfers| transfers.get(&id))
    }

    pub fn list_by_to(to: Address) -> Vec<Transfer> {
        TO_TRANSFERS_INDEX.with_borrow(|index| {
            index
                .range((*to.0, TransferId::MIN)..)
                .take_while(|((t, _), _)| *t == to)
                .filter_map(|((_, _), i)| Self::get(i))
                .collect()
        })
    }
}
