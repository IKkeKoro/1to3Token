import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type WalletData = {
    $$type: 'WalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
}

export function storeWalletData(src: WalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.code);
    };
}

export function loadWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _code = sc_0.loadRef();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadTupleWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function storeTupleWalletData(source: WalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.code);
    return builder.build();
}

function dictValueParserWalletData(): DictionaryValue<WalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadWalletData(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'Transfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'Transfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type InternalTransfer = {
    $$type: 'InternalTransfer';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeInternalTransfer(src: InternalTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadInternalTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'InternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleInternalTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'InternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleInternalTransfer(source: InternalTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserInternalTransfer(): DictionaryValue<InternalTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadInternalTransfer(src.loadRef().beginParse());
        }
    }
}

export type TransferNotification = {
    $$type: 'TransferNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    forward_payload: Cell;
}

export function storeTransferNotification(src: TransferNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransferNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadTupleTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'TransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function storeTupleTransferNotification(source: TransferNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTransferNotification(): DictionaryValue<TransferNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransferNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTransferNotification(src.loadRef().beginParse());
        }
    }
}

export type Excesses = {
    $$type: 'Excesses';
    query_id: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}

export type StopMint = {
    $$type: 'StopMint';
    mintable: boolean;
}

export function storeStopMint(src: StopMint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1985816509, 32);
        b_0.storeBit(src.mintable);
    };
}

export function loadStopMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1985816509) { throw Error('Invalid prefix'); }
    let _mintable = sc_0.loadBit();
    return { $$type: 'StopMint' as const, mintable: _mintable };
}

function loadTupleStopMint(source: TupleReader) {
    let _mintable = source.readBoolean();
    return { $$type: 'StopMint' as const, mintable: _mintable };
}

function storeTupleStopMint(source: StopMint) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.mintable);
    return builder.build();
}

function dictValueParserStopMint(): DictionaryValue<StopMint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStopMint(src)).endCell());
        },
        parse: (src) => {
            return loadStopMint(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    owner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2242002949, 32);
        b_0.storeAddress(src.owner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2242002949) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, owner: _owner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _owner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, owner: _owner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeCommission = {
    $$type: 'ChangeCommission';
    commission: bigint;
}

export function storeChangeCommission(src: ChangeCommission) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2384427940, 32);
        b_0.storeUint(src.commission, 16);
    };
}

export function loadChangeCommission(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2384427940) { throw Error('Invalid prefix'); }
    let _commission = sc_0.loadUintBig(16);
    return { $$type: 'ChangeCommission' as const, commission: _commission };
}

function loadTupleChangeCommission(source: TupleReader) {
    let _commission = source.readBigNumber();
    return { $$type: 'ChangeCommission' as const, commission: _commission };
}

function storeTupleChangeCommission(source: ChangeCommission) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.commission);
    return builder.build();
}

function dictValueParserChangeCommission(): DictionaryValue<ChangeCommission> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeCommission(src)).endCell());
        },
        parse: (src) => {
            return loadChangeCommission(src.loadRef().beginParse());
        }
    }
}

export type ActiveCommision = {
    $$type: 'ActiveCommision';
    active: boolean;
}

export function storeActiveCommision(src: ActiveCommision) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2359285885, 32);
        b_0.storeBit(src.active);
    };
}

export function loadActiveCommision(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2359285885) { throw Error('Invalid prefix'); }
    let _active = sc_0.loadBit();
    return { $$type: 'ActiveCommision' as const, active: _active };
}

function loadTupleActiveCommision(source: TupleReader) {
    let _active = source.readBoolean();
    return { $$type: 'ActiveCommision' as const, active: _active };
}

function storeTupleActiveCommision(source: ActiveCommision) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.active);
    return builder.build();
}

function dictValueParserActiveCommision(): DictionaryValue<ActiveCommision> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeActiveCommision(src)).endCell());
        },
        parse: (src) => {
            return loadActiveCommision(src.loadRef().beginParse());
        }
    }
}

export type Burn = {
    $$type: 'Burn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address;
    custom_payload: Cell | null;
}

export function storeBurn(src: Burn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'Burn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'Burn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleBurn(source: Burn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserBurn(): DictionaryValue<Burn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBurn(src)).endCell());
        },
        parse: (src) => {
            return loadBurn(src.loadRef().beginParse());
        }
    }
}

