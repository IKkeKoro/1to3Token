
message(0x0f8a7ea5) Transfer {
    query_id: Int as uint64;
    amount: Int as coins;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell?;
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining;
}

message(0x178d4519) InternalTransfer {
    query_id: Int as uint64;
    amount: Int as coins;
    from: Address;
    response_destination: Address;
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining;
}

message(0x7362d09c) TransferNotification {
    query_id: Int as uint64;
    amount: Int as coins;
    sender: Address;
    forward_payload: Slice as remaining;
}

message(0xd53276db) Excesses {
    query_id: Int as uint64;
}

message StopMint {
    mintable: Bool;
}

message ChangeOwner {
    owner: Address;
}

message ChangeCommission {
    commission: Int as uint16;
}   

message ActiveCommision {
    active: Bool;
}


message(0x595f07bc) Burn {
    query_id: Int as uint64;
    amount: Int as coins;
    response_destination: Address;
    custom_payload: Cell?;
}

message(0x7bdd97de) BurnNotification {
    query_id: Int as uint64;
    amount: Int as coins;
    sender: Address;
    response_destination: Address;
}

message SendTransfer {
    query_id: Int as uint64;
    amount: Int as coins;
    commission: Int as coins;
    mintable: Bool;
    destination: Address;
    response_destination: Address;
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining;
}

// master

message ChangeContent {
    jetton_content: Cell;
}

message(0x2c76b973) ProvideWalletAddress {
    query_id: Int as uint64;
    owner_address: Address;
    include_address: Bool;
}
message(0xd1735400) TakeWalletAddress {
    query_id: Int as uint64;
    wallet_address: Address;
    owner_address: Address?;
}

message CollectCommission {
    query_id: Int as uint64;
}

message SendCommision {
    amount: Int as coins;
    commission: Int as coins;
    from: Address;
}

message SendMint {

    amount: Int as coins;
    to: Address;
    commission: Int as coins;
    mintable: Bool;
}

message ChangeJettonsToStop {
    amount: Int;
}   

message CheckTransfer {
    amount: Int as coins;
    owner: Address;
    from: Address;

}