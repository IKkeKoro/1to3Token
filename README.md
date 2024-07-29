# 13token

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

`npm install` - чтобы установить библиотеки 
`npx blueprint build` - если меняли что-то в контрактах, скомпилировать файлы
`npx blueprint run` - когда файлы скомпилированы, можно вызывать скрипты 


1) Измените `metadata/jetton-metadata-example.json` под ваш токен, `decimals должно быть 9`, чтобы скрипты и логика в контракте работали правильно
2) Залейте файл на IPFS, ссылку вставьте в scripts/deployMaster.ts 
3) устанавливаете библиотеки, компилируете файлы и `npx blueprint run`, выбираете скрипт `deployMaster.ts`, подключайте кошелек и подтверждайте транзакцию, после деплоя скопируйте адрес контракт с терминала в scripts/address/const.ts
4) Можно вызывать функции из контракта 

`changeActiveCommission` - меняете в скрипте true/false вкл/выкл коммисию, сохраняете, вызываете `npx blueprint run` 
`changeJettonsToStop` - кол-во жеттонов, чтобы остановить минт, меняете значение в toNano()
`changeOwner` - сменить владельца токена
`changeValueCommision` - изменение процента коммисии 
`collectCommision` - собрать коммисию с мастер контракта на кошелек овнера
`deployMaster` - для деплоя жеттона 
`getData` - функция вывода информации о жеттоне, коммисиии и тд
`getMasterData` - информация о токене по стандарту жеттона в тоне
`getWalletData` - информация о кошельке юзера
`mint` - минт новых токенов овнером
`stopMint` - true/false вкл/выкл минт
`transfer` - трансфер токенов

чтобы выбрать другой кошелек, удалите в `temp/` файлы 

`https://t.me/testgiver_ton_bot` - тоны для тестнета
### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`
