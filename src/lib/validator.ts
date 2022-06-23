import { AbstractConnector } from '@web3-react/abstract-connector';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { contractAbi } from "../db/contract-abi";
// import { depositJSON } from './deposit';
export interface UserGameStatsInterFace {
    id: string,
    gamePlayed: number,
    winPercentage: number,
    currentStreak: number,
    maxStreak: number,
    Tries: number[],
    playerName: string,
    description: string
}

let contractAddress = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS;

const PRICE_PER_TRANSACTION = 0;
const pricePerTransaction = new BigNumber(PRICE_PER_TRANSACTION);

export async function initiateTransaction(account: string, chainId: number | undefined, connector: AbstractConnector | undefined, userGameStats: UserGameStatsInterFace) {

    const walletProvider: any = await (connector as AbstractConnector).getProvider();
    const web3 = new Web3(walletProvider);
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    const transactionParameters: SendOptions = {
        gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
        from: account,
        value: pricePerTransaction.toNumber(),
        data: userGameStats
    };

    return new Promise((resolve, reject) => {
        if (!userGameStats) {
            reject("User game stats are not valid!")
        }

        contract.methods
            .registerGames(
                userGameStats.id,
                userGameStats.gamePlayed,
                userGameStats.winPercentage,
                userGameStats.currentStreak,
                userGameStats.maxStreak,
                userGameStats.Tries,
                userGameStats.playerName,
                userGameStats.description
            ).send(transactionParameters)
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

export interface SendOptions {
    from: string;
    gasPrice?: string;
    gas?: number;
    value?: number | string;
    nonce?: number;
    data: UserGameStatsInterFace
}