export type BurnNotification = {
    $$type: 'BurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address;
}

export function storeBurnNotification(src: BurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    return { $$type: 'BurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'BurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleBurnNotification(source: BurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserBurnNotification(): DictionaryValue<BurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type SendTransfer = {
    $$type: 'SendTransfer';
    query_id: bigint;
    amount: bigint;
    commission: bigint;
    mintable: boolean;
    destination: Address;
    response_destination: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeSendTransfer(src: SendTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3690101440, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeCoins(src.commission);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadSendTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3690101440) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _commission = sc_0.loadCoins();
    let _mintable = sc_0.loadBit();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'SendTransfer' as const, query_id: _query_id, amount: _amount, commission: _commission, mintable: _mintable, destination: _destination, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleSendTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _commission = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'SendTransfer' as const, query_id: _query_id, amount: _amount, commission: _commission, mintable: _mintable, destination: _destination, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleSendTransfer(source: SendTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.commission);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserSendTransfer(): DictionaryValue<SendTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadSendTransfer(src.loadRef().beginParse());
        }
    }
}

export type ChangeContent = {
    $$type: 'ChangeContent';
    jetton_content: Cell;
}

export function storeChangeContent(src: ChangeContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(274271986, 32);
        b_0.storeRef(src.jetton_content);
    };
}

export function loadChangeContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 274271986) { throw Error('Invalid prefix'); }
    let _jetton_content = sc_0.loadRef();
    return { $$type: 'ChangeContent' as const, jetton_content: _jetton_content };
}

function loadTupleChangeContent(source: TupleReader) {
    let _jetton_content = source.readCell();
    return { $$type: 'ChangeContent' as const, jetton_content: _jetton_content };
}

function storeTupleChangeContent(source: ChangeContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.jetton_content);
    return builder.build();
}

function dictValueParserChangeContent(): DictionaryValue<ChangeContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeContent(src)).endCell());
        },
        parse: (src) => {
            return loadChangeContent(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeBoolean(source.include_address);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Address | null;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0.loadMaybeAddress();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readAddressOpt();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.wallet_address);
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type CollectCommission = {
    $$type: 'CollectCommission';
    query_id: bigint;
}

export function storeCollectCommission(src: CollectCommission) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3793300544, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadCollectCommission(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3793300544) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'CollectCommission' as const, query_id: _query_id };
}

function loadTupleCollectCommission(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'CollectCommission' as const, query_id: _query_id };
}

function storeTupleCollectCommission(source: CollectCommission) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserCollectCommission(): DictionaryValue<CollectCommission> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCollectCommission(src)).endCell());
        },
        parse: (src) => {
            return loadCollectCommission(src.loadRef().beginParse());
        }
    }
}

export type SendCommision = {
    $$type: 'SendCommision';
    amount: bigint;
    commission: bigint;
    from: Address;
}

export function storeSendCommision(src: SendCommision) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(757130070, 32);
        b_0.storeCoins(src.amount);
        b_0.storeCoins(src.commission);
        b_0.storeAddress(src.from);
    };
}

export function loadSendCommision(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 757130070) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _commission = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    return { $$type: 'SendCommision' as const, amount: _amount, commission: _commission, from: _from };
}

function loadTupleSendCommision(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _commission = source.readBigNumber();
    let _from = source.readAddress();
    return { $$type: 'SendCommision' as const, amount: _amount, commission: _commission, from: _from };
}

function storeTupleSendCommision(source: SendCommision) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeNumber(source.commission);
    builder.writeAddress(source.from);
    return builder.build();
}

function dictValueParserSendCommision(): DictionaryValue<SendCommision> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendCommision(src)).endCell());
        },
        parse: (src) => {
            return loadSendCommision(src.loadRef().beginParse());
        }
    }
}

export type SendMint = {
    $$type: 'SendMint';
    amount: bigint;
    to: Address;
    commission: bigint;
    mintable: boolean;
}

export function storeSendMint(src: SendMint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4199762790, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.commission);
        b_0.storeBit(src.mintable);
    };
}

export function loadSendMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4199762790) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _to = sc_0.loadAddress();
    let _commission = sc_0.loadCoins();
    let _mintable = sc_0.loadBit();
    return { $$type: 'SendMint' as const, amount: _amount, to: _to, commission: _commission, mintable: _mintable };
}

