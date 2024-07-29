import "./imports/tokenMessages";

const gasConsumption: Int = ton("0.02");
const minTons: Int = ton("0.01");

struct WalletData {
    balance: Int;
    owner: Address;
    master: Address;
    code: Cell;
}

contract TokenWallet {
    balance: Int as coins = 0;
    owner: Address;
    master: Address;

    init(owner: Address, master: Address) {
        self.owner = owner;
        self.master = master;
    }

    receive(msg: Transfer) {
        let ctx: Context = context();
        require(self.owner == ctx.sender, "Invalid sender");
        require(self.balance >= 0, "Invalid token amount");
        require(ctx.readForwardFee() + minTons + msg.forward_ton_amount < ctx.value, "Invalid ton amount");
        let init: StateInit = initOf TokenWallet(msg.destination, self.master);
        let to: Address = contractAddress(init);
        // self.balance = self.balance - msg.amount;
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


    receive(msg: SendCommision) {
        let init: StateInit = initOf TokenWallet(msg.from, self.master);
        let from: Address = contractAddress(init);
        require(sender() == from, "Invalid sender");
        self.balance = self.balance - msg.commission + msg.amount;
    }

    receive(msg: SendMint) {
        require(sender() == self.master, "Invalid sender");
        if(msg.mintable) {
            self.balance = self.balance + ton("3");
        }
        self.balance = self.balance - msg.amount;
        let init: StateInit = initOf TokenWallet(msg.to, self.master);
        let to: Address = contractAddress(init);
        send(SendParameters {
            to: to,
            value: 0,
            mode: SendRemainingValue,
            bounce: true,
            body: SendCommision{
                amount: msg.amount,
                commission: msg.commission,
                from: self.owner
            }.toCell(),
        });
        
    }

    receive(msg: InternalTransfer) {
        let ctx: Context = context();
        if(ctx.sender != self.master) {
            let init: StateInit = initOf TokenWallet(msg.from, self.master);
            require(contractAddress(init) == ctx.sender, "Invalid sender");
        }
        // self.balance = self.balance + msg.amount;
        require(self.balance >= 0, "Invalid token amount");
        if(msg.forward_ton_amount > 0) {    
            send(SendParameters {
                to: self.owner,
                value: msg.forward_ton_amount,
                mode: SendPayGasSeparately,
                bounce: false,
                body: TransferNotification {
                    query_id: msg.query_id,
                    amount: msg.amount,
                    sender: msg.from,
                    forward_payload: msg.forward_payload
                }.toCell()
            });
        }
        if(sender() != self.master) {
            send(SendParameters {
                to: self.master,
                value: 0,
                mode: SendRemainingValue,
                bounce: true,
                body: CheckTransfer{
                    amount: msg.amount,
                    owner: self.owner,
                    from: sender()
                }.toCell(),
            });  
        } else {
            self.balance = self.balance + msg.amount;
        }
    }

    receive(msg: Burn) {
        let ctx: Context = context();
        require(self.owner == ctx.sender, "Invalid sender");
        require(ctx.value > gasConsumption + gasConsumption + ctx.readForwardFee(), "Invalid ton amount");
        self.balance = self.balance - msg.amount;
        require(self.balance >= 0, "Invalid token amount");
        send(SendParameters{
            to: self.master,
            value: 0,
            mode: SendRemainingValue,
            body: BurnNotification {
                query_id: msg.query_id,
                amount: msg.amount,
                sender: self.owner,
                response_destination: msg.response_destination
            }.toCell()
        });
    }

    bounced(src: bounced<InternalTransfer>) {
        self.balance = self.balance + src.amount;
    }

    bounced(src: bounced<SendCommision>) {
        self.balance = self.balance + src.amount;
    }

    bounced(src: bounced<BurnNotification>) {
        self.balance = self.balance + src.amount;
    }

    get fun get_wallet_data(): WalletData {
        return WalletData{balance: self.balance, owner: self.owner, master: self.master, code: (initOf TokenWallet(self.owner, self.master)).code};
    }
}