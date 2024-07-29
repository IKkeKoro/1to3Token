import { Address, beginCell, toNano } from '@ton/core';
import { TokenMaster } from '../wrappers/TokenMaster';
import { NetworkProvider } from '@ton/blueprint';
import { master } from './address/const';
export async function run(provider: NetworkProvider) {

    const tkMaster = provider.open(TokenMaster.fromAddress(master));
    await tkMaster.send(
        provider.sender(),
        {
            value: toNano('0.06'),
        },
        {
            $$type: 'CollectCommission',
            query_id: BigInt(Date.now()),
        }
    );
}
