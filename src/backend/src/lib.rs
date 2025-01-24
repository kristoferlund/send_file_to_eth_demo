mod declarations;
mod transfer;
mod user;
mod utils;
mod vetkd;

use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::storable::Blob;
use ic_stable_structures::{Cell, DefaultMemoryImpl, StableBTreeMap};
use std::cell::RefCell;
use transfer::transfer_types::{EthAddressBytes, Transfer, TransferId};

type Memory = VirtualMemory<DefaultMemoryImpl>;

const USERS_MEMORY_ID: MemoryId = MemoryId::new(0);
const NEXT_TRANSFER_ID_MEMORY_ID: MemoryId = MemoryId::new(1);
const TRANSFERS_MEMORY_ID: MemoryId = MemoryId::new(2);
const TO_TRANSFERS_INDEX_MEMORY_ID: MemoryId = MemoryId::new(3);

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    static USERS: RefCell<StableBTreeMap<Blob<29>, EthAddressBytes, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(USERS_MEMORY_ID)),
        )
    );

    static NEXT_TRANSFER_ID: RefCell<Cell<TransferId, Memory>> = RefCell::new(Cell::init(MEMORY_MANAGER.with(|m| m.borrow().get(NEXT_TRANSFER_ID_MEMORY_ID)), 0).unwrap());

    static TRANSFERS: RefCell<StableBTreeMap<TransferId, Transfer, Memory>> =
        RefCell::new(
            StableBTreeMap::init(
                MEMORY_MANAGER.with(|m| m.borrow().get(TRANSFERS_MEMORY_ID)),
            )
        );

    static TO_TRANSFERS_INDEX: RefCell<StableBTreeMap<(EthAddressBytes, TransferId), TransferId, Memory>> =
        RefCell::new(
            StableBTreeMap::init(
                MEMORY_MANAGER.with(|m| m.borrow().get(TO_TRANSFERS_INDEX_MEMORY_ID)),
            )
        );
}
