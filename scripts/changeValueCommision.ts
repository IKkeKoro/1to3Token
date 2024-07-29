import { Address, beginCell, toNano } from '@ton/core';
import { TokenMaster } from '../wrappers/TokenMaster';
import { NetworkProvider } from '@ton/blueprint';
import { master } from './address/const';
export async function run(provider: NetworkProvider) {

    const tkMaster = provider.open(TokenMaster.fromAddress(master));
    const newCommision = 100 // 10.0%   x * 100 / 1000 = x / 10
    await tkMaster.send(
        provider.sender(),
        {
            value: toNano('0.06'),
        },
        {
            $$type: 'ChangeCommission',
            commission: BigInt(newCommision),
        }
    );
}