function loadTupleSendMint(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    let _commission = source.readBigNumber();
    let _mintable = source.readBoolean();
    return { $$type: 'SendMint' as const, amount: _amount, to: _to, commission: _commission, mintable: _mintable };
}

function storeTupleSendMint(source: SendMint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    builder.writeNumber(source.commission);
    builder.writeBoolean(source.mintable);
    return builder.build();
}

function dictValueParserSendMint(): DictionaryValue<SendMint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendMint(src)).endCell());
        },
        parse: (src) => {
            return loadSendMint(src.loadRef().beginParse());
        }
    }
}

export type ChangeJettonsToStop = {
    $$type: 'ChangeJettonsToStop';
    amount: bigint;
}

export function storeChangeJettonsToStop(src: ChangeJettonsToStop) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1861010850, 32);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadChangeJettonsToStop(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1861010850) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'ChangeJettonsToStop' as const, amount: _amount };
}

function loadTupleChangeJettonsToStop(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'ChangeJettonsToStop' as const, amount: _amount };
}

function storeTupleChangeJettonsToStop(source: ChangeJettonsToStop) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserChangeJettonsToStop(): DictionaryValue<ChangeJettonsToStop> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeJettonsToStop(src)).endCell());
        },
        parse: (src) => {
            return loadChangeJettonsToStop(src.loadRef().beginParse());
        }
    }
}

export type CheckTransfer = {
    $$type: 'CheckTransfer';
    amount: bigint;
    owner: Address;
    from: Address;
}

export function storeCheckTransfer(src: CheckTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1067188736, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.from);
    };
}

export function loadCheckTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1067188736) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _from = sc_0.loadAddress();
    return { $$type: 'CheckTransfer' as const, amount: _amount, owner: _owner, from: _from };
}

function loadTupleCheckTransfer(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _from = source.readAddress();
    return { $$type: 'CheckTransfer' as const, amount: _amount, owner: _owner, from: _from };
}

function storeTupleCheckTransfer(source: CheckTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.from);
    return builder.build();
}

function dictValueParserCheckTransfer(): DictionaryValue<CheckTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCheckTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadCheckTransfer(src.loadRef().beginParse());
        }
    }
}

export type MasterData = {
    $$type: 'MasterData';
    total_supply: bigint;
    mintable: boolean;
    owner: Address;
    jetton_content: Cell;
    jetton_wallet_code: Cell;
}

export function storeMasterData(src: MasterData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.total_supply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.jetton_content);
        b_0.storeRef(src.jetton_wallet_code);
    };
}

export function loadMasterData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _jetton_content = sc_0.loadRef();
    let _jetton_wallet_code = sc_0.loadRef();
    return { $$type: 'MasterData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code };
}

function loadTupleMasterData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _jetton_content = source.readCell();
    let _jetton_wallet_code = source.readCell();
    return { $$type: 'MasterData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code };
}

function storeTupleMasterData(source: MasterData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.jetton_content);
    builder.writeCell(source.jetton_wallet_code);
    return builder.build();
}

function dictValueParserMasterData(): DictionaryValue<MasterData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMasterData(src)).endCell());
        },
        parse: (src) => {
            return loadMasterData(src.loadRef().beginParse());
        }
    }
}

export type TokenData = {
    $$type: 'TokenData';
    total_supply: bigint;
    mintable: boolean;
    owner: Address;
    commission: bigint;
    active: boolean;
    commissionCollectied: bigint;
    jettonsToStop: bigint;
}

export function storeTokenData(src: TokenData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.total_supply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.commission, 257);
        b_0.storeBit(src.active);
        let b_1 = new Builder();
        b_1.storeInt(src.commissionCollectied, 257);
        b_1.storeInt(src.jettonsToStop, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTokenData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _commission = sc_0.loadIntBig(257);
    let _active = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _commissionCollectied = sc_1.loadIntBig(257);
    let _jettonsToStop = sc_1.loadIntBig(257);
    return { $$type: 'TokenData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, commission: _commission, active: _active, commissionCollectied: _commissionCollectied, jettonsToStop: _jettonsToStop };
}

function loadTupleTokenData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _commission = source.readBigNumber();
    let _active = source.readBoolean();
    let _commissionCollectied = source.readBigNumber();
    let _jettonsToStop = source.readBigNumber();
    return { $$type: 'TokenData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, commission: _commission, active: _active, commissionCollectied: _commissionCollectied, jettonsToStop: _jettonsToStop };
}

function storeTupleTokenData(source: TokenData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeNumber(source.commission);
    builder.writeBoolean(source.active);
    builder.writeNumber(source.commissionCollectied);
    builder.writeNumber(source.jettonsToStop);
    return builder.build();
}

function dictValueParserTokenData(): DictionaryValue<TokenData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenData(src)).endCell());
        },
        parse: (src) => {
            return loadTokenData(src.loadRef().beginParse());
        }
    }
}

 type TokenMaster_init_args = {
    $$type: 'TokenMaster_init_args';
    owner: Address;
    jetton_content: Cell;
}

