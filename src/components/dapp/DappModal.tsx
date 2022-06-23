import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import Modal, { Props as ModalProps } from "../Modal";
import { ConnectWalletButton } from "./components/ConnectWalletButton";
import TransactionForm from "./components/TransactionForm";

export type Props = Pick<ModalProps, "open" | "onClose">;

export default function DappModal(props: Props) {
  const { account, chainId, connector } = useWeb3React<Web3Provider>();
  const [steps, setSteps] = useState<"connect" | "userDetails" | "success">("userDetails");

  // change step when wallet is connected
  useEffect(() => {
    if (account) {
      setTimeout(() => {
        setSteps("userDetails")
      }, 2000);
    }
  }, [account])
  return (
    <Modal title="Game Details" open={props.open} onClose={props.onClose} >
      <div className="grid min-h-[20vh] w-full gap-8 pb-4">
           {steps === "connect" && <ConnectWalletButton />}
           {steps === "userDetails" && <TransactionForm />}
      </div>
    </Modal>
  );
}
