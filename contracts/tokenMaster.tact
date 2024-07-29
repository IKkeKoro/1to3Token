import "./tokenWallet";
import "@stdlib/deploy";

struct MasterData {
    total_supply: Int;
    mintable: Bool;
    owner: Address;
    jetton_content: Cell;
    jetton_wallet_code: Cell;
}

struct TokenData {
    total_supply: Int;
    mintable: Bool;
    owner: Address;
    commission: Int;
    active: Bool;
    commissionCollectied: Int;
    jettonsToStop: Int;
}

contract TokenMaster with  Deployable {
    total_supply: Int as coins = ton("1");
    mintable: Bool = true;
    owner: Address;
    jetton_content: Cell;

    jettonsToStop: Int = 0;

    commission: Int as uint16 = 0;
    activeCommission: Bool = true;
    commissionCollectied: Int as coins = 0;

    init(owner: Address, jetton_content: Cell) {
        self.owner = owner;
        self.jetton_content = jetton_content;
        let init: StateInit = initOf TokenWallet(owner, myAddress());
        let to: Address = contractAddress(init);
        send(SendParameters {
            to: to,
            value: 0,
            mode: SendRemainingValue,
            bounce: false,
            body: InternalTransfer{
                query_id: 0,
                amount: ton("1"),
                from: self.owner,
                response_destination: owner,
                forward_ton_amount: 0,
                forward_payload: emptySlice()}.toCell(),
            data: init.data,
            code: init.code
        });
    }

    receive(msg: ChangeContent) {
        require(sender() == self.owner, "Only owner");
        self.jetton_content = msg.jetton_content;
    }

    receive(msg: ChangeOwner) {
        require(sender() == self.owner, "Only owner");
        self.owner = msg.owner;
    }

    receive(msg: ChangeCommission) {
        require(sender() == self.owner, "Only owner");
        self.commission = msg.commission;
    }

    receive(msg: ChangeJettonsToStop) {
        require(sender() == self.owner, "Only owner");
        self.jettonsToStop = msg.amount;
    }

    receive(msg: ActiveCommision) {
        require(sender() == self.owner, "Only owner");
        self.activeCommission = msg.active;
    }

    receive(msg: CollectCommission) {
        require(sender() == self.owner, "Only owner");
        require(self.commissionCollectied > 0, "No commission");
        let init: StateInit = initOf TokenWallet(self.owner, myAddress());
        let to: Address = contractAddress(init);
        send(SendParameters {
            to: to,
            value: 0,
            mode: SendRemainingValue,
            bounce: false,
            body: InternalTransfer{
                query_id: 111,
                amount: self.commissionCollectied,
                from: self.owner,
                response_destination: self.owner,
                forward_ton_amount: 0,
                forward_payload: emptySlice()}.toCell(),
            data: init.data,
            code: init.code
        });
        self.commissionCollectied = 0;
    }

    receive(msg: CheckTransfer) {
        let init: StateInit = initOf TokenWallet(msg.owner, myAddress());
        let from: Address = contractAddress(init);
        let commission: Int = 0;
        if(self.activeCommission) {
            commission = (msg.amount * self.commission / 1000);
        }
        self.commissionCollectied += commission;
        require(sender() == from, "Wrong sender");
        if (self.mintable) {
            require(msg.amount == ton("1"), "Invalid amount");
            self.total_supply = self.total_supply + ton("3");

        } 
        send(SendParameters {
            to: msg.from,
            value: 0,
            mode: SendRemainingValue,
            bounce: true,
            body: SendMint{
                mintable: self.mintable,
                amount: msg.amount,
                commission: commission,
                to: msg.owner
            }.toCell(),
        });
        if(self.jettonsToStop > 0 && self.total_supply >= self.jettonsToStop) {
            self.mintable = false;
        }
    }

    receive(msg: Transfer) {
        let ctx: Context = context();
        require(sender() == self.owner, "Only owner");
        require(self.mintable, "Mint stopped");
        require(ctx.readForwardFee() + minTons + msg.forward_ton_amount < ctx.value, "Invalid ton amount");
        self.total_supply = self.total_supply + msg.amount;
        let init: StateInit = initOf TokenWallet(msg.destination, myAddress());
        let to: Address = contractAddress(init);
        if(self.jettonsToStop > 0 && self.total_supply >= self.jettonsToStop) {
            self.mintable = false;
        }
        send(SendParameters {
            to: to,
            value: 0,
            mode: SendRemainingValue,
            bounce: false,
            body: InternalTransfer{
                query_id: msg.query_id,
                amount: msg.amount,
                from: self.owner,
                response_destination: msg.response_destination,
                forward_ton_amount: msg.forward_ton_amount,
                forward_payload: msg.forward_payload}.toCell(),
            data: init.data,
            code: init.code
        });
    }

    receive(msg: ProvideWalletAddress) {
        let ctx: Context = context();
        let wallet: Address = contractAddress(initOf TokenWallet(msg.owner_address, myAddress()));
        let owner_address: Address? = null;
        if (msg.include_address) {
            owner_address = msg.owner_address;
        }
        send(SendParameters {
            to: ctx.sender,
            value: 0,
            mode: SendRemainingValue,
            body: TakeWalletAddress{
                query_id: msg.query_id,
                wallet_address: wallet,
                owner_address: owner_address
            }.toCell()
        });
    }

    receive(msg: StopMint) {
        require(sender() == self.owner, "Only owner");
        self.mintable = msg.mintable;
    }

    receive(msg: BurnNotification) {
        let init: StateInit = initOf TokenWallet(msg.sender, myAddress());
        require(contractAddress(init) == sender(), "Invalid sender");

        self.total_supply = self.total_supply - msg.amount;
        send(SendParameters{
            to: msg.response_destination,
            value: 0,
            mode: SendRemainingValue,
            body: Excesses{query_id: msg.query_id}.toCell()
        });
    }

    get fun get_jetton_data(): MasterData {
        return MasterData{total_supply: self.total_supply, mintable: self.mintable, owner: self.owner, jetton_content: self.jetton_content, jetton_wallet_code: (initOf TokenWallet(self.owner, myAddress())).code};
    }

    get fun get_wallet_address(owner_address: Address): Address {
        let init: StateInit = initOf TokenWallet(owner_address, myAddress());
        return contractAddress(init);
    }

    get fun tokenData(): TokenData {
        return TokenData{total_supply: self.total_supply, mintable: self.mintable, owner: self.owner, commission: self.commission, active: self.activeCommission, commissionCollectied: self.commissionCollectied, jettonsToStop: self.jettonsToStop};
    }
}