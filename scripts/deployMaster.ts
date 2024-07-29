import { Address, beginCell, toNano } from '@ton/core';
import { TokenMaster } from '../wrappers/TokenMaster';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const owner = provider.sender().address!!

    const JSON = 
    beginCell()
        .storeUint(1,8)
        .storeStringTail('https://harlequin-neat-alligator-564.mypinata.cloud/ipfs/QmcZzS1rPe6arrif7QaHyiBnjzYuSqeViq3VUMDM9TnuqJ') // <- Jetton Metadata
    .endCell() 
    const master = provider.open(await TokenMaster.fromInit(owner,JSON));

    await master.send(
        provider.sender(),
        {
            value: toNano('0.08'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(master.address);
}
