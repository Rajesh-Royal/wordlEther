import { ConnectWalletButton } from "./ConnectWalletButton";
import Modal, { Props as ModalProps } from "./Modal";

export type Props = Pick<ModalProps, "open" | "onClose">;

export default function DappModal(props: Props) {

  return (
    <Modal title="Statistics" open={props.open} onClose={props.onClose} >
      <div className="grid min-h-[20vh] w-full gap-8 pb-4">
           <ConnectWalletButton />
      </div>
    </Modal>
  );
}
