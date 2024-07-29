import { Address, beginCell, toNano } from '@ton/core';
import { TokenMaster } from '../wrappers/TokenMaster';
import { NetworkProvider } from '@ton/blueprint';
import { master } from './address/const';
import { TokenWallet } from '../build/TokenMaster/tact_TokenWallet';
export async function run(provider: NetworkProvider) {

    const tkMaster = provider.open(TokenMaster.fromAddress(master));
    const address =  Address.parse("0QCrro2_TPdN3cFhH0LQeXj8T3xkSCDnK54Nl6f8O0LUguYK")
    const wallet = await tkMaster.getGetWalletAddress(address)
    const tkWallet = provider.open(TokenWallet.fromAddress(wallet))
    console.log(await tkWallet.getGetWalletData())
}
