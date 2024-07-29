import { Address, beginCell, toNano } from '@ton/core';
import { TokenMaster } from '../wrappers/TokenMaster';
import { NetworkProvider } from '@ton/blueprint';
import { master } from './address/const';
export async function run(provider: NetworkProvider) {

    const tkMaster = provider.open(TokenMaster.fromAddress(master));
    const amount = toNano('1')  // 1 * 10^9  9 decimals
    const to = provider.sender().address! // Address.parse("0QBA28CJ2G0U4SfZIUv8Eq02yNkUNbMwFnVApQF2Y7_iIcvH")
    await tkMaster.send(
        provider.sender(),
        {
            value: toNano('0.06'),
        },
        {
            $$type: 'Transfer',
            query_id: BigInt(Date.now()),
            amount: amount,
            destination: to,
            response_destination: to,
            forward_ton_amount: BigInt(0),
            forward_payload: beginCell().endCell(),
            custom_payload: beginCell().endCell()
        }
    );
}
