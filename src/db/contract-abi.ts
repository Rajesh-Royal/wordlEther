import { AbiItem } from 'web3-utils';

type EFAbi = AbiItem & { gas?: number };
export const contractAbi: EFAbi[] = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "contractUseCount",
                "type": "uint256"
            }
        ],
        "name": "ValueChanged",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "id",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "gamePlayed",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "winPercentage",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "currentStreak",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "maxStreak",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "Tries",
                "type": "uint256[]"
            },
            {
                "internalType": "string",
                "name": "playerName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            }
        ],
        "name": "registerGames",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllGameStates",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "id",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "gamePlayed",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "winPercentage",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentStreak",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "maxStreak",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "Tries",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "string",
                        "name": "playerName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    }
                ],
                "internalType": "struct WordlEther.gameInfo[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "id",
                "type": "string"
            }
        ],
        "name": "getGameState",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]