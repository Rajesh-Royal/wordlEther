import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import TransactionSuccess from "components/TransactionSuccess";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGameStore } from "stores/game";
import Modal, { Props as ModalProps } from "../Modal";
import { ConnectWalletButton } from "./components/ConnectWalletButton";
import TransactionForm from "./components/TransactionForm";

export type Props = Pick<ModalProps, "open" | "onClose">;

export default function DappModal(props: Props) {
  const { account, chainId  } = useWeb3React<Web3Provider>();
  const [steps, setSteps] = useState<"connect" | "userDetails" | "success" | "failed">("connect");
  const [txResults, setTxResults] = useState<TxResultsInterface | undefined>();
    const { actions: gameActions } = useGameStore();

  // change step when wallet is connected
  useEffect(() => {
    if (account) {
      setTimeout(() => {
        setSteps("userDetails")
      }, 2000);
    }
  }, [account])

  useEffect(() => {
    if (steps === "failed") {
      toast.error("Transaction Failed")
      gameActions.closeModal();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps])
  return (
    <Modal title="Game Details" open={props.open} onClose={() => {
      props.onClose(false);
      setSteps("connect")
      setTxResults(undefined)
    }} >
      <div className="grid min-h-[20vh] w-full gap-8 pb-4">
        {steps === "connect" && 
          <div className="h-auto w-auto justify-center flex items-center">
            <ConnectWalletButton />
           </div>
           }
        {steps === "userDetails" && <TransactionForm setSteps={setSteps} setTxResults={setTxResults} />}
        {steps === "success" && <TransactionSuccess data={txResults} />}
      </div>
    </Modal>
  );
}

export interface TxResultsInterface {
    "blockHash": "0xfbd404057824c2474457b215d9b779009cd70fe8b71d9509e0e4c96af642c006",
    "blockNumber": 12451458,
    "contractAddress": null,
    "cumulativeGasUsed": 931544,
    "effectiveGasPrice": 189783418385,
    "from": "0xa09074ba33848d97850576e30990446eb119b104",
    "gasUsed": 375988,
    "logsBloom": "0x40000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000001000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000",
    "status": true,
    "to": "0x76ba1c8f94b05a6f02a3ac495cd602f7fadd72fa",
    "transactionHash": "0xd6cf37351d013053275b88eff58e3468dee74bc0f1f33314929e22579515da7a",
    "transactionIndex": 23,
    "type": "0x2",
    "events": {
        "ValueChanged": {
            "address": "0x76Ba1c8F94B05a6F02A3aC495cd602F7FadD72Fa",
            "blockHash": "0xfbd404057824c2474457b215d9b779009cd70fe8b71d9509e0e4c96af642c006",
            "blockNumber": 12451458,
            "logIndex": 3,
            "removed": false,
            "transactionHash": "0xd6cf37351d013053275b88eff58e3468dee74bc0f1f33314929e22579515da7a",
            "transactionIndex": 23,
            "id": "log_fe878618",
            "returnValues": {
                "0": "3",
                "contractUseCount": "3"
            },
            "event": "ValueChanged",
            "signature": "0x93fe6d397c74fdf1402a8b72e47b68512f0510d7b98a4bc4cbdf6ac7108b3c59",
            "raw": {
                "data": "0x0000000000000000000000000000000000000000000000000000000000000003",
                "topics": [
                    "0x93fe6d397c74fdf1402a8b72e47b68512f0510d7b98a4bc4cbdf6ac7108b3c59"
                ]
            }
        }
    }
}