function initTokenMaster_init_args(src: TokenMaster_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.jetton_content);
    };
}

async function TokenMaster_init(owner: Address, jetton_content: Cell) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initTokenMaster_init_args({ $$type: 'TokenMaster_init_args', owner, jetton_content })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const TokenMaster_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    2179: { message: `No commission` },
    4429: { message: `Invalid sender` },
    17062: { message: `Invalid amount` },
    35499: { message: `Only owner` },
    49345: { message: `Mint stopped` },
    51724: { message: `Invalid ton amount` },
    54227: { message: `Invalid token amount` },
    61739: { message: `Wrong sender` },
}

const TokenMaster_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"WalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Transfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"InternalTransfer","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Excesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"StopMint","header":1985816509,"fields":[{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ChangeOwner","header":2242002949,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeCommission","header":2384427940,"fields":[{"name":"commission","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"ActiveCommision","header":2359285885,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"Burn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"BurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SendTransfer","header":3690101440,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"commission","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ChangeContent","header":274271986,"fields":[{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"CollectCommission","header":3793300544,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"SendCommision","header":757130070,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"commission","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SendMint","header":4199762790,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"commission","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ChangeJettonsToStop","header":1861010850,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CheckTransfer","header":1067188736,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MasterData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"commission","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"commissionCollectied","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"jettonsToStop","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const TokenMaster_getters: ABIGetter[] = [
    {"name":"get_jetton_data","arguments":[],"returnType":{"kind":"simple","type":"MasterData","optional":false}},
    {"name":"get_wallet_address","arguments":[{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"tokenData","arguments":[],"returnType":{"kind":"simple","type":"TokenData","optional":false}},
]

const TokenMaster_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeContent"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeCommission"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeJettonsToStop"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ActiveCommision"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CollectCommission"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CheckTransfer"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Transfer"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProvideWalletAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"StopMint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"BurnNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class TokenMaster implements Contract {
    
    static async init(owner: Address, jetton_content: Cell) {
        return await TokenMaster_init(owner, jetton_content);
    }
    
    static async fromInit(owner: Address, jetton_content: Cell) {
        const init = await TokenMaster_init(owner, jetton_content);
        const address = contractAddress(0, init);
        return new TokenMaster(address, init);
    }
    
    static fromAddress(address: Address) {
        return new TokenMaster(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  TokenMaster_types,
        getters: TokenMaster_getters,
        receivers: TokenMaster_receivers,
        errors: TokenMaster_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: ChangeContent | ChangeOwner | ChangeCommission | ChangeJettonsToStop | ActiveCommision | CollectCommission | CheckTransfer | Transfer | ProvideWalletAddress | StopMint | BurnNotification | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeContent') {
            body = beginCell().store(storeChangeContent(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeCommission') {
            body = beginCell().store(storeChangeCommission(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeJettonsToStop') {
            body = beginCell().store(storeChangeJettonsToStop(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ActiveCommision') {
            body = beginCell().store(storeActiveCommision(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CollectCommission') {
            body = beginCell().store(storeCollectCommission(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CheckTransfer') {
            body = beginCell().store(storeCheckTransfer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Transfer') {
            body = beginCell().store(storeTransfer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProvideWalletAddress') {
            body = beginCell().store(storeProvideWalletAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'StopMint') {
            body = beginCell().store(storeStopMint(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BurnNotification') {
            body = beginCell().store(storeBurnNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetJettonData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_jetton_data', builder.build())).stack;
        const result = loadTupleMasterData(source);
        return result;
    }
    
    async getGetWalletAddress(provider: ContractProvider, owner_address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner_address);
        let source = (await provider.get('get_wallet_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getTokenData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('tokenData', builder.build())).stack;
        const result = loadTupleTokenData(source);
        return result;
    }
    
}