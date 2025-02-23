# TACT Compilation Report
Contract: TokenMaster
BOC Size: 2914 bytes

# Types
Total Types: 28

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## WalletData
TLB: `_ balance:int257 owner:address master:address code:^cell = WalletData`
Signature: `WalletData{balance:int257,owner:address,master:address,code:^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## Transfer
TLB: `transfer#0f8a7ea5 query_id:uint64 amount:coins destination:address response_destination:address custom_payload:Maybe ^cell forward_ton_amount:coins forward_payload:remainder<slice> = Transfer`
Signature: `Transfer{query_id:uint64,amount:coins,destination:address,response_destination:address,custom_payload:Maybe ^cell,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## InternalTransfer
TLB: `internal_transfer#178d4519 query_id:uint64 amount:coins from:address response_destination:address forward_ton_amount:coins forward_payload:remainder<slice> = InternalTransfer`
Signature: `InternalTransfer{query_id:uint64,amount:coins,from:address,response_destination:address,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## TransferNotification
TLB: `transfer_notification#7362d09c query_id:uint64 amount:coins sender:address forward_payload:remainder<slice> = TransferNotification`
Signature: `TransferNotification{query_id:uint64,amount:coins,sender:address,forward_payload:remainder<slice>}`

## Excesses
TLB: `excesses#d53276db query_id:uint64 = Excesses`
Signature: `Excesses{query_id:uint64}`

## StopMint
TLB: `stop_mint#765d27bd mintable:bool = StopMint`
Signature: `StopMint{mintable:bool}`

## ChangeOwner
TLB: `change_owner#85a24005 owner:address = ChangeOwner`
Signature: `ChangeOwner{owner:address}`

## ChangeCommission
TLB: `change_commission#8e1f7ba4 commission:uint16 = ChangeCommission`
Signature: `ChangeCommission{commission:uint16}`

## ActiveCommision
TLB: `active_commision#8c9fd87d active:bool = ActiveCommision`
Signature: `ActiveCommision{active:bool}`

## Burn
TLB: `burn#595f07bc query_id:uint64 amount:coins response_destination:address custom_payload:Maybe ^cell = Burn`
Signature: `Burn{query_id:uint64,amount:coins,response_destination:address,custom_payload:Maybe ^cell}`

## BurnNotification
TLB: `burn_notification#7bdd97de query_id:uint64 amount:coins sender:address response_destination:address = BurnNotification`
Signature: `BurnNotification{query_id:uint64,amount:coins,sender:address,response_destination:address}`

## SendTransfer
TLB: `send_transfer#dbf27ac0 query_id:uint64 amount:coins commission:coins mintable:bool destination:address response_destination:address forward_ton_amount:coins forward_payload:remainder<slice> = SendTransfer`
Signature: `SendTransfer{query_id:uint64,amount:coins,commission:coins,mintable:bool,destination:address,response_destination:address,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## ChangeContent
TLB: `change_content#10590ef2 jetton_content:^cell = ChangeContent`
Signature: `ChangeContent{jetton_content:^cell}`

## ProvideWalletAddress
TLB: `provide_wallet_address#2c76b973 query_id:uint64 owner_address:address include_address:bool = ProvideWalletAddress`
Signature: `ProvideWalletAddress{query_id:uint64,owner_address:address,include_address:bool}`

## TakeWalletAddress
TLB: `take_wallet_address#d1735400 query_id:uint64 wallet_address:address owner_address:Maybe address = TakeWalletAddress`
Signature: `TakeWalletAddress{query_id:uint64,wallet_address:address,owner_address:Maybe address}`

## CollectCommission
TLB: `collect_commission#e2192c40 query_id:uint64 = CollectCommission`
Signature: `CollectCommission{query_id:uint64}`

## SendCommision
TLB: `send_commision#2d20e356 amount:coins commission:coins from:address = SendCommision`
Signature: `SendCommision{amount:coins,commission:coins,from:address}`

## SendMint
TLB: `send_mint#fa534b66 amount:coins to:address commission:coins mintable:bool = SendMint`
Signature: `SendMint{amount:coins,to:address,commission:coins,mintable:bool}`

## ChangeJettonsToStop
TLB: `change_jettons_to_stop#6eecc5a2 amount:int257 = ChangeJettonsToStop`
Signature: `ChangeJettonsToStop{amount:int257}`

## CheckTransfer
TLB: `check_transfer#3f9c0200 amount:coins owner:address from:address = CheckTransfer`
Signature: `CheckTransfer{amount:coins,owner:address,from:address}`

## MasterData
TLB: `_ total_supply:int257 mintable:bool owner:address jetton_content:^cell jetton_wallet_code:^cell = MasterData`
Signature: `MasterData{total_supply:int257,mintable:bool,owner:address,jetton_content:^cell,jetton_wallet_code:^cell}`

## TokenData
TLB: `_ total_supply:int257 mintable:bool owner:address commission:int257 active:bool commissionCollectied:int257 jettonsToStop:int257 = TokenData`
Signature: `TokenData{total_supply:int257,mintable:bool,owner:address,commission:int257,active:bool,commissionCollectied:int257,jettonsToStop:int257}`

# Get Methods
Total Get Methods: 3

## get_jetton_data

## get_wallet_address
Argument: owner_address

## tokenData

# Error Codes
2: Stack underflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
2179: No commission
4429: Invalid sender
17062: Invalid amount
35499: Only owner
49345: Mint stopped
51724: Invalid ton amount
54227: Invalid token amount
61739: Wrong sender