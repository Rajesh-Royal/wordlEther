import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { SendOptions } from 'web3-eth-contract';
import { contractAbi } from "./contractAbi";


import { AbstractConnector } from '@web3-react/abstract-connector';
// import { depositJSON } from './deposit';
import { prefix0X } from './prefix0x';
import { DepositKeyInterface } from './validateDepositKey';

let contractAddress = "0x4242424242424242424242424242424242424242";

const PRICE_PER_VALIDATOR = 32;
const pricePerValidator = new BigNumber(PRICE_PER_VALIDATOR);
const TX_VALUE = pricePerValidator.multipliedBy(1e18).toNumber();

export async function initiateTransaction(account: string, chainId: number | undefined, connector: AbstractConnector | undefined, depositFile: DepositKeyInterface[]) {

    const walletProvider: any = await (connector as AbstractConnector).getProvider();
    const web3 = new Web3(walletProvider);
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    const transactionParameters: SendOptions = {
        gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
        from: account,
        value: TX_VALUE,
    };

    return new Promise((resolve, reject) => {
        if (!Array.isArray(depositFile) || depositFile?.length === 0) {
            reject("Upload a deposit file first")
        }
        let depositJSON = depositFile[0];

        contract.methods
            .deposit(
                prefix0X(depositJSON.pubkey),
                prefix0X(depositJSON.withdrawal_credentials),
                prefix0X(depositJSON.signature),
                prefix0X(depositJSON.deposit_data_root)
            )
            .send(transactionParameters)
            .on('transactionHash', (txHash: string): void => {
                console.log("Transaction Hash => ", txHash)
            })
            .on('receipt', () => {
                // do something?
            })
            .on(
                'confirmation',
                (confirmation: number, receipt: { status: {} }): any => {
                    resolve(receipt || "success");
                }
            )
            .on('error', (error: any) => {
                console.log(error)
                reject(error)
            });
    })
}