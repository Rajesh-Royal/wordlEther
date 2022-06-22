
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { SUPPORTED_CHAINS } from 'enums/supported-chains'
import { KeyButton } from './Keyboard'

export const ConnectWalletButton = () => {
  const injectedConnector = new InjectedConnector({supportedChainIds: [SUPPORTED_CHAINS.ROPESTEN_TESTNET],})
  const { activate, account } = useWeb3React<Web3Provider>()
  const connectWallet = () => {
    activate(injectedConnector)
  }
  return (
       account ? <KeyButton>Connected ✅</KeyButton> : <KeyButton type="button" onClick={connectWallet}>
          Connect Metamask
        </KeyButton>
  )
}

