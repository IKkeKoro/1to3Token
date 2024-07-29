import { Address, Slice, beginCell, toNano } from '@ton/core';

import { NetworkProvider } from '@ton/blueprint';
import { TokenWallet } from '../build/TokenMaster/tact_TokenWallet';
import { TokenMaster } from '../wrappers/TokenMaster';
import { master } from './address/const';
export async function run(provider: NetworkProvider, args: string[]) {

    const tkMaster = provider.open(TokenMaster.fromAddress(master));
    const walletAddress = await tkMaster.getGetWalletAddress(provider.sender().address!!) //
    const wallet = provider.open(TokenWallet.fromAddress(walletAddress));
    const amount = toNano('1')  // 1 * 10^9 
    const to =  Address.parse('kQDrhr1dMwV2ZYY8cC39cGW0jfTuq-AZ70gqrSyaOBddgfap') // <--- Address here
    await wallet.send(
        provider.sender(),
        {
            value: toNano('0.12'),
        },
        {
            $$type: 'Transfer',
            query_id: BigInt(Date.now()),
            amount: amount,
            destination: to,
            response_destination: provider.sender().address!!,
            forward_ton_amount: BigInt(0),
            forward_payload: beginCell().endCell(),
            custom_payload: beginCell().endCell()
        }
    );
}
